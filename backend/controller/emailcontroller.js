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
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
      });
      console.log("Email sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  },
};

module.exports = {
  async sendNewOrderEmail(email, name, orderId) {
    const subject = "Your Order has been Successfully placed";
    const text = `Hello ${name}, Your Order has been successfully placed. Your order ID ${orderId} has an active rented book.`;
    await emailService.sendEmail(email, subject, text);
  },

  async sendDeadlineEmail(email, bookId, orderId) {
    const subject = "Order Deadline Reminder";
    const text = `Reminder: The deadline for returning the book "${bookId}" (Order ID: ${orderId}) is approaching within 24 hours. Please return it on time.`;
    await emailService.sendEmail(email, subject, text);
  },
};
