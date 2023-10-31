const mongoose = require('mongoose');

const studentSchema = mongoose.Schema((
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
    
     
      submissions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "submission",
        },
      ],
     }
  ))

  module.exports = mongoose.model("student",studentSchema);