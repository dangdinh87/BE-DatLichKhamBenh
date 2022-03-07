import catchAsync from '../utils/catchAsync';
import ApiError from '../utils/ApiError ';
const { patientService } = require('../services');

const getAll = catchAsync(async (req, res) => {
  const patients = await patientService.getAll();
  if (!patients) {
    return res
      .status(400)
      .json({ message: 'Không tìm thấy danh sách bệnh nhân' });
  }
  return res.status(200).json({
    message: 'Tìm thấy danh sách bệnh nhân ',
    data: patients
  });
});

const getById = catchAsync(async (req, res) => {
  const patients = await patientService.getById(req.params.id);
  if (!patients) {
    return res.status(400).json({ message: 'Không tìm thấy bệnh nhân' });
  }
  return res.status(200).json({
    message: 'Tìm thấy bệnh nhân',
    data: patients
  });
});

const create = catchAsync(async (req, res) => {
  const createPatient = await patientService.create(req.body);
  if (!createPatient) {
    return res.status(400).json({ message: 'Thêm bệnh nhân thất bại' });
  }
  res.status(200).json({
    message: 'Thêm bệnh nhân thành công'
  });
});

const update = catchAsync(async (req, res) => {
  let image = req.files.image ? req.files.image[0].filename : null;
  console.log(image, req.body);
  const updatePatient = await patientService.update(
    req.params.id,
    req.body,
    image
  );

  if (!updatePatient) {
    return res.status(400).json({ message: 'Cập nhật bệnh nhân thất bại' });
  }
  res.status(200).json({
    message: 'Cập nhật bệnh nhân thành công',
    data: updatePatient
  });
});

const deletePatient = catchAsync(async (req, res) => {
  const deleteUser = await userService.deletePatient(req.params.id);
  res.json(deleteUser);
});

module.exports = {
  getAll,
  getById,
  create,
  deletePatient,
  update
};
