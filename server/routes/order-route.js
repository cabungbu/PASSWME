const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");

// Route để thêm danh mục
router.post("/addOrder/", OrderController.addOrder);

// Route để lấy tất cả đơn hàng
router.get("/", OrderController.getAllOrders);

router.get("/getUserOrder/:id", OrderController.getUserOrder);

// Route để lấy tất cả các đơn hàng có trạng thái "sold"
router.get("/soldOrders/:id", OrderController.getSoldOrders);

router.get("/getUserOrderReceived/:id", OrderController.getUserOrderReceived);

// Route để lấy đơn hàng theo ID
router.get("/:id", OrderController.getOrderById);

// Route để cập nhật đơn hàng
router.put("/updateOrder/:id", OrderController.updateOrder);

// Route để xóa đơn hàng
router.delete("/deleteOrder/:id", OrderController.deleteOrder);

// module.exports = router;

module.exports = { routes: router };
