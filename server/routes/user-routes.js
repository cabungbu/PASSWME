const express = require("express");
const {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserShopCart,
} = require("../controller/userController");

const router = express.Router();

router.post("/addUser", addUser);
router.get("/getAllUser", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.get("/getUserShopCart/:id", getUserShopCart);
router.delete("/deleteUser/:id", deleteUser);
router.patch("/updateUser/:id", updateUser);

module.exports = { routes: router };
