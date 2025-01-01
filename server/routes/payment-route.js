const express = require("express");
const {
  createPayment,
  callbackPayment,
  checkTransaction,
} = require("../controller/paymentMoMoController");

const router = express.Router();

router.post("/add", createPayment);

router.post("/callback", callbackPayment);

router.post("/check-status", checkTransaction);

module.exports = { routes: router };
