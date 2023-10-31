
const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
    {
     
      userName: {
        type: String,
        required: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      
      accountType: {
        type: String,
        required: true,
      },
    }
      
  )

  module.exports = mongoose.model("admin",adminSchema);