const nodemailer = require("nodemailer");
require("dotenv").config();
const file = require("express-fileupload");
const express = require("express"); //Express variable call
const app = express(); // call the express function and return value save to app
const indexRouter = require("./Routes/index.js");
const fileUpload = require("express-fileupload");
require("./models/index.js");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(file({ useTempFile: true }));
app.set("view engine", "ejs");
app.set("views", "templates/views");
app.use("/", indexRouter);
app.get("/", (req, res, next) => {
  // '/' is home route
  res.render("index");
});
app.get("/login", (req, res, next) => {
  res.render("login");
});
app.get("/signup", (req, res, next) => {
  // '/' is home route
  res.render("signup");
});
module.exports = app;
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmai.com",
//   port: 465,
//   secure: true,
//   auth: {
//     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     user: ,
//     pass: ,
//   },
// });
// const mailOptions = {
// from:
// '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
// }
