const express = require("express");
const { getQuickReplies } = require("../controller/quickReplyController");

const router = express.Router();

router.get("", getQuickReplies);

module.exports = { routes: router };
