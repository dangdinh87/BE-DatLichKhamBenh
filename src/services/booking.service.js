import db from '../models';
import { generatorID } from '../utils/helpers';

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

const create = async (formData) => {
  const checkTimeSlot = await db.TimeSlot.findOne({
    where: { id: formData.timeSlotId },
    include: [{ model: db.Schedule }],
  });
  if (!checkTimeSlot) return;

  // return { count:..., row[...] }
  const getBookingsByTimeSlotId = await db.Booking.findAndCountAll({
    where: { timeSlotId: checkTimeSlot.id },
  });

  // so sánh ( số lượng đặt khám và maxNumberTimeSlot trong table Schedule trong database theo timeSlotId )
  const countBookings = getBookingsByTimeSlotId.count;
  const maxNumberTimeSlot = checkTimeSlot.Schedule.maxNumberTimeSlot;
  if (countBookings >= maxNumberTimeSlot) return;

  formData.id = generatorID('BK');
  formData.status = 'BOOKED';
  return db.Booking.create(formData);
};

module.exports = {
  getByPatientId,
  getByDateBooking,
  create,
};
