const { Router } = require("express");
const apaRouter = Router();
const {
  createApaHandler,
  putApaHandler,
  getApaByIdHandler,
  getAllApasHandler,
  deleteApaByIdHandler,
} = require("../handlers/apaHandler");
const authApaRouter = require("../controllers/authApa");
const { verifyToken, isApaOrAdmin } = require("../middlewares/authJwt");
//jwt
apaRouter.post("/auth", authApaRouter.signUpApa);
// signUp Apa ruta http://lcoalhost:3001/apa/auth

////////////

apaRouter.put("/:id", putApaHandler);

apaRouter.get("/:id", getApaByIdHandler);

apaRouter.get("/", getAllApasHandler); // Diego: Nuevo

apaRouter.delete("/:id", deleteApaByIdHandler); // Diego: Nuevo

module.exports = apaRouter;
