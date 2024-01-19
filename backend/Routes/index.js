const router = require("express").Router();
const userRouter = require("../controller/user");

router.get("/api/user", userRouter.list);
router.post("/api/user", userRouter.create);
router.get("/api/user/:id", userRouter.getid);
router.put("/api/user/:id", userRouter.update);
router.delete("/api/user/:id", userRouter.remove);
module.exports = router;
