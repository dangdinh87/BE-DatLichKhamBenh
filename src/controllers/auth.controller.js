import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/ApiError ";
const { authService } = require("../services");

const register = catchAsync(async (req, res) => {
  const register = await authService.register(req.body);
  if (!register) {
    throw new ApiError(httpStatus.NOT_FOUND, "register not found");
  }
  res.send(register);
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(401, "Vui lòng nhập username và password");
  }

  const checkAccount = await authService.login(username, password);

  if (!checkAccount) {
    throw new ApiError(401, "Tài khoản hoặc mật khẩu không tồn tại");
  }
  res.send("Login thành công");
});

const resetPassword = catchAsync(async (req, res) => {
  const { user, password } = req.body;

  console.log(user, password);
  // if (!users) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'users not found');
  // }
  // res.send(users);
});

module.exports = { register, login };
