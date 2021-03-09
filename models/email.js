const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  recepient: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  }
});

const emailModel = mongoose.model("email", emailSchema);

module.exports = emailModel;
