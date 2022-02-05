import db from '../models';
import { generatorID } from '../utils/helpers';
import emailService from '../services/email.service';
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();

const getByPatientId = async (id, limit, skip) => {
  return await db.Booking.findAll({
    where: { patientId: id },
    limit: limit,
    offset: skip, // số lượng phần tử bỏ qua
  });
};

const getByDateBooking = async (id) => {
  return await db.Booking.findAll({
    where: { dateBooking: id },
  });
};

const getByDoctorId = async (doctorId) => {
  return await db.Booking.findAll({
    include: [
      {
        model: db.TimeSlot,
        include: [
          {
            model: db.Schedule,
            where: { doctorId: doctorId },
          },
        ],
      },
    ],
    order: [['createdAt', 'DESC']],
  });
};

const create = async (formData) => {
  // Kiểm tra MaxNumberTimeSlot == count(timeSlot)
  const countTimeSlots = await db.Booking.count({
    where: { timeSlotId: formData.timeSlotId },
  });

  const getTimeSlotById = await db.TimeSlot.findOne({
    where: { id: formData.timeSlotId },
    include: [{ model: db.Schedule }],
  });

  const updateCurrentNumberTimeSlot = await getTimeSlotById.set({
    currentNumber: countTimeSlots,
  });
  await updateCurrentNumberTimeSlot.save();

  if (!getTimeSlotById) return; // Không tìm thấy timeSlot

  if (
    getTimeSlotById.currentNumber == getTimeSlotById.Schedule.maxNumberTimeSlot
  )
    return; // Số lượng đã đầy

  //rand token
  const token = uuidv4();

  // Default value
  formData.id = generatorID('BK');
  formData.status = 'UNCONFIRMED';

  // Update currentNumber in table TimeSlot
  getTimeSlotById.set({ currentNumber: getTimeSlotById.currentNumber + 1 });
  await getTimeSlotById.save();

  // Create Booking
  const booking = await db.Booking.create({
    id: formData.id,
    status: formData.status,
    dateBooking: formData.dateBooking,
    reasonExamination: formData.reasonExamination,
    patientId: formData.patientId,
    timeSlotId: formData.timeSlotId,
  });

  // Gửi mail
  await emailService.sendSimpleMail({
    receiverEmail: formData.email,
    patientName: formData.patientName,
    doctorName: formData.doctorName,
    time: formData.value,
    redirectLink: `${process.env.URL_REACT}/booking/verify-booking?bookingId=${formData.id}`,
  });

  return booking;
};

const verifyBooking = async (formData) => {
  const check = await db.Booking.findOne({
    where: { id: formData.bookingId },
  });

  // Lịch khám ko tồn tại
  if (!check) return '0';

  // Get status in database by formData.token
  const statusInDb = check.status;

  // Đã được xác nhận
  if (statusInDb === 'CONFIRMED') return '1';

  // Xác thực thành công -> update status
  const updateStatus = await check.set({ status: 'CONFIRMED' });
  await updateStatus.save();
  return '2';
};

module.exports = {
  getByPatientId,
  getByDateBooking,
  getByDoctorId,
  create,
  verifyBooking,
};
