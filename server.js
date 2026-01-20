const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");

//Routers
const userRouter = require("./routes/users");
const vehicleRouter = require("./routes/vehicles");
const daRouter = require("./routes/das");

const SERVERDEVPORT = 4741;
const CLIENTDEVPORT = 5173;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("connected", function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

const app = express();
app.use(require("./config/checkToken"));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || `http://localhost:${CLIENTDEVPORT}`,
  }),
);

const PORT = process.env.PORT || SERVERDEVPORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ensureLoggedIn = require("./config/ensureLoggedIn");

app.use("/users", userRouter);

app.use("/vehicles", ensureLoggedIn, vehicleRouter);

app.use("/das", ensureLoggedIn, daRouter);

//Email Verification Code Configuration

const transporter = nodemailer.createTransport({
  service: "Gmail", // or another email service
  auth: {
    user: "apollodispatch96@gmail.com",
    pass: "sdvm mdyg pngl iiid",
  },
});

app.post("/send-verification-email", (req, res) => {
  const { email, code } = req.body;

  const mailOptions = {
    from: "apollodispatch96@gmail.com",
    to: email,
    subject: "Apollo Dispatch Verification Code",
    text: `Hello! This message is so you can verify your Apollo Dispatch account, Your verification code is ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.post("/email-reset-code", (req, res) => {
  const { email, code } = req.body;

  const mailOptions = {
    from: "apollodispatch96@gmail.com",
    to: email,
    subject: "Apollo Dispatch Reset PW Code",
    text: `Your PW reset code is ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

//App Listener
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

module.exports = app;
