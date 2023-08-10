const todoRouter = require("express").Router();

const {
  Routes: { TODO },
  UserRoles: { ADMIN },
} = require("../constants");
const {
  todoController: {
    getAllTodoHandler,
    getTodoByIdHandler,
    updateTodoHandler,
    deleteTodoHandler,
    createTodoHandler,
    changeStatusTodoHandler,
  },
} = require("../controller");
const { verifyToken, restrictTo } = require("../middleware");
const {
  multerService: { uploadUserPhoto, resizeUserPhoto },
} = require("../services");

todoRouter.route(TODO.CREATE).post(verifyToken, createTodoHandler);
todoRouter.route(TODO.CHANGE).post(verifyToken, changeStatusTodoHandler);
todoRouter.route(TODO.ALL).get(verifyToken, getAllTodoHandler);

todoRouter
  .route(TODO.DETAIL)
  .get(verifyToken, getTodoByIdHandler)
  .put(verifyToken, updateTodoHandler)
  .delete(verifyToken, deleteTodoHandler);

module.exports = { todoRouter };
