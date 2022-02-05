import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError ';
const { doctorService } = require('../services');

const getAll = catchAsync(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = limit * (page - 1);
  const search = req.query.search || '';

  const accountId = req.payload.accountId;
  const doctors = await doctorService.getAll(limit, skip, search, accountId);

  if (!doctors) {
    return res.status(400).json({ message: 'Không tìm thấy danh sách bác sĩ' });
  }
  return res.status(200).json({
    message: 'Danh sách bác sĩ',
    data: doctors,
  });
});

const getById = catchAsync(async (req, res) => {
  const doctor = await doctorService.getById(req.params.id);
  if (!doctor) {
    return res.status(400).json({
      message: 'Không tìm thấy bác sĩ',
    });
  }
  return res.status(200).json({
    message: 'Tìm thấy bác sĩ',
    data: doctor,
  });
});

const getTop = catchAsync(async (req, res) => {
  const n = req.params.n == 0 ? 5 : req.params.n;
  const doctors = await doctorService.getTop(n);
  if (!doctors) {
    return res.status(400).json({
      message: 'Không tìm thấy bác sĩ',
    });
  }
  return res.status(200).json({
    message: 'Danh sách bác sĩ',
    data: doctors,
  });
});

const create = catchAsync(async (req, res) => {
  const createDoctor = await doctorService.create(req.body);
  if (!createDoctor) {
    return res.status(400).json({
      message: 'Thêm bác sĩ thất bại',
    });
  }
  return res.status(200).json({
    message: 'Thêm bác sĩ thành công',
  });
});

const update = catchAsync(async (req, res) => {
  const files = req.files;
  let objFiles = {};
  for (const key in files) {
    if (key && files[key] && files[key][0]) {
      objFiles[key] = files[key][0].filename;
    }
  }

  const result = { ...objFiles, ...req.body };

  const updateDoctor = await doctorService.update(result, req.params.id);
  if (!updateDoctor) {
    return res.status(400).json({
      message: 'Cập nhật thất bại',
    });
  }
  return res.status(200).json({
    message: 'Cập nhật thành công',
    data: updateDoctor,
  });
});

module.exports = {
  getAll,
  getById,
  getTop,
  create,
  getById,
  update,
};
