const Payment = require("../models/payment");
// Controller to handle fetching all payments
module.exports = {
  async paymentList(req, res, next) {
    try {
      const payments = await Payment.find({});
      res.status(200).json(payments);
    } catch (error) {
      next(error);
    }
  },

  // Controller to handle fetching a specific payment by ID
  async getPaymentById(req, res, next) {
    try {
      const payment = await Payment.findById(req.params.paymentId);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.status(200).json(payment);
    } catch (error) {
      next(error);
    }
  },

  // Controller to handle creating a new payment
  async createPayment(req, res, next) {
    try {
      const orderId = req.params.orderId;
      const { paymentMethod, remarks } = req.body;
      const loginUser = req.user;
      const amount = req.params.bookId;
      const newPayment = new payment({
        orderId,
        paymentMethod,
        remarks,
        amount,
        userId: loginUser._id,
      });
      const savedPayment = await newPayment.save();
      res.status(201).jason(savedPayment);
    } catch (error) {
      next(error);
    }
  },

  // Controller to handle deleting a payment by ID
  async deletePayment(req, res, next) {
    try {
      const deletedPayment = await Payment.findByIdAndDelete(
        req.params.paymentId
      );
      if (!deletedPayment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
