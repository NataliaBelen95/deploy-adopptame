const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Role = require("../models/Roles");
const config = require("../../config");

require("dotenv").config();

const createAdmins = async () => {
  try {
    const count = await Admin.estimatedDocumentCount();
    if (count > 0) return; // Si ya hay roles, no se hace nada
    const roles = await Role.find();

    const adminRole = roles.find((role) => role.name === "admin");

    const admins = [
      {
        email: process.env.EMAIL_NATI,
        password: process.env.EMAIL_NATI_PASSWORD,
        role: [adminRole._id],
      },
    ];
    const promises = admins.map((admin) => new Admin(admin).save());

    const createdAdmins = await Promise.all(promises);
    const tokens = createdAdmins.map((admin) =>
      jwt.sign({ id: admin._id }, config.SECRET)
    );

    createdAdmins.forEach((admin, index) => {
      admin.token = tokens[index];
    });

    console.log(tokens);
    console.log(createdAdmins);
  } catch (error) {
    console.log(error);
  }
};

module.exports = createAdmins;
