const { Router } = require("express");
const Pet = require('../models/Pet');
const petId = Pet.id; 

const adoptRouter = Router();
const {
    sendAdoptionNotification,
} = require("../controllers/adoptionController");

adoptRouter.post("/detail/:petId", sendAdoptionNotification);


module.exports = adoptRouter;