const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userById = await User.findById(id);
    res.status(200).json(userById);
  } catch (error) {
    res.status(404).json(error);
  }
};

const putUser = async (req, res) => {
  const { id } = req.params;
  const { name, last_name, username, password, email, location, image, pet } =
    req.body;
  try {
    const userUpdate = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json("El usuario ha sido modificado correctamente");
  } catch (error) {
    res.status(400).json("El usuario no pudo ser modificado");
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.status(200).json("El usuario fue eliminado correctamente");
  } catch (error) {
    res.status(404).json("No se pudo eliminar al usuario");
  }
};

// const createUser = async (req, res) => {
//   const { name, last_name, username, password, email, location, image, pet } =
//     req.body;
//   try {
//     const newUser = await User.create(req.body);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

module.exports = { getUserById, putUser, getAllUsers, deleteUser };
