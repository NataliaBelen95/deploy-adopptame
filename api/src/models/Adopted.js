const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adoptedtSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pet: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Adopted = mongoose.model("AdoptionRequest", adoptedtSchema);

module.exports = Adopted;
