const mongoose = require("mongoose")

const qSchema = mongoose.Schema(
    {
     
      question: {
        type: String,
        required: true,
      },
    
      assignment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "assignment",
      },
      
      
      
     }
   
  )

  module.exports = mongoose.model("question",qSchema);