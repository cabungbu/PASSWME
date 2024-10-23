const express = require("express");
const {
  addPost,
  getAllPost,
  getPostById,
  updatePost,
  deletePost,
  getPostByCategory,
} = require("../controller/postController");

const router = express.Router();

router.post("/addPost", addPost);
router.get("/getAllPost", getAllPost);
router.get("/getPostByCategory", getPostByCategory);
router.get("/getPostById/:id", getPostById);
router.delete("/deletePost/:id", deletePost);
router.patch("/updatePost/:id", updatePost);

module.exports = { routes: router };
