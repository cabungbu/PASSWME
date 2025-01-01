const express = require("express");
const {
  addServicePost,
  getAllServicePosts,
  updateServicePostStatus,
  deleteServicePost,
  getPostById,
} = require("../controller/servicePostController");

const router = express.Router();

router.post("/add", addServicePost);
router.get("/get", getAllServicePosts);
router.get("/get/:id", getPostById);
router.delete("/delete", deleteServicePost);
router.patch("/update", updateServicePostStatus);

module.exports = { routes: router };
