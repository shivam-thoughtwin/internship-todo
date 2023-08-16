const restRouter = require("express").Router();

const {
  Routes: { AUTH, TODO },
} = require("../constants");
const { authRouter } = require("./auth.routes");
const { todoRouter } = require("./todo.routes");

restRouter.use(AUTH.DEFAULT, authRouter);
restRouter.use(TODO.DEFAULT, todoRouter);

module.exports = { restRouter };
