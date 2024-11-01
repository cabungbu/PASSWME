const express = require('express');
const router = express.Router();
const OrderController = require('../controller/orderController');

// Route để thêm danh mục
router.post('/addOrder/', OrderController.addOrder);

// Route để lấy tất cả danh mục
router.get('/', OrderController.getAllOrders);

// Route để lấy danh mục theo ID
router.get('/:id', OrderController.getOrderById);

// Route để cập nhật danh mục
router.put('/:id/updateOrder', OrderController.updateOrder);

// Route để xóa danh mục
router.delete('/:id/deleteOrder', OrderController.deleteOrder);

// module.exports = router;

module.exports = { routes: router };