import db from '../models/index';
import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError ';
const { userService } = require('../services');

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(401, 'Vui lòng nhập username và password');
  }

  const account = await db.Account.findOne({
    where: { username: username },
    attributes: { exclude: ['password'] },
    include: [{ model: db.Patient }],
    nest: true
  });

  if (!account) {
    throw new ApiError(401, 'Tài khoản hoặc mật khẩu không tồn tại');
  }
  res.send(account);
});

const register = catchAsync(async (req, res) => {
  const { user, password } = req.body;

  console.log(user, password);
  // if (!users) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'users not found');
  // }
  // res.send(users);
});

const resetPassword = catchAsync(async (req, res) => {
  const { user, password } = req.body;

  console.log(user, password);
  // if (!users) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'users not found');
  // }
  // res.send(users);
});

module.exports = { login, register, resetPassword };
