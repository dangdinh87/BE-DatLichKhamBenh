import db from "../models/index";

let getHomePage = async (req, res) => {
  //* Không cần đường dẫn chính xác vì đã khai báo ở file viewEngine.js
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about");
};

module.exports = { getHomePage, getAboutPage };
