import catchAsync from "../utils/catchAsync";
import ApiError from "../utils/ApiError ";
const {
  patientService
} = require("../services");

const getAll = catchAsync(async (req, res) => {
  const patients = await patientService.getAll();
  if (!patients) {
    throw new ApiError(404, "Get patients fail");
  }
  return res.status(200).json({
    message: 'Get patients success',
    data: patients
  });
});

const create = catchAsync(async (req, res) => {
  const createPatient = await patientService.create(req.body);
  if (!createPatient) {
    throw new ApiError(404, "Create patient fail");
  }
  res.status(200).json({
    message: "Create patient success",
  });
});

const deletePatient = catchAsync(async (req, res) => {
  const deleteUser = await userService.deletePatient(req.params.id);
  res.json(deleteUser);
});

module.exports = {
  getAll,
  create,
  deletePatient
};