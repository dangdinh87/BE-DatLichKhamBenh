import db from '../models';
import { generatorID } from '../utils/helpers';

const getAll = async () => {
  return db.Doctor.findAll({
    include: [db.Position, db.Specialist]
});
};

const getById = async (id) => {
  return db.Doctor.findOne({});
};

const create = async (formData) => {
  formData.id = generatorID('DT');
  return db.Doctor.create(formData);
};

module.exports = {
  getAll,
  create,
  getById
};
