const userRouter = require("express").Router(); //express initailize
const User = require("../models/user.js"); // import the index.js file from models
const bcrypt = require("bcrypt");
const userRouterid = require("express").Router();
userRouter.get("/", async (req, res, next) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    next(error);
  }
});
userRouter.post("/", async (req, res, next) => {
  try {
    console.log("Postman testing", req.body);
    const {
      name,
      userName,
      password,
      email,
      phone,
      address,
      amount,
      holdingAmount,
      userHistory,
      userType,
    } = req.body;
    if (password.length < 8) {
      return res.status(404).send("Password can not be less than 8 characters");
    }
    const passwordHash = await bcrypt.hash(password, 13);
    const user = new User({
      userName,
      name,
      passwordHash,
      email,
      phone,
      address,
      amount,
      holdingAmount,
      userHistory,
      userType,
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});
userRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
module.exports = userRouter;
