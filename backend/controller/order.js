const book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");
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
    if (loginUser.userType === "admin") {
      try {
        const order = await Order.findByIdAndUpdate(orderId, {
          returnStatus: "yes",
        });
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
