const User = require("../models/User");
const LoginController = require("express").Router();
const jwt = require("jsonwebtoken");
const config = require("../../config");
const Apa = require("../models/Apa");
const Admin = require("../models/Admin");
const { OAuth2Client } = require("google-auth-library");
const Role = require("../models/Roles");
const crypto = require("crypto");
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);
const nodemailer = require("nodemailer");

const Login = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({ email }).populate("role");
  const apaFound = await Apa.findOne({ email }).populate("role");
  const adminFound = await Admin.findOne({ email }).populate("role");

  if (!userFound && !apaFound && !adminFound) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  let matchedPassword;
  let userId;
  let userType;

  if (userFound) {
    matchedPassword = await User.comparePassword(password, userFound.password);
    if (matchedPassword) {
      userId = userFound._id;
      userType = "user";
      const token = jwt.sign({ id: userId }, config.SECRET);
      res.json({ token, userType, userFound });
    }
  }

  if (apaFound && !matchedPassword) {
    matchedPassword = await Apa.comparePasswordApa(password, apaFound.password);
    if (matchedPassword) {
      userId = apaFound._id;
      userType = "apa";
      const token = jwt.sign({ id: userId }, config.SECRET);
      res.json({ token, userType, apaFound });
    }
  }

  if (adminFound && !matchedPassword) {
    matchedPassword = password === adminFound.password;
    if (matchedPassword) {
      userId = adminFound._id;
      userType = "admin";
      const token = jwt.sign({ id: userId }, config.SECRET);
      res.json({ token, userType, adminFound });
    }
  }

  if (!matchedPassword) {
    return res
      .status(401)
      .json({ token: null, message: "contraseña invalida" });
  }
};
const LoginWithGoogle = async (req, res) => {
  const { tokenId, role } = req.body;
  console.log(tokenId);

  let userType = "user"; // Asignar "user" como valor por defecto

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userId = payload["sub"];
    // console.log(userId);

    const userName = payload["name"];
    // console.log(userName);

    const userEmail = payload["email"];
    // console.log(userEmail);

    // Buscar en la base de datos si ya existe un usuario con el id de Google
    let userFound = await User.findOne({ email: userEmail }).populate("role");
    // Si el usuario no existe, crear un nuevo documento en la colección de usuarios
    if (!userFound) {
      let username;
      if (userName) {
        const randomString = Math.random().toString(36).substring(2, 8);
        username = userName.replace(/\s+/g, "") + randomString;
      } else {
        const randomString = Math.random().toString(36).substring(2, 8);
        username = "user" + randomString;
      }

      // Crear un nuevo documento de usuario
      const newUser = new User({
        username: username,
        email: userEmail,
        googleId: userId,
      });

      if (role) {
        const foundRole = await Role.find({ name: { $in: role } }); // de todos los que tengo guardado, se busca el role que me mande el usuario.
        newUser.role = foundRole.map((role) => role._id); // mapeo los roles // se guarda
      } else {
        //si no ingresa role, le mando el que le asigno por default
        const rol = await Role.findOne({ name: "user" }); // busco el rol asignado
        newUser.role = [rol._id]; //  le asigno el id del rol .
      }
      try {
        userFound = await newUser.save();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Error al crear un nuevo usuario" });
      }
    }

    const token = jwt.sign({ id: userFound._id }, config.SECRET);
    // console.log(userFound, "type" + userType);
    // Devolver el token como respuesta, junto con userFound y userType
    res.status(200).json({ token, userFound, userType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al autenticar con Google" });
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(
    `Email del usuario que solicitó restablecer contraseña: ${email}`
  );

  const user = await User.findOne({ email });
  console.log(`Usuario encontrado: ${user}`);
  const apa = await Apa.findOne({ email });
  console.log(`Apa encontrado: ${apa}`);
  let resetKey = crypto.randomBytes(6).toString("hex");
  if (!user && !apa) {
    console.log("no encontrado");
    return res.status(404).json({ message: "email no encontrado" });
  }
  if (user) {
    resetKey = crypto.randomBytes(6).toString("hex");
    user.resetPasswordKey = resetKey;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save(); // La expiración es en 1 hora
  }

  if (apa) {
    resetKey = crypto.randomBytes(6).toString("hex");
    apa.resetPasswordKey = resetKey;
    apa.resetPasswordExpires = Date.now() + 3600000;
    await apa.save();
  }

  // Enviar correo electrónico con las instrucciones para restablecer la contraseña
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
    subject: "Restablecer contraseña",
    html: `<h1>Restablecer contraseña</h1>
          <p>Para restablecer su contraseña, use la siguiente clave:</p>
          <p>${resetKey}</p>`,
  };

  await transporter.sendMail(mailOptions);

  console.log("Correo electrónico enviado");
  res.json({
    message:
      "Se ha enviado un correo electrónico con una clave de restablecimiento.",
    resetKey: resetKey,
  });
};

const resetPasswordWithEmail = async (req, res) => {
  const { email, resetPasswordKey, password } = req.body;
  console.log(
    `Email del usuario que desea restablecer su contraseña: ${email}`
  );
  console.log(
    `Clave de restablecimiento proporcionada por el usuario: ${resetPasswordKey}`
  );

  try {
    const [user, apa] = await Promise.all([
      User.findOne({ email }),
      Apa.findOne({ email }),
    ]);

    if (!user && !apa) {
      return res.status(400).json({ message: "Usuario o APA no encontrado" });
    }

    if (user && user.resetPasswordKey !== resetPasswordKey) {
      return res
        .status(400)
        .json({ message: "Clave de restablecimiento inválida o expirada" });
    }

    if (apa && apa.resetPasswordKey !== resetPasswordKey) {
      console.log(apa, apa.resetPasswordKey);
      return res
        .status(400)
        .json({ message: "Clave de restablecimiento inválida o expirada" });
    }

    if (user) {
      user.password = await User.encryptPassword(password);
      user.resetPasswordKey = undefined;
      await user.save();
    } else if (apa) {
      apa.password = await Apa.encryptPasswordApa(password);
      apa.resetPasswordKey = undefined;
      await apa.save();
    }

    res.json({ message: "La contraseña se ha restablecido correctamente." });
  } catch (err) {
    console.error(`Error al buscar : ${err}`);
    return res.status(500).json({ message: "no se encuentra" });
  }
};
module.exports = {
  Login,
  LoginWithGoogle,
  forgotPassword,
  resetPasswordWithEmail,
};
