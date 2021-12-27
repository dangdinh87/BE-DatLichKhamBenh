import bcrypt from "bcryptjs";
import db from '../models';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async password => {
  return bcrypt.hashSync(password, salt)
}

const createUser = async (data) => {
  const hashPassword = hashUserPassword(data.password)
  data.password = hashPassword;
  return db.User.create(data)
}

const getAllUser = async () => {
  return db.User.findAll({})
}

module.exports = {
  createUser,
  getAllUser
};  