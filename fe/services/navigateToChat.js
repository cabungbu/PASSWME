import axios from "axios";
import { BE_ENDPOINT } from "../settings/localVars";

export const checkExistingChatRoom = async (senderId, recipientId) => {
  try {
    const response = await axios.post(`${BE_ENDPOINT}/chatRoom/checkExisting`, {
      senderId,
      recipientId,
    });
    return response.data.chatRoomId; 
  } catch (error) {
    console.error("Error checking existing chat room:", error);
    return null;
  }
};

// Function điều hướng đến chat
export const navigateToChat = async ({
  navigation,
  senderId,
  recipientId,
  recipientName,
  recipientAvatar,
  updateLastMessage = null,
}) => {
  try {
    // Kiểm tra chatRoom đã tồn tại chưa
    const existingChatRoomId = await checkExistingChatRoom(
      senderId,
      recipientId
    );

    // Điều hướng đến ChatRoom với thông tin cần thiết
    navigation.navigate("ChatRoomScreen", {
      chatRoomId: existingChatRoomId, // có thể null nếu chưa tồn tại
      otherUserAvatar: recipientAvatar,
      ortherUserName: recipientName,
      senderId: senderId,
      ortherUserId: recipientId,
      updateLastMessage: updateLastMessage,
      isNewChat: !existingChatRoomId,
    });
  } catch (error) {
    console.error("Error navigating to chat:", error);
    alert("Không thể mở chat. Vui lòng thử lại sau.");
  }
};
