import db from "../models";
import { generatorID } from "../utils/helpers";

const getAll = async () => {
  return db.TimeSlot.findAll({});
};

const createBulk = async (formData, scheduleId) => {
  formData.arrSchedule.map((item) => {
    item.id = generatorID("TL");
    item.scheduleId = scheduleId;
  });
  formData.status = 1;
  return db.TimeSlot.bulkCreate(formData.arrSchedule);
};

module.exports = { getAll, createBulk };
