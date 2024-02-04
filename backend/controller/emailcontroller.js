const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const emailService = {
  async sendEmail(email, subject, text) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });
  },
};
module.exports = {
  async sendNewOrderEmail(email, name, orderId) {
    (subject = "Your Order has been Sucessufully placed"),
      (text = `Hello ${name} jee, Your Order has been successfully placed. Your order ID ${orderId} has an active rented book.`);
    await emailService.sendNewOrderEmail(email, subject, text);
  },

  async sendDeadlineEmail(email, bookId, orderId) {
    (subject = "Order Deadline Reminder"),
      (text = `Reminder: The deadline for returning the book "${bookId}" (Order ID: ${orderId}) is approaching within 24 hours. Please return it on time.`);
    await emailService.sendEmail(email, bookId, orderId);
  },
};
