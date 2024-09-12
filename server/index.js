const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { initializeFirebaseApp, upLoadData } = require("./config/firebase.js");
const userRoutes = require("./routes/user-routes.js");
const postRoutes = require("./routes/post-routes.js");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes.routes);
app.use("/post", postRoutes.routes);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

initializeFirebaseApp();
