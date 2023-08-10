const restRouter = require("express").Router();

const {
  Routes: { AUTH, USER, TODO },
} = require("../constants");
const { authRouter } = require("./auth.routes");
const { usersRouter } = require("./users.routes");
const { todoRouter } = require("./todo.routes");

restRouter.use(AUTH.DEFAULT, authRouter);
restRouter.use(USER.DEFAULT, usersRouter);
restRouter.use(TODO.DEFAULT, todoRouter);

module.exports = { restRouter };
