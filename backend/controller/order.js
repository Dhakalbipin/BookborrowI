const Order = require("../models/order");
const Book = require("../models/book");
const User = require("../models/user");
const emailController = require("../controller/emailcontroller");

module.exports = {
  async orderList(req, res, next) {
    try {
      const orders = await Order.find({});
      res.json(orders);
    } catch (error) {
      next(error);
    }
  },

  async createOrder(req, res, next) {
    try {
      const { bookId, address, OrderDate } = req.body;
      const loginUser = req.user;

      const rentDate = new Date();
      const deadline = new Date(rentDate);
      deadline.setDate(deadline.getDate() + 7);

      const newOrder = new Order({
        bookId,
        rentDate,
        deadline,
        address,
        userId: loginUser._id,
      });

      const savedOrder = await newOrder.save();

      // Condition for sending email based on OrderDate (assuming it's 'rentDate')
      if (OrderDate === "rentDate") {
        const subject = "Your Order has been Successfully placed";
        const text = `Hello ${loginUser.fullName}, Your Order has been successfully placed. Your order ID ${savedOrder._id} has an active rented book.`;

        const book = await Book.findById(savedOrder.bookId).populate("userId");
        if (book) {
          await emailController.sendNewOrderEmail(
            book.userId.email,
            loginUser.fullName,
            savedOrder._id
          );
        }
      }

      res.status(201).json(savedOrder);
    } catch (error) {
      next(error);
    }
  },

  async returnStatus(req, res, next) {
    const loginUser = req.user;
    const orderId = req.params.id;

    if (loginUser.userType === "admin") {
      try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, {
          returnStatus: "Yes",
        });

        // Condition for sending email based on OrderDate
        switch (req.body.OrderDate) {
          case "rentDate":
            const rentDateBook = await Book.findById(
              updatedOrder.bookId
            ).populate("userId");
            if (rentDateBook) {
              await emailController.sendNewOrderEmail(
                rentDateBook.userId.email,
                loginUser.fullName,
                updatedOrder._id
              );
            }
            break;
          case "deadline":
            const deadlineOrder = await Book.findById(
              updatedOrder.bookId
            ).populate("userId");
            if (deadlineOrder) {
              await emailController.sendDeadlineEmail(
                deadlineOrder.userId.email,
                updatedOrder.bookId,
                updatedOrder._id
              );
            }
            break;
        }

        res.status(201).json(updatedOrder);
      } catch (error) {
        next(error);
      }
    } else {
      res.status(403).send("Not Allowed");
    }
  },

  async deleteOrder(req, res, next) {
    try {
      const id = req.params.id;
      const deletedOrder = await Order.findByIdAndDelete(id);

      if (!deletedOrder) {
        return res.status(404).send("Order not found");
      }

      res.json(deletedOrder);
    } catch (error) {
      next(error);
    }
  },
};
