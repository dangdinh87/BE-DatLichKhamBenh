import db from '../models';
import { generatorID } from '../utils/helpers';

const getAll = async () => {
  return db.Patient.findAll({});
};

const getById = async (id) => {
  return db.Patient.findOne({
    where: { id: id }
  });
};

const create = async (formData) => {
  formData.id = generatorID('PT');
  return db.Patient.create(formData);
};

const update = async (patientId, formData, image) => {
  if (image === null || image === 'null') {
    delete formData.image;
  } else {
    formData.image = image;
  }
  const patient = await db.Patient.findOne({ where: { id: patientId } });
  if (!patient) return;
  Object.assign(patient, formData);
  return await patient.save();
};

const deletePatient = async (id) => {
  db.Patient.destroy({
    where: { id: id }
  });
};

module.exports = {
  getAll,
  getById,
  create,
  deletePatient,
  update
};
