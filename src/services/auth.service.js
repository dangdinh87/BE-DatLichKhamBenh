import bcrypt from "bcrypt";
const saltRounds = 10;
import db from "../models";

const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const register = async (formData) => {
  const hashPasswordAccount = await hashPassword(formData.password);
  formData.password = hashPasswordAccount;

  if (formData.typeAccountId == "2") formData.status = 0;
  if (formData.typeAccountId == "3") formData.status = 1;

  return db.Account.create(formData);
};

const login = async (inputUsername, inputPassword) => {
  const accountDB = await db.Account.findOne({
    where: { username: inputUsername },
  });

  console.log(`username: ${inputUsername}, password: ${inputPassword}`);

  return await bcrypt.compare(inputPassword, accountDB.password);
};

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
