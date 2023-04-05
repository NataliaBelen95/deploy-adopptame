const nodemailer = require('nodemailer');
const Apa = require('../models/Apa');
const User = require('../models/User');
require("dotenv").config();

const sendDonationNotification = async (donationData) => {
  try {
      const { apaId, userId, amount } = donationData;
      const apa = await Apa.findById(apaId);
      const user = await User.findById(userId);
    console.log(user)
      // Enviar notificación a la APA:
      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.EMAIL_ADMIN,
              pass: process.env.EMAIL_PASSWORD
          },
          secure: true,
          pool: true,
          maxConnections: 5,
          maxMessages: 100,
          rateLimit: true,
          rateDelta: 1000,
          rateLimitInterval: 300000,
      });

      const mailOptions = {
          from: process.env.EMAIL_ADMIN,
          to: apa.email,
          subject: "Ha recibido una nueva donación",
          text: `Hola ${apa.name},\n\nTe informamos que has recibido una nueva donación de ${user.email} de ${amount/100}$. \n\n¡Gracias por tu enorme trabajo apoyando animalitos que lo necesitan!\n\nAtentamente,\nEl equipo de AppDoptame`,
      };

      await transporter.sendMail(mailOptions);

      // Enviar notificación al usuario donante
      const userMessage = {
          from: process.env.EMAIL_ADMIN,
          to: user.email,
          subject: "Ha realizado una donación",
          text: `Hola, gracias por tu donación a ${apa.name}. \n\nTu compromiso hace posible la labor de quienes apoyan a estos animalitos indefensos.\n\nAtentamente,\nEl equipo de AppDoptame`,
      };

      await transporter.sendMail(userMessage);

      console.log('El correo fue enviado exitosamente');

  } catch(error) {
      console.error(error);
      throw new Error ("No se pudo enviar la notificación por correo electrónico");
  }
}

const postDonation = async (req, res) => {
  try {
      const donationData = req.body;

      const apa = await Apa.findById(donationData.apaId);
      if (!apa) {
          return res.status(404).json({ message: "APA not found" });
      }

      const user = await User.findById(donationData.userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Guardar la donación en la base de datos
      // ...

      // Enviar la notificación por correo electrónico
      await sendDonationNotification(donationData);

      res.status(201).json({ message: "Donation saved" });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  };
}

module.exports = { sendDonationNotification, postDonation };