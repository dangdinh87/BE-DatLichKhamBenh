import { scheduleService } from '../services';
import { timeSlotService } from '../services';
import ApiError from '../utils/ApiError ';
import catchAsync from '../utils/catchAsync';
import { generatorID } from '../utils/helpers';

const getAll = catchAsync(async (req, res) => {
  const schedules = await scheduleService.getAll();
  if (!schedules) {
    return res
      .status(400)
      .json({ message: 'Không tìm thấy danh sách lịch khám' });
  }
  return res
    .status(200)
    .json({ message: 'Danh sách lịch khám', data: schedules });
});

const getById = catchAsync(async (req, res) => {
  const schedule = await scheduleService.getById(req.params.id);
  if (!schedule) {
    return res.status(400).json({ message: 'Không tìm thấy lịch khám' });
  }
  return res.status(200).json({ message: 'Tìm thấy lịch khám' });
});

const getOne = catchAsync(async (req, res) => {
  const schedule = await scheduleService.getOne(req.body);
  if (!schedule) {
    return res.status(400).json({ message: 'Không tìm thấy lịch khám' });
  }
  return res.status(200).json({ message: 'Tìm thấy lịch khám' });
});

const create = catchAsync(async (req, res) => {
  console.log(req.body);
  const formData = req.body;
  formData.id = generatorID('SD');

  const createTimeSlot = await timeSlotService.createBulk(
    formData,
    formData.id
  );
  if (!createTimeSlot) {
    return res.status(400).json({ message: 'Thêm khung giờ thất bại' });
  }

  const createSchedule = await scheduleService.create(formData);
  if (!createSchedule) {
    return res.status(400).json({ message: 'Thêm lịch khám thất bại' });
  }

  return res.status(200).json({
    message: 'Thêm lịch khám thành công',
  });
});

const update = catchAsync(async (req, res) => {
  const scheduleId = req.params.id;
  const formData = req.body;
  const updateSchedule = await scheduleService.update(scheduleId, formData);
});

module.exports = { getAll, getById, getOne, create, update };
