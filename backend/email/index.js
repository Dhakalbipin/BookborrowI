// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmai.com",
//   port: 587,
//   secure: true,
//   auth: {
//     user: process.env.USER, // sender gmail address
//     pass: process.env.APP_PASSWORD, // password from gmail account
//   },
// });
// const mailOptions = {
//   from: {
//     name: "Book borrow system",
//     address: process.env.USER,
//   }, // sender address

//   to: "beepindhakal980@gmail.com, baz@example.com", // list of receivers
//   subject: "sending email using nodemailer and gmail", // Subject line
//   text: "Hello world?", // plain text body
//   html: "<b>Hello world?</b>", // html body
// };
// const sendMail = async (mailOptions) => {
//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("email has been sent succefully");
//   } catch (error) {
//     console.error(error);
//   }
// };
// sendMail(transporter, mailOptions);
