const mongoose = require("mongoose")

const subSchema = mongoose.Schema(
    {
     
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
      },
      file: {
        type: Buffer ,
        required: true,
      },
      
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
      },
    
     
      
     }
   
  )

  module.exports = mongoose.model("submission",subSchema);