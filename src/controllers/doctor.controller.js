import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/ApiError ";
const {
  doctorService
} = require("../services");

const getAll = catchAsync(async (req, res) => {
  const doctors = await doctorService.getAll();
  if (!doctors) {
    throw new ApiError(404, "Get doctors fail");
  }
  return res.status(200).json({
    message: 'Get doctors success',
    data: doctors
  });
});

const create = catchAsync(async (req, res) => {
  const createDoctor = await doctorService.create(req.body);
  if (!createDoctor) {
    throw new ApiError(404, "Create doctor fail");
  }
  res.status(200).json({
    message: "Create doctor success"
  });
});
module.exports = {
  getAll,
  create,
};