const { getFirestoreDb } = require("../config/firebase.js");
const {
  collection,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
  arrayUnion,
  arrayRemove,
} = require("firebase/firestore");
//Create the HTTPS objects
const axios = require("axios");
//signature
const crypto = require("crypto");
var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
var accessKey = "F8BBA842ECF85";
var orderInfo = "Dịch vụ Passwme";
var partnerCode = "MOMO";
const createPayment = async (req, res) => {
  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  var redirectUrl = "passwme://momo-callback";
  var ipnUrl = "https://1ea6-58-186-10-32.ngrok-free.app/payment/momo/callback";
  var requestType = "payWithMethod";
  var amount = "5000";
  var orderId = "MOMO" + new Date().getTime();
  var requestId = orderId;
  var extraData = "";
  var orderGroupId = "";
  var autoCapture = true;
  var lang = "vi";

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature

  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });

  const options = {
    port: 443,
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  let result;
  try {
    result = await axios(options);
    if (result.data.resultCode === "1005") {
      // Gửi lại yêu cầu thanh toán khác, bạn có thể thực hiện thêm logic nếu cần
      return createPayment(req, res); // Tạo lại yêu cầu thanh toán mới
    }

    return res.status(200).json(result.data);
  } catch (err) {
    return res.status(500).json({
      message: "Error creating payment",
      error: err.message,
    });
  }
};

const callbackPayment = async (req, res) => {
  return res.status(200).json(req.body);
};

const checkTransaction = async (req, res) => {
  const { orderId } = req.body;
  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${orderId}`;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: "MOMO",
    requestId: orderId,
    orderId: orderId,
    signature: signature,
    lang: "vi",
  });
  const options = {
    port: 443,
    url: "https://test-payment.momo.vn/v2/gateway/api/query",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  let result;

  result = await axios(options);

  return res.status(200).json(result.data);
};
module.exports = {
  createPayment,
  callbackPayment,
  checkTransaction,
};
