const rexpress = require("express");
const book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");
const { sendMail } = require("./emailcontroller");
const emailController = require("../controller/emailcontroller");
const { updateBook } = require("./book");

module.exports = {
  // / Controller to get all orders
  async orderList(req, res, next) {
    try {
      console.log("testing");
      const orders = await Order.find({});
      res.json(orders);
    } catch (error) {
      next(error);
    }
  },
  async createOrder(req, res, next) {
    try {
      const bookId = req.params.bookId;
      const { address } = req.body;
      const loginUser = req.user;
      console.log(req.body, "found user", req.user);
      // Set rent date to the current date
      const rentDate = new Date();
      // Calculate the deadline (7 days from the rent date)
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

      if (OrderDate === "Date.now") {
        const subject = "Your Order";
        const text = `Your Order has been successfully placed. Your order ID ${savedOrder._id} has an active rented book.`;
        const book = await book.findById(savedOrder.bookId).populate("userId");
        if (book) {
          await emailController.sendNewOrderEmail(
            book.userId.email,
            savedOrder._id
          );
        }
      }
      res.status(201).json(savedOrder);
    } catch (error) {
      next(error);
    }
  },
  async getid(req, res, next) {
    try {
      const id = req.params.id;
      const order = await User.findById(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  },
  async returnStatus(req, res, next) {
    const loginUser = req.user;
    const orderId = req.params.id;
    console.log(loginUser);
    if (loginUser.userType === "admin") {
      try {
        console.log("from if else");
        const order = await Order.findByIdAndUpdate(orderId, {
          returnStatus: "Yes",
        });

        switch (rentDate) {
          case "rentDate":
            const bookId = updatedOrder.bookId;
            const rentDateBook = await book.findById(bookId).populate("userId");
            if (rentDateBook) {
              await emailController.sendNewOrderEmail(
                rentDateBook.userId.email,
                rentDateBook.userid.fullName,
                updateBook._id
              );
            }
            break;
          case "deadline":
            const deadlineOrder = await book
              .findById(updatedOrder.bookId)
              .populate("userId");
            if (deadlineOrder) {
              await emailController.sendDeadlineEmail(
                deadlineOrder.userId.email,
                updateBook.title,
                updateBook._id
              );
            }
            break;
        }
        res.status(201).send(order);
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
        return res.status(404).send("User not found");
      }

      res.json(deletedOrder);
    } catch (error) {
      next(error);
    }
  },
};
