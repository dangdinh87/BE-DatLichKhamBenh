import db from '../models';

const getAll = async () => {
  return db.Schedule.findAll({
    include: [{ model: db.TimeSlot }],
  });
};

const getById = async (id) => {
  return db.Schedule.findOne({
    where: { id: id },
    include: [{ model: db.TimeSlot }],
  });
};

const getOne = async ({ workingDay, doctorId }) => {
  return await db.Schedule.findOne({
    where: { workingDay, doctorId },
    include: [{ model: db.TimeSlot }],
  });
};

const create = async (formData) => {
  return await db.Schedule.create(formData);
};

const update = async (scheduleId, formData) => {
  console.log(formData.arrSchedule);
  for (let i = 0; i < formData.arrSchedule.length; i++) {
    const timeSlot = await db.TimeSlot.findOne({
      where: { id: formData.arrSchedule[i].id },
    });
    timeSlot.status = true ? false : true;
    await timeSlot.save();
  }
  return;
};

module.exports = { getAll, getById, getOne, create, update };
