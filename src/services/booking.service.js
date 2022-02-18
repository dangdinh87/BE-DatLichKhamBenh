import db from '../models';
import { generatorID } from '../utils/helpers';
import emailService from '../services/email.service';
import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();

const getByPatientId = async (id, limit, skip) => {
  return await db.Booking.findAll({
    where: { patientId: id },
    include: [{ model: db.TimeSlot }],
    limit: limit,
    offset: skip // số lượng phần tử bỏ qua
  });
};

const getByDateBooking = async (id) => {
  return await db.Booking.findAll({
    where: { dateBooking: id }
  });
};

const getByDoctorId = async (doctorId) => {
  const data = await db.Schedule.findAll({
    where: { doctorId: doctorId },
    include: [
      {
        model: db.TimeSlot,
        include: [
          {
            model: db.Booking,
            order: [['createdAt', 'DESC']],
            include: [
              {
                model: db.TimeSlot,
                attributes: ['value']
              },
              {
                model: db.Patient
              }
            ],
            required: false
          }
        ]
      }
    ],
    nested: false
  });

  let result = [];
  data.map((item) =>
    item.TimeSlots.map((el) => el.Bookings.map((el) => result.push(el)))
  );

  return result;
};

const create = async (formData) => {
  // Kiểm tra MaxNumberTimeSlot == count(timeSlot)
  // const countTimeSlots = await db.Booking.count({
  //   where: { timeSlotId: formData.timeSlotId }
  // });

  const getTimeSlotById = await db.TimeSlot.findOne({
    where: { id: formData.timeSlotId },
    include: [{ model: db.Schedule }]
  });

  // const updateCurrentNumberTimeSlot = await getTimeSlotById.set({
  //   currentNumber: countTimeSlots
  // });
  // await updateCurrentNumberTimeSlot.save();

  const bookingByPatientId = await db.Booking.findOne({
    where: { timeSlotId: formData.timeSlotId, patientId: formData.patientId }
  });
  if (bookingByPatientId) {
    return 1;
  }

  if (!getTimeSlotById) return; // Không tìm thấy timeSlot

  if (
    getTimeSlotById.currentNumber == getTimeSlotById.Schedule.maxNumberTimeSlot
  )
    return 2; // Số lượng đã đầy

  //rand token
  const token = uuidv4();

  // Default value
  const idGenerator = generatorID('BK');
  formData.id = idGenerator;
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
    timeSlotId: formData.timeSlotId
  });

  // Gửi mail
  await emailService.sendSimpleMail({
    receiverEmail: formData.email,
    patientName: formData.patientName,
    doctorName: formData.doctorName,
    dateBooking: new Date(parseInt(formData.dateBooking)).toLocaleDateString(
      'en-US'
    ),
    time: formData.value,
    redirectLink: `${process.env.URL_REACT}/verify-booking?bookingId=${idGenerator}`
  });

  return booking;
};

const verifyBooking = async (formData) => {
  const check = await db.Booking.findOne({
    where: { id: formData.idBooking }
  });

  // Lịch khám ko tồn tại
  if (!check) return '0';

  // Get status in database by formData.token
  const statusInDb = check.status;

  // Đã được xác nhận
  if (statusInDb === 'BOOKED') return '1';

  // Xác thực thành công -> update status
  const updateStatus = await check.set({ status: 'BOOKED' });
  await updateStatus.save();
  return '2';
};

const updateStatus = async (id, newStatus) => {
  const booking = await db.Booking.findOne({ where: { id: id } });
  if (!booking) return;
  Object.assign(booking, { status: newStatus });
  return await booking.save();
};
const countBookingByDoctorId = async (doctorId) => {
  const schedules = await db.Schedule.findAll({
    where: { doctorId: doctorId },
    include: [
      {
        model: db.TimeSlot,
        include: db.Booking
      }
    ]
  });

  let bookings = [];
  for (let i = 0; i < schedules.length; i++) {
    for (let j = 0; j < schedules[i].TimeSlots.length; j++) {
      bookings.push(schedules[i].TimeSlots[j].Bookings);
    }
  }

  return bookings.flat(Infinity).filter((el) => el.status === 'CONFIRMED'); 
};

module.exports = {
  getByPatientId,
  getByDateBooking,
  getByDoctorId,
  create,
  verifyBooking,
  updateStatus,
  countBookingByDoctorId
};
