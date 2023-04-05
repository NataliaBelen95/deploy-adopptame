const { Router } = require("express");
const adoptPet = require("../controllers/adoptionInProcess");
const adoptProgressRouter = Router();

adoptProgressRouter.post("/pet", adoptPet);

module.exports = adoptProgressRouter;
