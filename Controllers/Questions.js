const Question = require("../Models/Question");
const Instructor = require("../Models/Instructor");
const Admin = require("../Models/Admin");

exports.addQuestion = async (req, res) => {
  try {
   
    const userId = req.user.id;

   
    let {
     question
    } = req.body;
   
  
    if (!question) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }
   
   
    const instructorDetails = await Instructor.findById(req.user.id);
    console.log(instructorDetails)

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }
   const instid =instructorDetails._id;
  
    const newQuestion = await Question.create({
     question,
     instructor: instructorDetails._id
    });

   
    await Instructor.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
            assingments: newQuestion._id,
        },
      },
      { new: true }
    );
   
    
    res.status(200).json({
      success: true,
      data: newQuestion,
      message: "Question Created Successfully",
    });
  } catch (error) {
   
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create question",
      error: error.message,
    });
  }
};






exports.getAllQuestions = async (req, res) => {
    try {
      const AllQuestions = await Question.find(
        {  },
        
      )
        .populate("instructor")
        .exec()
  
      return res.status(200).json({
        success: true,
        data: AllQuestions,
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: `Can't Fetch Course Data`,
        error: error.message,
      })
    }
  }
