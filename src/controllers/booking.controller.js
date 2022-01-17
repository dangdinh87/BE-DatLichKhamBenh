import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError ';
const { bookingService } = require('../services');
import db from '../models';

// Patient
const getByPatientId = catchAsync(async (req, res) => {
  const patientId = req.params.patientId;
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = limit * (page - 1);
  const search = req.query.search;

  const booking = await bookingService.getByPatientId(patientId, limit, skip);

  if (!booking || booking.length < 1) {
    return res.status(400).json({
      message: 'Không tìm thấy danh sách đặt khám',
    });
  }
  return res.status(200).json({
    message: 'Danh sách đặt khám',
    data: booking,
  });
});

// Doctor
const getByDateBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.getByDateBooking(req.params.dateBooking);
  if (!booking || booking.length < 1) {
    return res.status(400).json({
      message: 'Không tìm thấy danh sách đặt khám',
    });
  }
  return res.status(200).json({
    message: 'Danh sách đặt khám',
    data: booking,
  });
});

// Patient
const create = catchAsync(async (req, res) => {
  const createBooking = await bookingService.create(req.body);
  if (!createBooking) {
    return res.status(400).json({
      message: 'Đặt lịch khám thất bại, số lượng đã đầy',
    });
  }
  return res.status(200).json({
    message: 'Đặt lịch khám thành công',
  });
});

module.exports = {
  getByPatientId,
  getByDateBooking,
  create,
};
