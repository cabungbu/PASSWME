import {
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

import styles from "./ChatRoomStyle";
import mainStyles from "../../styles/mainStyles";
import { scaleHeight, scaleWidth } from "../../assets/constant/responsive";
import { COLOR } from "../../assets/constant/color";
import { BE_ENDPOINT } from "../../settings/localVars";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { storage } from "../../firebase_config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import QuickReplyOptions from "../../components/QuickReplyOptions";

const ChatRoom = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const route = useRoute();
  const {
    chatRoomId,
    otherUserAvatar,
    ortherUserName,
    senderId,
    ortherUserId,
    updateLastMessage,
    isNewChat,
  } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  // const [isNewChatLocal, setIsNewChatLocal] = useState(isNewChat);
  const markMessagesAsRead = async () => {
    // if ()
    try {
      const res = await axios.post(`${BE_ENDPOINT}/chatRoom/updateMessage`, {
        chatRoomId: chatRoomId,
        senderId: senderId,
        recipientId: ortherUserId,
        isRead: true,
      });
      console.log("Messages marked as read:", res.data);
    } catch (error) {
      console.error(
        "Error marking messages as read:",
        error.response?.data?.message
      );
    }
  };
  useEffect(() => {
    if (messages.length > 0) {
      markMessagesAsRead();
    }
  }, [messages.length]);

  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        console.log(senderId);
        const res = await axios.get(
          BE_ENDPOINT + `/chatRoom/${chatRoomId}/messages`
        );
        if (res.data && res.data.length > 0) {
          // Sắp xếp tin nhắn theo thời gian
          const sortedMessages = res.data.sort((a, b) => {
            const timeA = new Date(a.sendTime).getTime();
            const timeB = new Date(b.sendTime).getTime();
            if (timeA === timeB) {
              if (a.isQuickReply) return 1;
              if (b.isQuickReply) return -1;
              return 0;
            }
            return timeA - timeB;
          });
          setMessages(sortedMessages);
        }
        // Đánh dấu tin nhắn là đã đọc ngay khi tải xong
        if (res.data.length > 0) {
          markMessagesAsRead();
        }
      } catch (error) {
        console.error(
          "Error fetching messages:",
          error.response?.data?.message
        );
      }
    };
    fetchAllMessages();
  }, []);

  const sendMessage = async () => {
    if (!image && newMessage.trim() === "") return;
    try {
      let actualChatRoomId = chatRoomId;
      if (isNewChat && !actualChatRoomId) {
        const createResponse = await axios.post(
          `${BE_ENDPOINT}/chatRoom/create`,
          {
            senderId: senderId,
            recipientId: ortherUserId,
          }
        );
        actualChatRoomId = createResponse.data.chatRoomId;
        navigation.setParams({
          ...route.params,
          chatRoomId: actualChatRoomId,
          isNewChat: false,
        });
      }

      const currentTime = new Date().toISOString();
      let messageData;
      let lastMessageContent;

      if (image) {
        const filename = `image_${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}.jpg`;
        const storageRef = ref(storage, `chat_images/${filename}`);

        const response = await fetch(image);
        const blob = await response.blob();

        await uploadBytes(storageRef, blob);

        messageData = {
          chatRoomId: actualChatRoomId,
          senderId: senderId,
          recipientId: ortherUserId,
          content: await getDownloadURL(storageRef),
          type: "image",
          sendTime: currentTime,
        };

        lastMessageContent = `${
          senderId === ortherUserId ? ortherUserName : "Bạn"
        } đã gửi hình ảnh`;
      } else {
        messageData = {
          chatRoomId: actualChatRoomId,
          senderId: senderId,
          recipientId: ortherUserId,
          content: newMessage,
          type: "text",
          sendTime: currentTime,
        };
      }

      // Chỉ cập nhật messages state một lần trước khi gửi API
      if (messages.length === 0) {
        // Nếu là tin nhắn đầu tiên, không cập nhật state ngay mà đợi fetch lại
        setNewMessage("");
        setImage(null);

        // Gửi tin nhắn lên server
        await axios.post(`${BE_ENDPOINT}/chatRoom/addMessage`, messageData);

        // Fetch lại toàn bộ tin nhắn để lấy cả tin nhắn tự động
        const messagesRes = await axios.get(
          BE_ENDPOINT + `/chatRoom/${actualChatRoomId}/messages`
        );
        if (messagesRes.data && messagesRes.data.length > 0) {
          const sortedMessages = messagesRes.data.sort((a, b) => {
            const timeA = new Date(a.sendTime).getTime();
            const timeB = new Date(b.sendTime).getTime();
            if (timeA === timeB) {
              if (a.isQuickReply) return 1;
              if (b.isQuickReply) return -1;
              return 0;
            }
            return timeA - timeB;
          });
          setMessages(sortedMessages);
        }
      } else {
        // Nếu không phải tin đầu tiên, cập nhật state trước khi gửi API
        setMessages((prev) => [...prev, messageData]);
        setNewMessage("");
        setImage(null);

        // Gửi tin nhắn lên server
        await axios.post(`${BE_ENDPOINT}/chatRoom/addMessage`, messageData);
      }

      // Cập nhật last message
      updateLastMessage?.(actualChatRoomId, {
        content: messageData.type === "image" ? lastMessageContent : newMessage,
        senderId: senderId,
        type: messageData.type,
        sendTime: currentTime,
        isRead: true,
      });
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Error", "Không thể gửi tin nhắn");
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();

    const isSameDay =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isSameDay) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString([], {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [5, 6],
      quality: 0.8,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [messages, image]);

  const ImageViewerModal = () => (
    <Modal
      transparent={true}
      visible={isImageViewerVisible}
      onRequestClose={() => {
        setIsImageViewerVisible(false);
        setSelectedImage(null);
      }}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeModelButton}
          onPress={() => {
            setIsImageViewerVisible(false);
            setSelectedImage(null);
          }}
        >
          <Feather name="x" size={30} color="white" />
        </TouchableOpacity>

        <Image source={{ uri: selectedImage }} style={styles.imageModel} />
      </View>
    </Modal>
  );

  const renderMessage = ({ item, index }) => {
    let formattedTime;
    if (item.sendTime) {
      if (item.sendTime.seconds) {
        formattedTime = formatDate(item.sendTime.seconds);
      } else if (typeof item.sendTime === "string") {
        const timestamp = new Date(item.sendTime).getTime() / 1000;
        formattedTime = formatDate(timestamp);
      }
    } else {
      formattedTime = "Unknown time";
    }

    const isSender = item.senderId === senderId;
    if (item.type === "quickReplies") {
      return (
        <QuickReplyOptions
          options={item.content}
          onSelect={handleQuickReplySelect}
        />
      );
    }

    if (item.type === "text" || item.type === "image") {
      return (
        <View
          style={isSender ? styles.senderContainer : styles.receiverContainer}
        >
          {item.type === "image" ? (
            <TouchableOpacity
              onPress={() => {
                setSelectedImage(item.content);
                setIsImageViewerVisible(true);
              }}
            >
              <Image
                source={{ uri: item.content }}
                style={{
                  width: scaleWidth(150),
                  height: scaleHeight(180),
                  borderRadius: 10,
                  resizeMode: "cover",
                }}
              />
            </TouchableOpacity>
          ) : (
            <View
              style={[
                styles.messageContainer,
                { backgroundColor: isSender ? COLOR.sentColor : "black" },
              ]}
            >
              <Text style={styles.messageText}>{item.content}</Text>
            </View>
          )}
          <Text
            style={[
              styles.messageTime,
              { alignSelf: isSender ? "flex-start" : "flex-end" },
            ]}
          >
            {formattedTime}
          </Text>
        </View>
      );
    }
  };

  const handleQuickReplySelect = async (option) => {
    try {
      const currentTime = new Date().toISOString();
      const delayedTime = new Date(Date.now() + 1000).toISOString();

      const questionMessage = {
        chatRoomId: chatRoomId,
        senderId: senderId,
        recipientId: ortherUserId,
        content: option.question,
        type: "text",
        isQuickReply: option.id,
        sendTime: currentTime,
      };
      
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: option.question,
          senderId: senderId,
          sendTime: currentTime,
          type: "text",
        },
      ]);

      await axios.post(`${BE_ENDPOINT}/chatRoom/addMessage`, questionMessage);

      // Add answer to local state immediately after response
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: option.answer,
          senderId: ortherUserId,
          sendTime: delayedTime,
          type: "text",
        },
      ]);

      updateLastMessage?.(chatRoomId, {
        content: option.answer,
        senderId: ortherUserId,
        type: "text",
        sendTime: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error sending quick reply:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={mainStyles.headerContainer}>
        <Ionicons
          style={mainStyles.headerIcon}
          name="chevron-back"
          size={scaleWidth(30)}
          color={COLOR.mainColor}
          onPress={() => navigation.goBack()}
        />
        <Image source={{ uri: otherUserAvatar }} style={styles.avatar} />
        <Text style={styles.ortherUserName}>{ortherUserName}</Text>
      </View>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={[
              styles.messageList,
              { flexGrow: 1, justifyContent: "flex-end" },
            ]}
            onContentSizeChange={scrollToBottom}
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign
            name="pluscircleo"
            size={24}
            color="black"
            onPress={pickImage}
          />
          {image ? (
            <View style={{ flex: 1, marginHorizontal: scaleWidth(10) }}>
              <View style={{ width: scaleWidth(75), height: scaleHeight(90) }}>
                <Image
                  source={{ uri: image }}
                  style={{
                    width: scaleWidth(75),
                    height: scaleHeight(90),
                    borderRadius: 10,
                    resizeMode: "cover",
                  }}
                />
                <Feather
                  name="x"
                  size={20}
                  color="black"
                  style={styles.delete_imgAndVideo}
                  onPress={() => setImage(null)}
                />
              </View>
            </View>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="Soạn tin..."
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
            />
          )}
          <FontAwesome
            name="send"
            size={24}
            color={COLOR.sentColor}
            onPress={sendMessage}
          />
        </View>
      </View>
      <ImageViewerModal />
    </View>
  );
};

export default ChatRoom;
