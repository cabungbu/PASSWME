const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/categoryController');

// Route để thêm danh mục
router.post('/', CategoryController.addCategory);

// Route để lấy tất cả danh mục
router.get('/', CategoryController.getAllCategories);

// Route để lấy danh mục theo ID
router.get('/:id', CategoryController.getCategoryById);

// Route để cập nhật danh mục
router.put('/:id', CategoryController.updateCategory);

// Route để xóa danh mục
router.delete('/:id', CategoryController.deleteCategory);

// module.exports = router;

module.exports = { routes: router };