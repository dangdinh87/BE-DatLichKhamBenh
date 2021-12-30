import db from "../models/index";
import catchAsync from "../utils/catchAsync";
const { userService } = require("../services");

const getAllPatients = catchAsync(async (req, res) => {
  const patients = await userService.getAllPatients();
  if (!patients) {
    throw new ApiError(httpStatus.NOT_FOUND, "users not found");
  }
  return res.send(patients);
});

const createPatient = catchAsync(async (req, res) => {
  const createPatient = await userService.createPatient(req.body);
  res.send(createPatient);
});

const deletePatient = catchAsync(async (req, res) => {
  const deleteUser = await userService.deletePatient(req.params.id);
  res.json(deleteUser);
});

module.exports = { getAllPatients, createPatient, deletePatient };
