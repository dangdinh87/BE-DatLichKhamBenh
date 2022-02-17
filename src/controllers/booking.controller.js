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
      message: 'Không tìm thấy danh sách đặt khám'
    });
  }
  return res.status(200).json({
    message: 'Danh sách đặt khám',
    data: booking
  });
});

// Doctor
const getByDateBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.getByDateBooking(req.params.dateBooking);
  if (!booking || booking.length < 1) {
    return res.status(400).json({
      message: 'Không tìm thấy danh sách đặt khám'
    });
  }
  return res.status(200).json({
    message: 'Danh sách đặt khám',
    data: booking
  });
});

//Doctor
const getByDoctorId = catchAsync(async (req, res) => {
  const booking = await bookingService.getByDoctorId(req.params.id);
  if (!booking || booking.length < 1) {
    return res.status(400).json({
      message: 'Không tìm thấy danh sách đặt khám'
    });
  }
  return res.status(200).json({
    message: 'Danh sách đặt khám',
    result: booking.length,
    data: booking
  });
});

// Patient
const create = catchAsync(async (req, res) => {
  const formData = req.body;
  if (formData.email == null) {
    res.status(400).json({
      message: 'Không có email!'
    });

    return res.status(400).json({
      message: 'Đăng kí thất bại, tên đăng nhập đã tồn tại'
    });
  }
  const createBooking = await bookingService.create(formData);
  if (!createBooking) {
    res.status(400).json({
      message: 'Đặt lịch khám thất bại, số lượng đã đầy'
    });
  }
  return res.status(200).json({
    message: 'Đặt lịch khám thành công',
    data: createBooking
  });
});

const verifyBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.verifyBooking(req.body);
  if (booking === '0') {
    return res
      .status(400)
      .json({ message: 'Lịch khám không tồn tại ', status: 0 });
  }
  if (booking === '1') {
    return res
      .status(400)
      .json({ message: 'Lịch khám đã được xác nhận ', status: 1 });
  }
  if (booking === '2') {
    return res
      .status(200)
      .json({ message: 'Xác nhận đặt lịch thành công ', status: 2 });
  }
});

const updateStatus = catchAsync(async (req, res) => {
  console.log(req.body.params);
  const id = req.params?.id;
  const newStatus = req.body?.params;
  const update = await bookingService.updateStatus(id, newStatus);
  if (!update) {
    return res.status(400).json({
      message: 'Cập nhật thất bại'
    });
  }
  return res.status(200).json({
    message: 'Cập nhật thành công'
  });
});

module.exports = {
  getByPatientId,
  getByDateBooking,
  getByDoctorId,
  create,
  verifyBooking,
  updateStatus
};
