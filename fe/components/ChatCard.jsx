import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { scaleWidth } from "../assets/constant/responsive";
import { COLOR } from "../assets/constant/color";
import { useNavigation } from "@react-navigation/native";

const ChatCard = ({
  chatRoom,
  userId,
  updateUnreadCount,
  updateLastMessage,
}) => {
  const navigation = useNavigation();
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
      return date.toLocaleDateString([], { day: "2-digit", month: "2-digit" });
    } else {
      return date.toLocaleDateString([], {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        updateUnreadCount(chatRoom.id, 0);
        navigation.navigate("ChatRoomScreen", {
          chatRoomId: chatRoom.id,
          senderId: userId,
          ortherUserId: chatRoom.otherUser.id,
          otherUserAvatar: chatRoom.otherUser.avatar,
          ortherUserName: chatRoom.otherUser.username,
          updateLastMessage,
        });
        navigation.setOptions({
          updateLastMessage: updateLastMessage, // Truyền hàm qua `setOptions`
        });
      }}
    >
      {chatRoom?.otherUser?.avatar ? (
        <Image
          source={{ uri: chatRoom.otherUser.avatar }}
          style={styles.image}
        />
      ) : (
        <Text>No image available</Text>
      )}
      <View style={{ flex: 1 }}>
        {chatRoom?.otherUser?.avatar ? (
          <Text style={styles.username}>{chatRoom.otherUser.username}</Text>
        ) : (
          <Text>Người dùng không xác định</Text>
        )}
        {chatRoom?.lastMessage?.content ? (
          <Text style={styles.text}>
            {chatRoom.lastMessage.type === "image"
              ? chatRoom.lastMessage.senderId === userId
                ? "Bạn đã gửi hình ảnh"
                : `${chatRoom.otherUser.username} đã gửi hình ảnh`
              : chatRoom.lastMessage.content}
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
      <View style={{}}>
        {chatRoom?.lastMessage?.sendTime ? (
          <Text style={[styles.text, { alignSelf: "flex-start" }]}>
            {formatDate(chatRoom.lastMessage.sendTime.seconds)}
          </Text>
        ) : (
          <Text></Text>
        )}
        {chatRoom?.unreadCount && chatRoom.unreadCount[userId] ? (
          <View style={styles.unReadMessages}>
            <Text style={[styles.text, { color: "white", fontSize: 12 }]}>
              {chatRoom.unreadCount[userId]}
            </Text>
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: scaleWidth(15),
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontFamily: "medium",
    fontSize: 14,
    color: "#828282",
  },
  username: {
    fontFamily: "medium",
    fontSize: 16,
    color: "black",
  },
  image: {
    height: scaleWidth(60),
    width: scaleWidth(60),
    borderRadius: 100,
    marginRight: scaleWidth(20),
  },
  unReadMessages: {
    backgroundColor: COLOR.mainColor,
    padding: scaleWidth(1),
    borderRadius: 12,
    alignSelf: "flex-start",
    aspectRatio: 1,
    alignItems: "center",
    marginLeft: "auto",
  },
});

export default ChatCard;
