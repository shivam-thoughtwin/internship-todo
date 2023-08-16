const { HttpStatus } = require("../constants");
const { NotFoundException } = require("../errors");
const { asyncHandler } = require("../middleware");
const { Todo } = require("../models");
const { queryService } = require("../services");
const { logger } = require("../shared");

/**
  @desc   Fetch users
  @param  { page, limit }
  @method GET
  @route  /api/v1/todo/
  @access Private
  @role   Admin
*/
exports.getAllTodoHandler = asyncHandler(async (req, res, _) => {
  console.log("All");

  const query = { ...req.query };
  query.page = +query.page || 1;
  query.limit = +query.limit || 10;
  query.sort = "created_at";
  query.fields = "title,description,status,created_at,updated_at";
  const features = new queryService.APIFeatures(
    Todo.find({ created_by: req.user.id }),
    query || {}
  )
    .filter()
    .sort()
    .paginate()
    .limitFields();
  console.log(features.query);
  const users = await features.query;
  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetch Todo successfully!' `
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: "Fetch Todo Successfully!",
    data: users,
  });
});

/**
  @desc   Fetch user by id
  @param  { id }
  @method GET
  @route  /api/v1/todo/:id
  @access Private
  @role   Admin
*/
exports.getTodoByIdHandler = asyncHandler(async (req, res, _) => {
  console.log("ID");

  const user = await Todo.findOne({
    _id: req.params.id,
    created_by: req.user.id,
  });

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetch Todo successfully!' `
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: "Fetch Todo Successfully!",
    data: user,
  });
});
/**
  @desc   Signup user
  @param  { title, description }
  @method POST
  @route  /api/v1/todo/create
  @access Public
*/
exports.createTodoHandler = asyncHandler(async (req, res, _) => {
  console.log(req.user.id);

  //   const user = await Todo.findOne({ _id: req.params.id });

  //   if (!user) {
  //     throw new NotFoundException("User not found!");
  //   }
  const newTodo = new Todo({
    title: req.body.title,
    description: req.body.description,
    created_by: req.user.id, // Assign the user's ID to the post
    // other post properties
  });

  await newTodo.save();

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Todo Created successfully!' `
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: "Todo Created Successfully!",
  });
});

/**
  @desc   Update user by id
  @param  { id }
  @method PUT
  @route  /api/v1/users/:id
  @access Private
  @role   Admin
*/
exports.updateTodoHandler = asyncHandler(async (req, res, _) => {
  console.log("Update");

  const todo = await Todo.findOne({ _id: req.params.id });

  if (!todo) {
    throw new NotFoundException("Todo not found!");
  }
  if (req.body) {
    todo.title = req.body.title;
    todo.description = req.body.description;
  }
  await todo.save();

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Todo Updated successfully!' `
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: "Updated Todo Successfully!",
    data: todo,
  });
});

/**
  @desc   Update user by id
  @param  { id }
  @method PUT
  @route  /api/v1/todo/:id
  @access Private
  @role   Admin
*/
exports.changeStatusTodoHandler = asyncHandler(async (req, res, _) => {
  console.log("Update");

  const todo = await Todo.findOne({ _id: req.body._id });

  if (!todo) {
    throw new NotFoundException("Todo not found!");
  }
  if (req.body) {
    todo.status = req.body.status;
  }
  await todo.save();

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Todo Status Changed successfully!' `
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: "Todo Status Changed Successfully!",
    data: todo,
  });
});

/**
  @desc   Delete user by id
  @param  { id }
  @method DELETE
  @route  /api/v1/todo/:id
  @access Private
  @role   Admin
*/
exports.deleteTodoHandler = asyncHandler(async (req, res, _) => {
  console.log("Delete");
  const user = await Todo.findOne({ _id: req.params.id });

  if (!user) {
    throw new NotFoundException("Todo not found!");
  }

  await Todo.findOneAndDelete({ _id: req.params.id });

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'Fetch Todo successfully!' `
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: "Fetch Todo Successfully!",
    data: user,
  });
});
