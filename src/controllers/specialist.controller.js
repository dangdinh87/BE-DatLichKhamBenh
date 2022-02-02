import { specialistService } from '../services';
import ApiError from '../utils/ApiError ';
import catchAsync from '../utils/catchAsync';

const getAll = catchAsync(async (req, res) => {
  const specialist = await specialistService.getAll();
  if (!specialist) {
    return res.status(400).json({
      message: 'Không Tìm Thấy'
    });
  }
  return res.status(200).json({
    message: 'Danh sách vị trí ',
    data: specialist
  });
});

module.exports = { getAll };
