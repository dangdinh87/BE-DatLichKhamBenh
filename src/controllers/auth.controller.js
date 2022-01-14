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

  if (!info) {
    throw new ApiError(401, "Username hoặc Password không đúng");
  }

  const accountIdByInfo = info.dataValues.id
  const accessToken = await jwtService.signAccessToken(accountIdByInfo)
  res.status(200).json({
    message: 'Login thành công',
    token: accessToken,
    data: info
  });
});

const logout = catchAsync(async (req, res) => {
  console.log(req.payload.accountId);
  if (!req.payload.accountId)
    return res.json({ message: 'Logout success' })
})


module.exports = { register, login, logout };
