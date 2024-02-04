const router = require("express").Router();
const userRouter = require("../controller/user");
const loginRouter = require("../controller/login");
const bookRouter = require("../controller/book");
const orderRouter = require("../controller/order");
const paymentRouter = require("../controller/payment");
const middleware = require("../utils/middleware");
// ==============================================================
//user routes
router.get("/api/user", userRouter.list);
router.post("/api/user", userRouter.create);
router.get("/api/user/:id", userRouter.getid);
router.put("/api/user/:id", userRouter.update);
router.delete("/api/user/:id", userRouter.remove);

//login routes=================================================
router.post("/api/login", loginRouter.login);

// start book routes=================================
router.get("/api/book", bookRouter.bookList);
router.post(
  "/api/book",
  middleware.tokenExtractor,
  middleware.userExtractor,
  bookRouter.createBook
);
router.get("/api/book/:id", bookRouter.getBook);
router.put("/api/book/:id", bookRouter.updateBook);
router.delete("/api/book/:id", bookRouter.deleteBook);

//end book router=================================

// order routes starts============================
router.get("/api/order", orderRouter.orderList);
router.post(
  "/api/order/:bookId",
  middleware.tokenExtractor,
  middleware.userExtractor,
  orderRouter.createOrder
);
router.put(
  "/api/order/:id",
  middleware.tokenExtractor,
  middleware.userExtractor,
  orderRouter.returnStatus
);
router.get("/api/order/:id", orderRouter.getid);
router.delete("/api/order/:id", orderRouter.deleteOrder);
// ======================== end of the payment router===========

// =========================Start of the payment router===========
router.get("/api/payment", paymentRouter.paymentList);
router.post(
  "/api/payment",
  middleware.tokenExtractor,
  middleware.userExtractor,
  paymentRouter.createPayment
);
router.get("/api/payment/:id", paymentRouter.getPaymentById);
router.delete("/api/payment", paymentRouter.deletePayment);
module.exports = router;
