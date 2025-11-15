const mongoose = require("mongoose");

const CibilSchema = new mongoose.Schema({
  full_name: String,
  pan_name: String,
  email_id: String,
  mobile: String,
  dob: String,
  city: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("CibilCheck", CibilSchema);
