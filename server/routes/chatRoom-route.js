const express = require("express");
const {
    createOrGetChatRoom,
    getChatRooms,
    addMessageToChatRoom,
    getMessagesInChatRoom,
    updateChatRoomMessage, 
    deleteChatRoom,
} = require("../controller/chatRoomController");
const { verifyToken } = require("../controller/middlewareController");
const router = express.Router();

router.post('/create', createOrGetChatRoom);
router.delete('/delete', deleteChatRoom);
router.get('/:userId', getChatRooms);
router.post('/addMessage', addMessageToChatRoom);
router.get('/:chatRoomId/messages', getMessagesInChatRoom);
router.post('/updateMessage', updateChatRoomMessage);
module.exports = { routes: router };
