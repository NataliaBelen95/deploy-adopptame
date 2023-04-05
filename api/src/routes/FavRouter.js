const { Router } = require("express");

const favRouter = Router();
const {
  postFavorite,
  deleteFavorite,
  getFavorite,
} = require("../controllers/FavController");
favRouter.post("/", postFavorite);
favRouter.get("/:userId", getFavorite);
favRouter.delete("/", deleteFavorite);

module.exports = favRouter;
