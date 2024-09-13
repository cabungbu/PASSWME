const express = require("express");
const {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserShopCart,
} = require("../controller/userController");
const { verifyToken } = require("../controller/middlewareController");
const router = express.Router();

router.post("/addUser", verifyToken, addUser);
router.get("/getAllUser", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.get("/getUserShopCart/:id", getUserShopCart);
router.delete("/deleteUser/:id", verifyToken, deleteUser);
router.patch("/updateUser/:id", verifyToken, updateUser);

module.exports = { routes: router };
