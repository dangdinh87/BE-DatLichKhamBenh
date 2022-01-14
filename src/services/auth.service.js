import bcrypt from "bcrypt";
const saltRounds = 10;
import { generatorID } from "../utils/helpers"
import db from "../models";


const register = async (formData) => {
  const hashPasswordAccount = await bcrypt.hash(formData.password, saltRounds);
  formData.id = generatorID('AC');
  formData.password = hashPasswordAccount;
  if (formData.typeAccountId == "2") formData.status = 0;
  if (formData.typeAccountId == "3") formData.status = 1;
  return db.Account.create(formData);
};


const login = async (username, password) => {

  const checkUsername = await db.Account.findOne({
    where: { username: username },
  })
  const checkPassword = await bcrypt.compare(password, checkUsername.dataValues.password)

  const accountDB = await db.Account.findOne({
    where: { username: username },
    attributes: { exclude: ['password'] },
    include: db.Doctor
  });

  if (!checkUsername || !checkPassword)
    return;
  return accountDB;
};

const logout = async (req, res) => {
  //
}

module.exports = {
  register,
  login,
};

// import bcrypt from "bcryptjs";
// const salt = bcrypt.genSaltSync(10);

// const hashPassword = async (password) => {
//   return bcrypt.hashSync(password, salt);
// };

// const register = async (formData) => {
//   const hashPasswordAccount = hashPassword(formData.password);
//   formData.password = hashPasswordAccount;
//   console.log(formData);
//   return db.User.create(data);
// };
