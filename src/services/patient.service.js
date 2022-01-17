import db from '../models';
import { generatorID } from '../utils/helpers';

const getAll = async () => {
  return db.Patient.findAll({});
};

const getById = async (id) => {
  return db.Patient.findOne({
    where: { id: id },
  });
};

const create = async (formData) => {
  formData.id = generatorID('PT');
  console.log(formData);
  return db.Patient.create(formData);
};

const deletePatient = async (id) => {
  db.Patient.destroy({
    where: { id: id },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  deletePatient,
};
