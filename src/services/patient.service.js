import bcrypt from "bcryptjs";
import res from "express/lib/response";
import db from "../models";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (password) => {
  return bcrypt.hashSync(password, salt);
};

const getAllPatients = async () => {
  return db.Patient.findAll({});
};

const createPatient = async (data) => {
  // const hashPassword = hashUserPassword(data.password);
  // data.password = hashPassword;

  const count = await db.Patient.count();
  const id = generatorID("BN");

  console.log(`count patient: ${count}`);
  console.log(`id generator: ${id}`);
  data.patientId = id;

  return db.Patient.create(data);
};

const deletePatient = async (id) => {
  db.Patient.destroy({
    where: { id: id },
  });
};

function generatorID(key) {
  const ran = Math.floor(Math.random() * 99999999) + 10000000;
  return `${key}-${ran}`;
}

module.exports = {
  getAllPatients,
  createPatient,
  deletePatient,
};
