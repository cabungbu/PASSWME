const express = require("express");
const {
  addPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
  getPostByCategory,
  searchPosts,
  updatePostStatus
} = require("../controller/postController");

const router = express.Router();

router.post("/addPost", addPost);
router.get("/getAllPost", getAllPost);
router.get("/getPostByCategory", getPostByCategory);
router.get("/getPostById/:id", getPostById);
router.delete("/deletePost/:id", deletePost);
router.patch("/updatePost/:id", updatePost);
router.patch("/updatePostStatus/:id", updatePostStatus);
router.get('/search', searchPosts);

module.exports = { routes: router }; 
