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

const getOne = async (formData) => {
  return await db.Schedule.findOne({
    where: { workingDay: formData.workingDay, doctorId: formData.doctorId },
    include: [{ model: db.TimeSlot }],
  });
};

const create = async (formData) => {
  return await db.Schedule.create(formData);
};

const update = async (scheduleId, formData) => {
  // const scheduleDB = await db.Schedule.findOne({
  //   where: { id: scheduleId },
  //   include: db.TimeSlot,
  // });
  console.log(update);
};

module.exports = { getAll, getById, getOne, create, update };
