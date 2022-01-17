import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError ';
const { authService, jwtService } = require('../services');

const register = catchAsync(async (req, res) => {
  const register = await authService.register(req.body);
  if (!register) {
    res.status(400).json({
      message: 'Đăng kí thất bại'
    });
  }
  res.status(200).json({
    message: 'Đăng kí thành công',
    data: register
  });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: 'Vui lòng nhập tài khoản và mật khẩu'
    });
  }

  const info = await authService.login(username, password);
  console.log(info);
  if (!info) {
    res.status(400).json({
      message: 'Tài khoản hoặc mật khẩu không đúng'
    });
  }

  const accessToken = await jwtService.signAccessToken(info.id);
  res.status(200).json({
    message: 'Đăng nhập thành công',
    token: accessToken,
    data: info
  });
});

const logout = catchAsync(async (req, res) => {
  console.log(req.payload.accountId);
  if (!req.payload.accountId)
    return res.json({
      message: 'Đăng Xuất'
    });
});

module.exports = {
  register,
  login,
  logout
};
