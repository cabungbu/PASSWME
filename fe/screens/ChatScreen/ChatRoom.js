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
    updateLastMessage
  } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

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
    const fetchAllMessages = async () => {
      try {
        console.log(senderId);
        const res = await axios.get(
          BE_ENDPOINT + `/chatRoom/${chatRoomId}/messages`
        );
        const messagesData = res.data || [];
        setMessages(messagesData);
        // Đánh dấu tin nhắn là đã đọc ngay khi tải xong
        if (messagesData.length > 0) {
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
      let messageData;
      let lastMessageContent;

      if (image) {
        messageData = {
          chatRoomId: chatRoomId,
          senderId: senderId,
          recipientId: ortherUserId,
          content: image,
          type: "image",
          sendTime: new Date().toISOString(),
        };

        lastMessageContent = `${senderId === ortherUserId ? ortherUserName : "Bạn"} đã gửi hình ảnh`;

        route.params?.updateLastMessage?.(chatRoomId, {
          content: lastMessageContent,
          senderId: senderId,
          type: "image",
          sendTime: new Date().toISOString(),
        });
      } else {
        messageData = {
          chatRoomId: chatRoomId,
          senderId: senderId,
          recipientId: ortherUserId,
          content: newMessage,
          type: "text",
          sendTime: new Date().toISOString(),
        };

        route.params?.updateLastMessage?.(chatRoomId, {
          content: newMessage,
          senderId: senderId,
          type: "text",
          sendTime: new Date().toISOString(),
        });
      }

      const res = await axios.post(
        `${BE_ENDPOINT}/chatRoom/addMessage`,
        messageData
      );
      console.log("Server response:", res.data);

      setMessages([
        ...messages,
        {
          content: messageData.content,
          senderId: senderId,
          sendTime: new Date().toISOString(),
          type: messageData.type,
        },
      ]);

      setImage(null);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message - Full error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error message:", error.message);
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
    console.log(result.assets[0].uri);
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
      
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

  const renderMessage = ({ item }) => {
    let formattedTime;

    if (item.sendTime && item.sendTime.seconds) {
      // Nếu sendTime là một đối tượng Timestamp
      formattedTime = formatDate(item.sendTime.seconds);
    } else if (typeof item.sendTime === "string") {
      // Nếu sendTime là chuỗi
      const timestamp = new Date(item.sendTime).getTime() / 1000;
      formattedTime = formatDate(timestamp);
    } else {
      formattedTime = "Unknown time";
    }

    const isSender = item.senderId === senderId;

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
