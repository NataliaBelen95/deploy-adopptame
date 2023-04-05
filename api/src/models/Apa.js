const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const apaSchema = new Schema(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String },
    email: { type: String, required: true },
    cbu_cvu: { type: String },
    description: { type: String },
    location: { type: String },
    url: { type: String },
    telephone: { type: Number },
    provincia: { type: String },
    cuit: { type: Number },
    suspended: { type: Boolean, default: false },
    resetPasswordKey: { type: String },
    resetPasswordExpires: { type: Date },
    pets: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    role: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
    reviews: [{
      opinion: String,
      rating: String,
      user: String
    }],
  },
  {
    timestamps: true,
  }
);

apaSchema.statics.encryptPasswordApa = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

apaSchema.statics.comparePasswordApa = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};
const Apa = mongoose.model("Apa", apaSchema);

module.exports = Apa;
