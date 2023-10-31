const mongoose = require('mongoose');

const instructorSchema = mongoose.Schema((
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
    
      students: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "student",
        },
      ],
      assingments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "question",
        },
      ]
     }
   
  ))

  module.exports = mongoose.model("instructor",instructorSchema);