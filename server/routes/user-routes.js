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
const {
  checkAllBoxTrue,
  checkAllBoxFalse,
  updateQuantity,
  deleteCheckedItems,
} = require("../controller/shopCartController");
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
router.delete("/deleteCheckedItems/:id", deleteCheckedItems);
router.patch("/checkAllBoxTrue/:id", checkAllBoxTrue);
router.patch("/checkAllBoxFalse/:id", checkAllBoxFalse);

router.patch("/updateQuantity/:id", updateQuantity);

module.exports = { routes: router };
