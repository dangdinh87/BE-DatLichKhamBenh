import helpers from "../utils/helpers";
import { timeSlotService } from "../services";
import ApiError from "../utils/ApiError ";
import catchAsync from "../utils/catchAsync";

const getAll = catchAsync(async (req, res) => {
  const timeSlots = await timeSlotService.getAll();
  if (!timeSlots) {
    throw new ApiError(404, "timeSlots not found");
  }
  return res.send(timeSlots);
});

const create = catchAsync(async (req, res) => {
  const createTimeSlots = await timeSlotService.createBulk(req.body);
  console.log(createTimeSlots);
  if (!createTimeSlots) {
    throw new ApiError(404, "timeSlots not found");
  }
  return res.send(createTimeSlots);
});

module.exports = { getAll, create };
