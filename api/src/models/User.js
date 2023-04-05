const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
// const crypto = require("crypto");

const userSchema = new Schema(
  {
    name: { type: String },
    username: { type: String, required: true, unique: true },
    last_name: { type: String },
    password: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    location: { type: String },
    image: { type: String },
    resetPasswordKey: { type: String },
    resetPasswordExpires: { type: Date },
    googleId: { type: String, sparse: true, unique: true },
    suspended: { type: Boolean, default: false },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    role: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    versionKey: false,
    timestamp: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

// userSchema.statics.generateResetToken = async function () {
//   const token = crypto.randomBytes(20).toString("hex");
//   return token;
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
