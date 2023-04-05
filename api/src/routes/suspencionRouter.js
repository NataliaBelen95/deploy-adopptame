const { Router } = require("express");
const suspRouter = Router();
const suspendUserOrApa = require("../controllers/suspencionController");

suspRouter.put("/suspended/:id", suspendUserOrApa);

module.exports = suspRouter;
