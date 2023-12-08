const mongoose = require("mongoose")

const subSchema = mongoose.Schema(
    {
     
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
      },
    
      
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
      },
    
      code:{
        type: String,
        required: true,
      }
     
      
     }
   
  )

  module.exports = mongoose.model("submission",subSchema);