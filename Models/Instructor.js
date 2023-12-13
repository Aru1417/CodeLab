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
      assignments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "assignment",
        },
      ]
     }
   
  ))

  module.exports = mongoose.model("instructor",instructorSchema);