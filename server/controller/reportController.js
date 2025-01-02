const nodemailer = require("nodemailer");

const sendReportToMail = async (req, res) => {
  const { email, content, name } = req.body;
  try {
    // Thiết lập transporter cho nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "coffeeshopxh@gmail.com",
        pass: "nbwz atbl grzu pnhs", // Nên sử dụng biến môi trường cho thông tin nhạy cảm
      },
    });

    // Thiết lập nội dung mail
    const mailOptions = {
      from: email,
      to: "coffeeshopxh@gmail.com",
      subject: "Thư khiếu nại từ PASSWME",
      text:
        "Người dùng " +
        name +
        " (" +
        email +
        ") " +
        "muốn khiếu nại về việc: " +
        content,
    };

    // Gửi mail
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({
      message: "Gửi khiếu nại thành công.",
    });
  } catch (err) {
    console.error("Error in forgotPassword: ", err); // Log lỗi để dễ dàng gỡ lỗi
    res.status(500).json({ message: "Gửi khiếu nại thất bại." });
  }
};
module.exports = {
  sendReportToMail,
};
