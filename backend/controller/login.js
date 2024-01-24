require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
module.exports = {
  async login(req, res, next) {
    try {
      const { phone, password } = req.body;
      console.log(req.body);
      //console.log(process.env.SECRET); == checking the working process of the env
      const user = await User.findOne({ phone });
      const passwordCorrect =
        user === null
          ? false
          : await bcrypt.compare(password, user.passwordHash);

      if (!(user && passwordCorrect)) {
        return res.status(401).json({
          error: "invalid username or password",
        });
      }

      const userForToken = {
        email: user.email,
        id: user._id,
      };

      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 30,
      });
      res.redirect("/");
      // res.status(200).send({
      //   token,
      //   userName: user.userName,
      //   name: user.name,
      //   id: user._id,
      // });
    } catch (error) {
      next(error);
    }
  },
};
