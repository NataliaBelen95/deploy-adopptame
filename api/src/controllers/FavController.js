const favoritesRouter = require("express").Router();
const Favorites = require("../models/Favs");
const Pet = require("../models/Pet");
const User = require("../models/User");
const nodemailer = require("nodemailer");
require("dotenv").config();

const postFavorite = async (req, res) => {
  try {
    const { userId, petId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Diego: Agrego esta verificación para saber si la mascota no se encuentra ya en favoritos.
    if (user.favorites.includes(petId)) {
      return res
        .status(400)
        .json({ message: "La mascota ya se encuentra en favoritos" });
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    user.favorites.push(petId);

    await user.save();

    // llamada a la función sendFavoritesEmail
    // await sendFavoritesEmail(user);

    // respuesta exitosa
    res.status(201).json({ message: "Mascota agregada a favoritos" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "No se puede agregar la mascota a favoritos" });
  }
};

// const sendFavoritesEmail = async (user) => {
//   try {
//     const petIds = user.favorites;
//     const pets = await Pet.find({ _id: { $in: petIds } });

//     const petList = pets
//       .map(
//         (pet) =>
//           `${pet.name}, ${pet.age}, ${pet.size}, ${pet.image}, ${pet.description}`
//       )
//       .join("\n");

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_ADMIN,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_ADMIN,
//       to: user.email,
//       subject: "Tus mascotas favoritas",
//       text: `Estas son tus mascotas favoritas de AppDoptame: \n\n${petList}`,
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error(error);
//     throw new Error("No se pudo enviar el email de mascotas favoritas");
//   }
// };

const deleteFavorite = async (req, res) => {
  try {
    const { userId, petId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (!user.favorites.includes(petId)) {
      return res
        .status(400)
        .json({ message: "La mascota no se encuentra en favoritos" });
    }

    user.favorites.pull(petId); // Eliminar petId del arreglo favorites de User
    await user.save();

    res.status(200).json({ message: "Mascota eliminada de favoritos" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "No se puede eliminar la mascota de favoritos" });
  }
};

const getFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const favorites = user.favorites.map((petId) => ({
      user: user._id,
      pet: petId,
    }));
    if (!favorites || favorites.length === 0) {
      return res.status(404).json({ message: "No se encontraron favoritos" });
    }
    res.status(200).json({ favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "No se pudo obtener favoritos" });
  }
};

module.exports = {
  postFavorite,
  deleteFavorite,
  getFavorite,
};
