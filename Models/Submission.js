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
      },
      language :{
        type: String,
        required: true,
      },
      subDate: {
        type: Date,
        default: Date.now,
    }
     
      
     }
   
  )

  module.exports = mongoose.model("submission",subSchema);