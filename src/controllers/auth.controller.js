import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError ';
const { authService, jwtService } = require('../services');

const register = catchAsync(async (req, res) => {
  const register = await authService.register(req.body);
  if (!register) {
    res.status(400).json({
      message: 'Đăng kí thất bại',
    });
  }
  res.status(200).json({
    message: 'Đăng kí thành công',
  });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(401, 'Vui lòng nhập username và password');
  }

  const info = await authService.login(username, password);
  if (!info) {
    throw new ApiError(401, 'Tài khoản hoặc mật khẩu không đúng');
  }

  const accessToken = await jwtService.signAccessToken(info.id);
  res.status(200).json({
    message: 'Login thành công',
    token: accessToken,
    data: info,
  });
});

const logout = catchAsync(async (req, res) => {
  console.log(req.payload.accountId);
  if (!req.payload.accountId)
    return res.json({
      message: 'Logout success',
    });
});

module.exports = {
  register,
  login,
  logout,
};
