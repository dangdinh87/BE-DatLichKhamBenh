import db from "../models/index";
import catchAsync from "../utils/catchAsync";
const { userService } = require('../services');

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUser();
  if (!users) {
    // throw new ApiError(httpStatus.NOT_FOUND, 'users not found');
  }
  res.send(users);
});

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.send(user);
});

module.exports = { getUsers, createUser };
