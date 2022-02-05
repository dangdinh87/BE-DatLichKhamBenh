import db from '../models';
import { generatorID } from '../utils/helpers';
const { Op } = require('sequelize');

const getAll = async (limit, skip, search, accountId) => {
  // const account = await db.Account.findOne({ where: { id: accountId } });
  // if (account.typeAccountId < 3) {
  return await db.Doctor.findAll({
    limit: limit,
    offset: skip, // số lượng phần tử bỏ qua
    order: [['createdAt', 'DESC']],
    where: {
      [Op.or]: [
        { fullName: { [Op.like]: '%' + search + '%' }},
        { clinicName: { [Op.like]: '%' + search + '%' }}
      ]
    }
  });
  // } else {
  //   if (search === '') {
  //     return await db.Doctor.findAll({
  //       limit: limit,
  //       offset: skip, // số lượng phần tử bỏ qua
  //       order: [['createdAt', 'DESC']],
  //     });
  //   } else {
  //     return db.Doctor.findAll({
  //       limit: limit,
  //       offset: skip, // số lượng phần tử bỏ qua
  //       order: [['createdAt', 'DESC']],
  //       where: {
  //         [Op.or]: [
  //           { fullName: { [Op.like]: '%' + search + '%' } },
  //           { clinicName: { [Op.like]: '%' + search + '%' } },
  //         ],
  //       },
  //     });
  //   }
  // }
};

const getById = async (id) => {
  return await db.Doctor.findOne({
    where: { id: id },
    include: [db.Position, db.Specialist]
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
  create,
  update
};
