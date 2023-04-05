const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

const Role = mongoose.model("Role", roleSchema);
// Role.insertMany(roles); // Insert roles into the database

module.exports = Role;
