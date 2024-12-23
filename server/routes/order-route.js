const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");

// Route để thêm danh mục
router.post("/addOrder/", OrderController.addOrder);

// Route để lấy tất cả danh mục
router.get("/", OrderController.getAllOrders);

router.get("/getUserOrder/:id", OrderController.getUserOrder);

router.get("/getUserOrderReceived/:id", OrderController.getUserOrderReceived);

// Route để lấy danh mục theo ID
router.get("/:id", OrderController.getOrderById);

// Route để cập nhật danh mục
router.put("/updateOrder/:id", OrderController.updateOrder);

// Route để xóa danh mục
router.delete("/deleteOrder/:id", OrderController.deleteOrder);

// module.exports = router;

module.exports = { routes: router };
