const Adopted = require("../models/Adopted");
const nodemailer = require("nodemailer");
const Pet = require("../models/Pet");
const User = require("../models/User");
require("dotenv").config();
const Apa = require("../models/Apa");

const sendAdoptEmail = async (user, pet) => {
  try {
    const petList = `${pet.name}, ${pet.age}, ${pet.size}, ${pet.image}, ${pet.description}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true, // Usa SSL
      pool: true, // Permite la reutilización de conexiones
      maxConnections: 5, // Limita el número máximo de conexiones simultáneas
      maxMessages: 100, // Limita el número máximo de mensajes enviados por conexión
      rateLimit: true, // Habilita la limitación de velocidad
      rateDelta: 1000, // Tiempo mínimo (en milisegundos) entre envíos
      rateLimitInterval: 300000, // Intervalo de tiempo (en milisegundos) para restablecer la tasa
    });

    const messageToApa = {
      from: process.env.EMAIL_ADMIN,
      to: pet.apa.email,
      subject: "Solicitud de adopción recibida",
      text: `Se ha recibido una solicitud de adopción para:\n\n${petList},\nde parte de ${user.username} (${user.email} ).`,
    };
    console.log(user);

    const messageToUser = {
      from: process.env.EMAIL_ADMIN,
      to: user.email,
      subject: "Solicitud de adopción recibida",
      text: `Tu solicitud de adopción para:\n\n${petList},\nha sido recibida y está siendo evaluada. Te notificaremos en cuanto tengamos una respuesta. 
      Por favor no olvide comunicarse al ${pet.apa.telephone} en caso de arrepentise.
      Muchas Gracias `,
    };
    console.log("email mandado al usuario" + user.email);

    await transporter.sendMail(messageToApa);
    await transporter.sendMail(messageToUser);
  } catch (error) {
    console.error(error);
    throw new Error(
      "No se pudo enviar el correo electrónico de solicitud de adopción"
    );
  }
};

const adopPet = async (req, res) => {
  const { petId, userId } = req.body;

  try {
    const pet = await Pet.findById(petId).populate("apa");

    const user = await User.findById(userId);

    if (!pet) {
      return res.status(404).json({ message: "No se encontró la mascota" });
    }

    const existingRequest = await Adopted.findOne({
      pet: petId,
      user: userId,
    });
    console.log("existingrequest" + existingRequest);
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Ya has solicitado la adopción de esta mascota" });
    }

    const newRequest = new Adopted({ pet: petId, user: userId });
    await newRequest.save();

    await sendAdoptEmail(user, pet);

    res.status(200).json({
      message:
        "Se te ha enviado un mail con los pasos a seguir para la adopción",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al procesar la solicitud de adopción" });
  }
};

module.exports = adopPet;
