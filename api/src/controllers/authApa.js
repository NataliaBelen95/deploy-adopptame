const Apa = require("../models/Apa");
const Role = require("../models/Roles");
const authApa = require("express").Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const crypto = require("crypto");

require("dotenv").config();

const signUpApa = async (req, res) => {
  const { name, email, password, provincia, telephone, role } = req.body;

  // // Buscar si el nombre de usuario ya existe
  const existingApa = await Apa.findOne({ name });

  // // Si el nombre de usuario ya existe, devolver un error
  if (existingApa) {
    return res.status(409).json({ error: "el nombre ya existe" });
  }

  // Buscar si el correo electrónico ya existe
  const existingEmail = await Apa.findOne({ email });

  // Si el correo electrónico ya existe, devolver un error
  if (existingEmail) {
    return res.status(409).json({ error: "Email already exists" });
  }

  // Si el nombre de usuario y correo electrónico no existen, crear un nuevo usuario y guardarlo en la base de datos
  const newApa = new Apa({
    name,
    email,
    provincia,
    telephone,
    password: await Apa.encryptPasswordApa(password),
  });

  if (role) {
    const foundRole = await Role.find({ name: { $in: role } }); // de todos los que terngo guardado, se busca el role que me mande el user.
    newApa.role = foundRole.map((role) => role._id); // mapeo los roles // se guarda
  } else {
    //si no ingresa role, le mando el que le asigno por default
    const rol = await Role.findOne({ name: "apa" }); // busco el rol asignado
    newApa.role = [rol._id]; //  le asigno el id del rol .
  }

  // Enviar correo electrónico de verificación
  await sendVerificationEmail(newApa.email, newApa.name);

  // Guardar usuario en la base de datos
  const savedApa = await newApa.save(); // save nuevo usuario
  console.log(savedApa);
  const token = jwt.sign({ id: savedApa._id }, config.SECRET);

  res.status(201).json({ token });
};

const sendVerificationEmail = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADMIN,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADMIN,
    to: email,
    subject: "Bienvenido",
    html: `<h1>Bienvenido a Appdoptame!</h1>
          <p>Gracias por formar parte de nuestra app.</p>`,
    // <a href="${process.env.BASE_URL}/verify-email?email=${email}">Verify email</a>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  signUpApa,
};
