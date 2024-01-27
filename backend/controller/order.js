const Order = require("../models/order");
const User = require("../models/user");
module.exports = {
  // / Controller to get all orders
  async orderList(req, res, next) {
    try {
      const orders = await Order.find();

      res.json(orders);
    } catch (error) {
      next(error);
    }
  },
  //   async getById(req, res, next){
  //     try{
  // const order = await this.orderList.findById(req.params.id)
  //     }
  //     if(!this.orderList){
  //         return res.status(404).jason({" This user has not any history"});
  // catch(error){
  //     next(error)
  // }
  //     }
  //   },

  async createOrder(req, res, next) {
    try {
      const bookId = req.params.id;
      const { address } = req.body;
      console.log(req.body, "found user", req.User);
      // Set rent date to the current date
      const rentDate = new Date();
      // Calculate the deadline (7 days from the rent date)
      const deadline = new Date(rentDate);
      deadline.setDate(deadline.getDate() + 7);

      const newOrder = new Order({
        userId,
        bookId,
        rentDate,
        deadline,
        address,
      });

      const savedOrder = await newOrder.save();

      res.status(201).json(savedOrder);
    } catch (error) {
      next(error);
    }
  },
};
