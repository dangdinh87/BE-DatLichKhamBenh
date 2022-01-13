import { scheduleService } from '../services';
import { timeSlotService } from '../services';
import ApiError from '../utils/ApiError ';
import catchAsync from '../utils/catchAsync';
import helpers from '../utils/helpers';

const getAll = catchAsync(async (req, res) => {
  const schedules = await scheduleService.getAll();
  if (!schedules) {
    throw new ApiError(404, 'users not found');
  }
  return res.send(schedules);
});

const getById = catchAsync(async (req, res) => {
  const schedule = await scheduleService.getById(req.params.id);
  if (!schedule) {
    throw new ApiError(404, 'users not found');
  }
  return res.send(schedule);
});

const getOne = catchAsync(async (req, res) => {
  const schedule = await scheduleService.getOne(req.body);
  if (!schedule) {
    throw new ApiError(404, 'users not found');
  }
  return res.status(200).json({
    message: 'Get success',
    data: schedule
  });
});

const create = catchAsync(async (req, res) => {
  console.log(req.body);
  const formData = req.body;
  formData.id = helpers.generatorID('SD');

  await timeSlotService.createBulk(formData, formData.id);
  const createSchedule = await scheduleService.create(formData);

  if (!createSchedule) {
    throw new ApiError(404, 'users not found');
  }
  return res.send(createSchedule);
});

const update = catchAsync(async (req, res) => {
  const scheduleId = req.params.id;
  const formData = req.body;
  const updateSchedule = await scheduleService.update(scheduleId, formData);
});

module.exports = { getAll, getById, getOne, create, update };
