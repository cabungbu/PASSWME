const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { initializeFirebaseApp, upLoadData } = require("./config/firebase.js");
const userRoutes = require("./routes/user-routes.js");
const postRoutes = require("./routes/post-routes.js");
const authRoutes = require("./routes/auth.js");
const categoryRoutes = require("./routes/category-route.js");
const orderRoutes = require("./routes/order-route.js");
const feedbackRoutes = require("./routes/feedback-route.js");
const servicePostRoutes = require("./routes/servicePost-routes.js");

const app = express();
app.use(bodyParser.json());
const corsOptions = {
  origin: ["http://192.168.1.8:3000"], // Add your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/user", userRoutes.routes);
app.use("/post", postRoutes.routes);
app.use("/auth", authRoutes.routes);
app.use("/category", categoryRoutes.routes);
app.use("/order", orderRoutes.routes);
app.use("/feedback", feedbackRoutes.routes);
app.use("/servicePost", servicePostRoutes.routes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

initializeFirebaseApp();
