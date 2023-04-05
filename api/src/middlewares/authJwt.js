const jwt = require("jsonwebtoken");
const config = require("../../config");
const User = require("../models/User");
const Apa = require("../models/Apa");
const Admin = require("../models/Admin.js");
const Role = require("../models/Roles");

//VERIFICACION EN GENERAL//
const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." }); //

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    const user = await User.findById(req.userId, { password: 0 });
    //console.log(user);
    if (user) {
      req.userRole = "user";
      next();
    } else {
      const admin = await Admin.findById(req.userId, { password: 0 });
      //console.log(admin);
      if (admin) {
        req.userRole = "admin";
        next();
      } else {
        const apa = await Apa.findById(req.userId);
        if (apa) {
          req.userRole = "apa";
          next();
        } else {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
      }
    }
  } catch (e) {
    return res.status(401).json({ message: "No autorizado" });
  }
};

//solo si quiero que lo haga la Apa

const isApa = async (req, res, next) => {
  if (req.userRole === "apa") {
    return next();
  } else {
    return res.status(403).json({ message: "requiere rol de apa" });
  }
};

//solo si quiero que lo haga el Admin

const isAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.userId);
    console.log(admin);
    if (!admin) {
      return res.status(404).json({ message: "requiere rol de admin" });
    }
    const role = await Role.find({ _id: { $in: admin.role } });

    console.log(admin);
    console.log(role);

    // Continuar con la siguiente función si el admin tiene el rol de "admin"
    for (let i = 0; i < role.length; i++) {
      if (role[i].name === "admin") return next();
    }

    return res.status(403).json({ message: "requiere rol de admin" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//solo si quiero que lo haga el Usuario

const isUser = async (req, res, next) => {
  if (req.userRole === "user") {
    return next();
  } else {
    return res.status(403).json({ message: "requiere rol de usuario" });
  }
};

//apa y admin juntos por que por separado , solo toma la primera

const isApaOrAdmin = async (req, res, next) => {
  if (req.userRole === "apa" || req.userRole === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "require rol de apa o admin" });
  }
};

const isUserOrAdmin = async (req, res, next) => {
  if (req.userRole === "user" || req.userRole === "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "require rol de usuario o admin" });
  }
};

module.exports = {
  isApa,
  isAdmin,
  isUser,
  verifyToken,
  isApaOrAdmin,
  isUserOrAdmin,
};
