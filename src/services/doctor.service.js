import db from '../models';
import { generatorID } from '../utils/helpers';

const getAll = async (limit, skip, search) => {
  return db.Doctor.findAll({
    limit: limit,
    offset: skip, // số lượng phần tử bỏ qua
  });
};

const getById = async (id) => {
  return db.Doctor.findOne({
    where: { id: id },
    include: [db.Position, db.Specialist],
  });
};

const create = async (formData) => {
  formData.id = generatorID('DT');
  return db.Doctor.create(formData);
};

module.exports = {
  getAll,
  getById,
  create,
};
