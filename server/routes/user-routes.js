const express = require("express");
const {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserShopCart,
  addToShopCart,
  updateShopCart,
  removeProductFromCart,
  checkboxProduct,
  setProductNotCheck,
} = require("../controller/userController");
const { verifyToken } = require("../controller/middlewareController");
const router = express.Router();

router.post("/addUser", verifyToken, addUser);
router.get("/getAllUser", getAllUsers);
router.get("/getUserById/:id", getUserById);
router.get("/getUserShopCart/:id", getUserShopCart);
router.delete("/deleteUser/:id", verifyToken, deleteUser);
router.patch("/updateUser/:id", verifyToken, updateUser);
router.post("/addToShopCart/:id", addToShopCart);
router.patch("/updateShopCart/:id", updateShopCart);
router.put("/checkboxProduct/:id", checkboxProduct);
router.put("/setProductNotCheck/:id", setProductNotCheck);
router.delete("/removeProductFromCart/:id", removeProductFromCart);
module.exports = { routes: router };
