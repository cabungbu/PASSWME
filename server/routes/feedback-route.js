const express = require("express");
const { 
  addFeedback,
  getPostFeedbacks,
  getUserFeedbacks 
} = require("../controller/feedbackController");

const router = express.Router();

// Route để thêm phản hồi cho đơn hàng
router.post("/addFeedback", addFeedback);

// Route để lấy phản hồi của bài đăng sản phẩm
router.get("/getPostFeedbacks/:postId", getPostFeedbacks);

// Route để lấy phản hồi của người dùng
router.get("/getUserFeedbacks/:userId", getUserFeedbacks);

module.exports = { routes: router };
