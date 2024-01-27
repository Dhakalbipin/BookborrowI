const jwt = require("jsonwebtoken");
const User = require("../models/user");
// this is the token extractor from Token
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
    return next();
  }
  request.token = null;
  return next();
};

const userExtractor = async (request, response, next) => {
  try {
    if (request.token) {
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      if (!decodedToken.id) {
        return res.status(401).json({ error: "token invalid" });
      }

      request.user = await User.findById(decodedToken.id);
      console.log(request.user);
      return next();
    }
    request.user = null;
    return next();
  } catch (error) {
    next(error);
  }
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
module.exports = unknownEndpoint;
const errorHandler = (error, request, response, next) => {
  console.log("---------");

  if (error.name === "ValidationError") {
    return response
      .status(400)
      .json({ error: error.message, Mymessage: "messsage from middleware" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};
module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
