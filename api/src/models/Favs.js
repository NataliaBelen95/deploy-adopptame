const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pet: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
  },
  { timestamps: true }
);

const Favorites = mongoose.model("Favorites", favoriteSchema);

module.exports = Favorites;
