import db from "../models";
import helpers from "../utils/helpers";

const getAll = async () => {
  return db.TimeSlot.findAll({});
};

const createBulk = async (formData, scheduleId) => {
  formData.map((item) => {
    item.id = helpers.generatorID("TL");
    item.scheduleId = scheduleId;
  });

  return db.TimeSlot.bulkCreate(formData);
};

module.exports = { getAll, createBulk };
