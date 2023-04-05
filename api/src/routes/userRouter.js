const { Router } = require("express");
const userRouter = Router();

const {
  createUser,
  getUserById,
  putUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");
const {
  isUser,
  isUserOrAdmin,
  verifyToken,
} = require("../middlewares/authJwt");

// userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", [verifyToken, isUserOrAdmin], putUser);
userRouter.delete("/:id", deleteUser);
// userRouter.delete("/:id", [verifyToken, isUserOrAdmin], deleteUser);

module.exports = userRouter;
