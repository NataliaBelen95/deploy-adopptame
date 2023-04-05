const User = require("../models/User");
const Role = require("../models/Roles");
const authController = require("express").Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const Apa = require("../models/Apa");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;

const crypto = require("crypto");
// const { OAuth2Client } = require("google-auth-library");
// const CLIENT_ID = process.env.GOOGLE_ID_CLIENT;
// const CLIET_SECRET = process.env.CLIENT_SECRET;

require("dotenv").config();

const signUp = async (req, res) => {
  const { name, email, password, username, role } = req.body;

  // Buscar si el nombre de usuario ya existe
  const existingUser = await User.findOne({ username });

  // Si el nombre de usuario ya existe, devolver un error
  if (existingUser) {
    return res.status(409).json({ error: "username ya existe" });
  }

  // Buscar si el correo electrónico ya existe
  const existingEmail = await User.findOne({ email });

  // Si el correo electrónico ya existe, devolver un error
  if (existingEmail) {
    return res.status(409).json({ error: "email ya existe" });
  }

  // Si el nombre de usuario y correo electrónico no existen, crear un nuevo usuario y guardarlo en la base de datos
  const newUser = new User({
    username,
    name,
    email,
    password: await User.encryptPassword(password),
  });

  if (role) {
    const foundRole = await Role.find({ name: { $in: role } }); // de todos los que terngo guardado, se busca el role que me mande el user.
    newUser.role = foundRole.map((role) => role._id); // mapeo los roles // se guarda
  } else {
    //si no ingresa role, le mando el que le asigno por default
    const rol = await Role.findOne({ name: "user" }); // busco el rol asignado
    newUser.role = [rol._id]; //  le asigno el id del rol .
  }

  // Enviar correo electrónico de verificación
  await sendVerificationEmail(newUser.email, newUser.name);

  // Guardar usuario en la base de datos
  const savedUser = await newUser.save(); // save nuevo usuario
  console.log(savedUser);
  const token = jwt.sign({ id: savedUser._id }, config.SECRET);

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
    subject: "Verify your email",
    html: `<h1>Welcome to our platform, Appdoptame!</h1>
          <p>Please click on the following link to verify your email:</p>
          <a href="${process.env.BASE_URL}/verify-email?email=${email}">Verify email</a>`,
  };

  await transporter.sendMail(mailOptions);
};
//COMENTADAS POR QUE SE ESTAN USANDO EN EL ROUTER LOGIN
// const signIn = async (req, res) => {
//   const { email, password, userType } = req.body;

//   if (userType === "user") {
//     const userFound = await User.findOne({ email }).populate("role");
//     if (!userFound) {
//       return res.status(400).json({ message: "Usuario no encontrado" });
//     }

//     const matchedPassword = await User.comparePassword(
//       password,
//       userFound.password
//     );
//     if (!matchedPassword) {
//       return res
//         .status(401)
//         .json({ token: null, message: "contraseña invalida" });
//     }

//     const token = jwt.sign({ id: userFound._id }, config.SECRET, {
//       expiresIn: 86400, //24 hs
//     });

//     res.json({ token });
//   } else if (userType === "apa") {
//     const apaFound = await Apa.findOne({ email }).populate("role");
//     if (!apaFound) {
//       return res.status(400).json({ message: "Apa no encontrada" });
//     }

//     const matchedPassword = await Apa.comparePasswordApa(
//       password,
//       apaFound.password
//     );
//     if (!matchedPassword) {
//       return res
//         .status(401)
//         .json({ token: null, message: "contraseña invalida" });
//     }

//     const token = jwt.sign({ id: apaFound._id }, config.SECRET, {
//       expiresIn: 86400, //24 hs
//     });

//     res.json({ token });
//   } else {
//     return res.status(400).json({ message: "Tipo de usuario no válido" });
//   }
// };

// const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   console.log(
//     `Email del usuario que solicitó restablecer contraseña: ${email}`
//   );

//   const user = await User.findOne({ email });
//   console.log(`Usuario encontrado: ${user}`);

//   if (!user) {
//     console.log("Usuario no encontrado");
//     return res.status(404).json({ message: "Usuario no encontrado" });
//   }

//   // Generar una clave aleatoria para restablecer la contraseña y guardarla en la base de datos
//   const resetKey = crypto.randomBytes(6).toString("hex");
//   user.resetPasswordKey = resetKey;
//   user.resetPasswordExpires = Date.now() + 3600000; // La expiración es en 1 hora
//   await user.save();

//   // Enviar correo electrónico con las instrucciones para restablecer la contraseña
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_ADMIN,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_ADMIN,
//     to: email,
//     subject: "Restablecer contraseña",
//     html: `<h1>Restablecer contraseña</h1>
//           <p>Para restablecer su contraseña, use la siguiente clave:</p>
//           <p>${resetKey}</p>`,
//   };

//   await transporter.sendMail(mailOptions);

//   console.log("Correo electrónico enviado");
//   res.json({
//     message:
//       "Se ha enviado un correo electrónico con una clave de restablecimiento.",
//     resetKey: resetKey,
//   });
// };

// const resetPasswordWithEmail = async (req, res) => {
//   const { email, resetPasswordKey, password } = req.body;
//   console.log(
//     `Email del usuario que desea restablecer su contraseña: ${email}`
//   );
//   console.log(
//     `Clave de restablecimiento proporcionada por el usuario: ${resetPasswordKey}`
//   );

//   try {
//     // Buscar el usuario por el correo electrónico
//     const user = await User.findOne({ email });
//     console.log(user);
//     console.log(`Usuario encontrado: ${user}`);

//     if (!user || user.resetPasswordKey !== resetPasswordKey) {
//       console.log(user.resetPasswordKey, resetPasswordKey);
//       return res
//         .status(400)
//         .json({ message: "Clave de restablecimiento inválida o expirada" });
//     }

//     // Encriptar la nueva contraseña y guardarla en la base de datos
//     user.password = await User.encryptPassword(password);
//     console.log(user.password);
//     user.resetPasswordKey = undefined;
//     await user.save();

//     console.log("Contraseña actualizada");

//     res.json({ message: "La contraseña se ha restablecido correctamente." });
//   } catch (err) {
//     console.error(`Error al buscar usuario: ${err}`);
//     return res.status(500).json({ message: "Error al buscar usuario" });
//   }
// };

module.exports = {
  signUp,
};
