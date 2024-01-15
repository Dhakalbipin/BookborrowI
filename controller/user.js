const userRouter = require("express").Router(); //express initailize
const User = require("./models/index.js"); // import the index.js file from models
const bcrypt = require("bcrypt");
const userRouterid = require("express").Router();
userRouter.get("./", async (req, res, next) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch {
    error;
  }
  next(error);
});
userRouter.post("./", async (req, res, next) => {
  try {
    console.log("Postman testing", req.body);
    const { name, username, password, email, phone } = req.body;
    if (password.length < 8) {
      return res.status(404).send("Password can not be less than 8 characters");
    }
    const passwordHash = await bcryot.hash(password, 100);
    const user = User({
      username,
      name,
      passwordHash,
      email,
      phone,
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});
module.exports = userRouter;
