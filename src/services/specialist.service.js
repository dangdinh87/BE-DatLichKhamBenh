import db from '../models';

const getAll = async () => {
  return db.Specialist.findAll({});
};

module.exports = { getAll };
