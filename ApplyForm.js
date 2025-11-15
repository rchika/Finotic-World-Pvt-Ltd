

const mongoose = require("mongoose");

const ApplyFormSchema = new mongoose.Schema({
  fullname: String,
  mobile: String,
  email: String,
  loanType: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ApplyForm", ApplyFormSchema);


