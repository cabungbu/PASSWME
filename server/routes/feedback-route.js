const express = require("express");
const router = express.Router();
const feedbackController = require("../controller/feedbackController");

// Route để thêm danh mục
router.post("/add", feedbackController.addFeedback);

// Route để lấy tất cả danh mục
router.get("/", feedbackController.getAllFeedback);

// Route để lấy danh mục theo ID
router.get("/:id", feedbackController.getFeedbackById);

// Route để cập nhật danh mục
router.put("/:id", feedbackController.updateFeedback);

// Route để xóa danh mục
router.get("/getFeedbackInPost/:id", feedbackController.getFeedbackByPost);

// module.exports = router;

module.exports = { routes: router };
