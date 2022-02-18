import db, { sequelize } from '../models';
import { generatorID } from '../utils/helpers';

const getAll = async (limit, skip, search, specialistId, positionId) => {
  let query = {};

  if (search) {
    query = {
      [Op.or]: [
        { fullName: { [Op.like]: '%' + search + '%' } },
        { clinicName: { [Op.like]: '%' + search + '%' } }
      ]
    };
  }

  if (specialistId) query.specialistId = specialistId;
  if (positionId) query.positionId = positionId;
  query.status = 'ACTIVE';

  const countDoctor = await db.Doctor.count({ where: query });
  const doctors = await db.Doctor.findAll({
    where: query,
    limit: limit,
    offset: skip, // số lượng phần tử bỏ qua
    order: [['createdAt', 'DESC']],
    include: [{ model: db.Specialist }, { model: db.Position }]
  });
  return { data: doctors, count: countDoctor };
};

const getCount = async () => {
  return await db.Doctor.columnCount({
    status: 'ACTIVE'
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
    include: [db.Position, db.Specialist],
  });
};

const getTop = async (n) => {
  console.log(n);
  return await db.Doctor.findAll({
    limit: parseInt(n),
    order: [['numberOfPatientsExamined', 'DESC']],
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
  getCount,
  getById,
  getTop,
  create,
  update,
};
