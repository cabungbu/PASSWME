const express = require("express");
const {
  addServicePost,
  getAllServicePosts,
  updateServicePostStatus,
  deleteServicePost,
} = require("../controller/servicePostController");

const router = express.Router();

router.post("/add", addServicePost);
router.get("/get", getAllServicePosts);
router.delete("/delete", deleteServicePost);
router.patch("/update", updateServicePostStatus);

module.exports = { routes: router };
