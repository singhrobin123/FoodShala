const router = require("express").Router();
const userRouter = require("./modules/users/users.route");
const todosRouter = require("./modules/todos/todos.route");

router.use("/auth",userRouter);
router.use("/task",todosRouter);
module.exports = router;