import db from "../models";
import {
  generatorID
} from '../utils/helpers'

const getAll = async () => {
  return db.Doctor.findAll({});
};

const create = async (formData) => {
  formData.id = generatorID("DT");
  console.log(formData);
  return db.Doctor.create(formData);
};


module.exports = {
  getAll,
  create,
};