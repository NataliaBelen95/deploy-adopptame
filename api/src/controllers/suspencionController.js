const Apa = require("../models/Apa");
const User = require("../models/User");

const suspendUserOrApa = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  // Buscar usuario y APA por ID
  const user = await User.findById(id);
  const apa = await Apa.findById(id);

  if (!user && !apa) {
    return res.status(404).json({ error: "ID no encontrado" });
  }

  // Si el usuario o APA ya están suspendidos, quitar la suspensión y guardar los cambios
  if (user && user.suspended) {
    user.suspended = false;
    await user.save();
    return res
      .status(200)
      .json({ message: "suspensión eliminada exitosamente" });
  } else if (apa && apa.suspended) {
    apa.suspended = false;
    await apa.save();
    return res
      .status(200)
      .json({ message: "suspensión eliminada exitosamente" });
  }

  // Establecer la propiedad "suspended" en true para el usuario o APA que existe
  if (user) {
    user.suspended = true;
    await user.save();
  } else if (apa) {
    apa.suspended = true;
    await apa.save();
  }

  // Devolver una respuesta exitosa
  return res.status(200).json({ message: "suspendido exitosamente" });
};

module.exports = suspendUserOrApa;
