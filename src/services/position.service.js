import db from '../models';

const getAll = async () => {
  return db.Position.findAll({});
};

module.exports = { getAll };
