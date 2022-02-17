import db from '../models';
import { generatorID } from '../utils/helpers';
const { Op } = require('sequelize');

const getAll = async (limit, skip, search, accountId) => {
  // const account = await db.Account.findOne({ where: { id: accountId } });
  // if (account.typeAccountId < 3) {
  return await db.Doctor.findAll({
    where: {
      status: 'ACTIVE',
      [Op.or]: [
        { fullName: { [Op.like]: '%' + search + '%' } },
        { clinicName: { [Op.like]: '%' + search + '%' } }
      ]
    },
    limit: limit,
    offset: skip, // số lượng phần tử bỏ qua
    order: [['createdAt', 'DESC']],
    include: [{ model: db.Specialist }, { model: db.Position }]
  });
};

const getAllFromAdmin = async (limit, skip, search, accountId) => {
  // const account = await db.Account.findOne({ where: { id: accountId } });
  // if (account.typeAccountId < 3) {
  return await db.Doctor.findAll({
    limit: limit,
    offset: skip, // số lượng phần tử bỏ qua
    order: [['createdAt', 'DESC']],
    where: {
      status: ['ACTIVE', 'PENDING', 'CANCEL']
    },
    include: [{ model: db.Specialist }, { model: db.Position }]
  });
};

const getById = async (id) => {
  return await db.Doctor.findOne({
    where: { id: id },
    include: [db.Position, db.Specialist]
  });
};

const getTop = async (n) => {
  return await db.Doctor.findAll({
    limit: parseInt(n),
    order: [['numberOfPatientsExamined', 'DESC']]
  });
};

const create = async (formData) => {
  formData.id = generatorID('DT');
  return db.Doctor.create(formData);
};

const update = async (formData, doctorId) => {
  const doctor = await db.Doctor.findOne({ where: { id: doctorId } });
  if (!doctor) return;
  Object.assign(doctor, formData);
  return await doctor.save();
};

module.exports = {
  getAll,
  getById,
  getTop,
  create,
  update,
  getAllFromAdmin
};
