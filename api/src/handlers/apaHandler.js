const apaSchema = require("../models/Apa");
const {
  createApa,
  putApa,
  getApaById,
  getAllApas,
  getApasByName,
  deleteApaById,
} = require("../controllers/apaController");

// POST| /create
const createApaHandler = async (req, res) => {
  try {
    const {
      name,
      password,
      email,
      cbu_cvu,
      description,
      location,
      url,
      telephone,
      provincia,
      cuit,
    } = req.body;
    const newApa = await createApa(
      name,
      password,
      email,
      cbu_cvu,
      description,
      location,
      url,
      telephone,
      provincia,
      cuit
    );
    res.status(200).json(newApa);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// PUT| /edit/:id
const putApaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password, email, cbu_cvu, description, location, url, telephone, provincia, cuit, pets, reviews } =
      req.body;
    const modApa = await putApa(
      id,
      name,
      password,
      email,
      cbu_cvu,
      description,
      location,
      url,
      telephone,
      provincia,
      cuit,
      pets,
      reviews
    );
    res.status(200).json(modApa);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// GET BY ID| /:id
const getApaByIdHandler = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const apaById = await getApaById(id);
    if (!apaById) throw new Error("La APA que buscas no existe :(");
    res.status(200).json(apaById);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// GET ALL| /
const getAllApasHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name ? await getApasByName(name) : await getAllApas();
    if (!results) throw new Error("Aún no hay APAs cargadas :(");
    res.status(200).json(results);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// DELETE BY ID| /delete/:id
const deleteApaByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const apaById = await deleteApaById(id);
    if (!apaById) throw new Error("La APA que deseas eliminar no existe :(");
    res.status(200).json(apaById);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
  createApaHandler,
  putApaHandler,
  getApaByIdHandler,
  getAllApasHandler,
  deleteApaByIdHandler,
};
