import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/ApiError ";
const { authService, jwtService } = require("../services");


const register = catchAsync(async (req, res) => {
  const register = await authService.register(req.body);
  if (!register) {
    throw new ApiError(httpStatus.NOT_FOUND, "register not found");
  }
  res.status(200).json({ message: 'register success' });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(401, "Vui lòng nhập username và password");
  }

  const info = await authService.login(username, password);
  console.log(info);
  if (!info) {
    throw new ApiError(401, "Username hoặc Password không đúng");
  }

  const accessToken = await jwtService.signAccessToken()
  res.status(200).json({
    message: 'Login thành công',
    token: accessToken,
    data: info
  });
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
