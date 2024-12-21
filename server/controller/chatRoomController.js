const { getFirestoreDb } = require("../config/firebase");
const {
  collection,
  addDoc,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  serverTimestamp,
  increment,
  writeBatch,
  orderBy,
} = require("firebase/firestore");
const ChatRoom = require("../model/chatRoom");

const createOrGetChatRoom = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const data = req.body;

  try {
    // Tìm chatRoom đã tồn tại giữa hai người dùng
    const chatRoomsRef = collection(firestoreDb, "chatRooms");
    const q = query(
      chatRoomsRef,
      where("participants", "array-contains", data.senderId)
    );
    const snapshot = await getDocs(q);

    // Kiểm tra xem đã có chatRoom chưa
    const existingChatRoom = snapshot.docs.find((doc) => {
      const participants = doc.data().participants;
      return participants.includes(data.recipientId);
    });

    // Lấy thông tin người dùng
    const senderRef = doc(firestoreDb, "users", data.senderId);
    const recipientRef = doc(firestoreDb, "users", data.recipientId);

    const [senderDoc, recipientDoc] = await Promise.all([
      getDoc(senderRef),
      getDoc(recipientRef),
    ]);

    if (!senderDoc.exists() || !recipientDoc.exists()) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }

    let chatRoomRef;
    let chatRoomId;

    if (existingChatRoom) {
      // Nếu chatRoom đã tồn tại, lấy ID
      chatRoomRef = existingChatRoom.ref;
      chatRoomId = existingChatRoom.id;
    } else {
      // Tạo chatRoom mới nếu chưa tồn tại
      const newChatRoom = new ChatRoom({
        participants: [data.senderId, data.recipientId],
        lastMessage: null,
        unreadCount: {
          [data.senderId]: 0,
          [data.recipientId]: 0,
        },
      });

      // Thêm chatRoom vào collection chatRooms
      chatRoomRef = await addDoc(chatRoomsRef, newChatRoom.toPlainObject());
      chatRoomId = chatRoomRef.id;

      // Thêm chatRoom vào subcollection của người dùng
      const senderChatRoomRef = doc(
        firestoreDb,
        "users",
        data.senderId,
        "chatRooms",
        chatRoomId
      );
      const recipientChatRoomRef = doc(
        firestoreDb,
        "users",
        data.recipientId,
        "chatRooms",
        chatRoomId
      );

      await Promise.all([
        setDoc(senderChatRoomRef, {
          chatRoomId: chatRoomId,
          recipientId: data.recipientId,
          lastMessage: null,
          createdAt: serverTimestamp(),
        }),
        setDoc(recipientChatRoomRef, {
          chatRoomId: chatRoomId,
          senderId: data.senderId,
          lastMessage: null,
          createdAt: serverTimestamp(),
        }),
      ]);
    }

    // Thêm tin nhắn đầu tiên vào subcollection messages
    const messagesRef = collection(chatRoomRef, "messages");
    const messageRef = await addDoc(messagesRef, {
      content: data.content,
      sendTime: serverTimestamp(),
      senderId: data.senderId,
      type: data.type,
    });

    // Cập nhật lastMessage và unreadCount
    await updateDoc(chatRoomRef, {
      lastMessage: {
        content: data.content,
        sendTime: serverTimestamp(),
        senderId: data.senderId,
        type: data.type,
      },
      [`unreadCount.${data.recipientId}`]: increment(1),
    });

    // Cập nhật lastMessage cho subcollection của người dùng
    const senderChatRoomRef = doc(
      firestoreDb,
      "users",
      data.senderId,
      "chatRooms",
      chatRoomId
    );
    const recipientChatRoomRef = doc(
      firestoreDb,
      "users",
      data.recipientId,
      "chatRooms",
      chatRoomId
    );

    await Promise.all([
      updateDoc(senderChatRoomRef, {
        lastMessage: {
          content: data.content,
          sendTime: serverTimestamp(),
          senderId: data.senderId,
          type: data.type,
        },
      }),
      updateDoc(recipientChatRoomRef, {
        lastMessage: {
          content: data.content,
          sendTime: serverTimestamp(),
          senderId: data.senderId,
          type: data.type,
        },
      }),
    ]);

    return res.status(201).json({
      id: chatRoomId,
      messageId: messageRef.id,
    });
  } catch (error) {
    console.error("Lỗi tạo chatRoom:", error);
    res.status(500).json({ error: error.message });
  }
};

// Hàm thêm tin nhắn mới vào chatRoom
const addMessageToChatRoom = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const { chatRoomId, senderId, recipientId, content, type } = req.body;

  try {
    // Validation check
    if (!chatRoomId || !senderId || !recipientId || !content || !type) {
      return res.status(400).json({
        error: "Missing required fields.",
        details: {
          chatRoomId: !!chatRoomId,
          senderId: !!senderId,
          recipientId: !!recipientId,
          content: !!content,
          type: !!type,
        },
      });
    }

    // Sử dụng batch để gom nhóm các thao tác write
    const batch = writeBatch(firestoreDb);
    
    // Tạo message data với serverTimestamp
    const messageData = {
      content,
      sendTime: serverTimestamp(),
      senderId,
      type,
    };

    // Tham chiếu các documents cần update
    const chatRoomRef = doc(firestoreDb, "chatRooms", chatRoomId);
    const messagesRef = collection(chatRoomRef, "messages");
    const newMessageRef = doc(messagesRef);
    const senderChatRoomRef = doc(firestoreDb, "users", senderId, "chatRooms", chatRoomId);
    const recipientChatRoomRef = doc(firestoreDb, "users", recipientId, "chatRooms", chatRoomId);

    // Thêm message mới
    batch.set(newMessageRef, messageData);

    // Update chatRoom
    batch.update(chatRoomRef, {
      lastMessage: messageData,
      [`unreadCount.${recipientId}`]: increment(1),
    });

    // Update user's chatRooms
    const userChatRoomUpdate = {
      lastMessage: messageData,
    };

    batch.update(senderChatRoomRef, userChatRoomUpdate);
    batch.update(recipientChatRoomRef, userChatRoomUpdate);

    // Thực hiện tất cả updates trong một transaction
    await batch.commit();

    // Trả về kết quả sớm
    return res.status(201).json({
      messageId: newMessageRef.id,
      message: "Tin nhắn đã được gửi thành công"
    });

  } catch (error) {
    console.error("Lỗi thêm tin nhắn:", error);
    return res.status(500).json({
      error: "Không thể gửi tin nhắn",
      details: error.message,
    });
  }
};

// Hàm lấy danh sách tin nhắn trong chatRoom
const getMessagesInChatRoom = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const { chatRoomId } = req.params;

  try {
    const chatRoomRef = doc(firestoreDb, "chatRooms", chatRoomId);
    const messagesRef = collection(chatRoomRef, "messages");

    // Truy vấn tất cả tin nhắn
    const snapshot = await getDocs(messagesRef);

    const messages = snapshot.docs.map((doc) => {
      const data = doc.data();

      // Chuyển đổi sendTime thành timestamp để so sánh
      let sendTimeStamp;
      if (
        data.sendTime &&
        typeof data.sendTime === "object" &&
        data.sendTime.seconds
      ) {
        sendTimeStamp = new Date(data.sendTime.seconds * 1000);
      } else if (data.sendTime && typeof data.sendTime === "string") {
        sendTimeStamp = new Date(data.sendTime);
      } else {
        sendTimeStamp = new Date();
      }

      return {
        id: doc.id,
        ...data,
        sendTime: sendTimeStamp.toISOString(), // Chuẩn hóa về ISO string
        _sortTime: sendTimeStamp.getTime(), // Thêm trường để sắp xếp
      };
    });

    // Sắp xếp theo thời gian
    const sortedMessages = messages.sort((a, b) => a._sortTime - b._sortTime);

    // Loại bỏ trường _sortTime trước khi trả về
    const finalMessages = sortedMessages.map(({ _sortTime, ...rest }) => rest);

    return res.status(200).json(finalMessages);
  } catch (error) {
    console.error("Lỗi lấy tin nhắn:", error);
    res.status(500).json({ error: error.message });
  }
};

const getChatRooms = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const { userId } = req.params;

  try {
    // Lấy subcollection chatRooms của người dùng
    const userChatRoomsRef = collection(
      firestoreDb,
      "users",
      userId,
      "chatRooms"
    );
    const snapshot = await getDocs(userChatRoomsRef);

    // Kiểm tra nếu không có chatRoom nào
    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    const chatRooms = await Promise.all(
      snapshot.docs.map(async (chatRoomDoc) => {
        const chatRoomData = chatRoomDoc.data();

        // Kiểm tra chatRoomId có tồn tại không
        if (!chatRoomData.chatRoomId) {
          console.warn("Chatroom without chatRoomId:", chatRoomData);
          return null;
        }

        try {
          // Lấy thông tin chatRoom chi tiết
          const fullChatRoomRef = doc(
            firestoreDb,
            "chatRooms",
            chatRoomData.chatRoomId
          );
          const fullChatRoomDoc = await getDoc(fullChatRoomRef);

          // Kiểm tra chatRoom có tồn tại không
          if (!fullChatRoomDoc.exists()) {
            console.warn(`ChatRoom not found: ${chatRoomData.chatRoomId}`);
            return null;
          }

          // Lấy thông tin người dùng khác trong chatRoom
          const otherUserId = chatRoomData.recipientId || chatRoomData.senderId;
          let otherUserDoc;
          if (otherUserId) {
            const otherUserRef = doc(firestoreDb, "users", otherUserId);
            otherUserDoc = await getDoc(otherUserRef);
          }
          const otherUserData = otherUserDoc
            ? {
                id: otherUserDoc.id,
                username: otherUserDoc.data().username,
                avatar: otherUserDoc.data().avatar,
              }
            : null;

          return {
            id: fullChatRoomDoc.id,
            ...fullChatRoomDoc.data(),
            otherUser: otherUserData,
            // Thêm thông tin từ subcollection chatRooms nếu cần
            //   subcollectionData: chatRoomData
          };
        } catch (innerError) {
          console.error(
            `Error processing chatRoom ${chatRoomData.chatRoomId}:`,
            innerError
          );
          return null;
        }
      })
    );

    // Lọc bỏ các giá trị null (chatRoom không hợp lệ)
    const validChatRooms = chatRooms.filter((room) => room !== null);

    // Sắp xếp theo tin nhắn mới nhất
    const sortedChatRooms = validChatRooms.sort((a, b) => {
      const aTime = a.lastMessage?.sendTime?.toMillis() || 0;
      const bTime = b.lastMessage?.sendTime?.toMillis() || 0;
      return bTime - aTime;
    });

    return res.status(200).json(sortedChatRooms);
  } catch (error) {
    console.error("Lỗi lấy chatRooms:", error);
    res.status(500).json({
      error: error.message,
      details: "Đã xảy ra lỗi khi truy xuất danh sách cuộc trò chuyện",
    });
  }
};

const deleteChatRoom = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const { chatRoomId, senderId, recipientId } = req.body;

  try {
    // Tham chiếu tới chatRoom chính
    const chatRoomRef = doc(firestoreDb, "chatRooms", chatRoomId);

    // Tham chiếu tới subcollection chatRooms của người dùng
    const senderChatRoomRef = doc(
      firestoreDb,
      "users",
      senderId,
      "chatRooms",
      chatRoomId
    );
    const recipientChatRoomRef = doc(
      firestoreDb,
      "users",
      recipientId,
      "chatRooms",
      chatRoomId
    );

    // Batch write để đảm bảo tính nhất quán
    const batch = writeBatch(firestoreDb);

    // Xóa chatRoom chính
    batch.delete(chatRoomRef);

    // Xóa chatRoom khỏi subcollection của người dùng
    batch.delete(senderChatRoomRef);
    batch.delete(recipientChatRoomRef);

    // Thực hiện batch write
    await batch.commit();

    return res.status(200).json({
      message: "ChatRoom đã được xóa thành công",
    });
  } catch (error) {
    console.error("Lỗi xóa chatRoom:", error);
    res.status(500).json({
      error: "Không thể xóa chatRoom",
      details: error.message,
    });
  }
};

const updateChatRoomMessage = async (req, res) => {
  const firestoreDb = getFirestoreDb();
  const {
    chatRoomId,
    senderId, // Người dùng hiện tại
    recipientId, // Người nhận tin nhắn
    isRead = false,
  } = req.body;

  try {
    // Tham chiếu tới chatRoom
    const chatRoomRef = doc(firestoreDb, "chatRooms", chatRoomId);

    // Chuẩn bị update data
    const updateData = {};

    // Nếu isRead = true, reset unreadCount của người dùng hiện tại về 0
    if (isRead) {
      updateData[`unreadCount.${senderId}`] = 0;
    }
    // Nếu không phải đang đọc tin nhắn (nghĩa là người nhận không trong chat room)
    else {
      // Tăng unreadCount của người nhận
      updateData[`unreadCount.${recipientId}`] = increment(1);
    }

    // Cập nhật chatRoom
    await updateDoc(chatRoomRef, updateData);

    return res.status(200).json({
      message: "Cập nhật unreadCount thành công",
      unreadStatus: isRead ? "Đã đọc" : "Chưa đọc",
    });
  } catch (error) {
    console.error("Lỗi cập nhật tin nhắn:", error);
    res.status(500).json({
      error: "Không thể cập nhật tin nhắn",
      details: error.message,
    });
  }
};

module.exports = {
  createOrGetChatRoom,
  getChatRooms,
  addMessageToChatRoom,
  getMessagesInChatRoom,
  updateChatRoomMessage,
  deleteChatRoom,
};
