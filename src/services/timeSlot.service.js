import db from "../models";
import helpers from "../utils/helpers";

const getAll = async () => {
  return db.TimeSlot.findAll({});
};

const createBulk = async (formData, scheduleId) => {
  formData.arrSchedule.map((item) => {
    item.id = helpers.generatorID("TL");
    item.scheduleId = scheduleId;
  });
  formData.status = 1; // 

  console.log("form Data", formData)

  return db.TimeSlot.bulkCreate(formData.arrSchedule);
};

module.exports = { getAll, createBulk };

// Thieu 1 truong dockerId, form dua vao thieu ne
// alo, de dua vp
//Dang mac dinh la BS-01 nghe 