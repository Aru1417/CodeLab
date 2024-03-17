const mongoose = require("mongoose");

const adminLogSchma = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  exam: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  time: {
    required: true,
  },
});

module.exports = mongoose.model("adminlogs", adminLogSchma);
