const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  mobile: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Contact", ContactSchema);
