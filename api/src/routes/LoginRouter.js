const { Router } = require("express");
const routerLogin = Router();

const ctrlLogin = require("../controllers/LoginController");

routerLogin.post("/login", ctrlLogin.Login);
routerLogin.post("/loginGoogle", ctrlLogin.LoginWithGoogle);
routerLogin.post("/forgotPassword", ctrlLogin.forgotPassword);
routerLogin.post("/resetPassword", ctrlLogin.resetPasswordWithEmail);

module.exports = routerLogin;
