const express = require("express");
const {
    // createOrGetChatRoom,
    getChatRooms,
    addMessageToChatRoom,
    getMessagesInChatRoom,
    updateChatRoomMessage, 
    deleteChatRoom,
    checkExistingChatRoom,   // Thêm hàm check chat room
    createChatRoom           // Thêm hàm tạo chat room
} = require("../controller/chatRoomController");

const { verifyToken } = require("../controller/middlewareController");
const { getFirestoreDb } = require("../config/firebase");

const router = express.Router();

// Route kiểm tra xem chat room có tồn tại hay không
router.post('/checkExisting', checkExistingChatRoom);

// Route tạo chat room mới
router.post('/create', createChatRoom);

// Route xóa chat room
router.delete('/delete', deleteChatRoom);

// Route lấy danh sách chat room của người dùng
router.get('/:userId', getChatRooms);

// Route thêm tin nhắn mới vào chat room
router.post('/addMessage', addMessageToChatRoom);

// Route lấy tất cả tin nhắn trong một chat room
router.get('/:chatRoomId/messages', getMessagesInChatRoom);

// Route cập nhật thông tin tin nhắn trong chat room
router.post('/updateMessage', updateChatRoomMessage);

module.exports = { routes: router };
