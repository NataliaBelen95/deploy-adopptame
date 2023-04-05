const { Router } = require("express");
const routerAuth = Router();

const authController = require("../controllers/authController");

// routerAuth.post("/signIn", authController.signIn);
routerAuth.post("/signUp", authController.signUp);
// routerAuth.post("/forgotPassword", authController.forgotPassword);
// routerAuth.post("/resetPassword", authController.resetPasswordWithEmail);
routerAuth.get("/google");
module.exports = routerAuth;
