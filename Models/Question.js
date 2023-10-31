const mongoose = require("mongoose")

const qSchema = mongoose.Schema(
    {
     
      question: {
        type: String,
        required: true,
      },
    
      instructor:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "instructor",
        },
      
      
     }
   
  )

  module.exports = mongoose.model("question",qSchema);