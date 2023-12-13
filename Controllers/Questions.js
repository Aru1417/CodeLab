const Question = require("../Models/Question");
const Instructor = require("../Models/Instructor");
const Admin = require("../Models/Admin");
const Assignment = require("../Models/Assignment");
const Submission = require("../Models/Submission");
const Student = require("../Models/Student");
const mongoose = require("mongoose");

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


exports.addAssignment = async (req, res) => {
  try {
   
    const userId = req.user.id;

   
    let {
      assignmentname,lastdate
    } = req.body;
   
  
    if (!assignmentname || !lastdate) {
      return res.status(200).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }
   
   
    const instructorDetails = await Instructor.findById(req.user.id);
    console.log(instructorDetails)

    if (!instructorDetails) {
      return res.status(200).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }
   const instid =instructorDetails._id;
  
    const assignment = await Assignment.create({
     name:assignmentname,
     instructor: instructorDetails._id,
      lastDate:lastdate
    });

   
   let newAsg= await Instructor.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          assignments: assignment._id,
        },
      },
      { new: true }
    );
   
    
    res.status(200).json({
      success: true,
      data: newAsg,
      message: "Assignment Created Successfully",
    });
  } catch (error) {
   
    console.error(error);
    res.status(200).json({
      success: false,
      message: "Failed to create Assignment",
      error: error.message,
    });
  }
}



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



  exports.getAllAssignment = async (req, res) => {
    try {
      const{InsId} = req.body;
      const AllAssignment = await Instructor.find({ InsId } ).populate("assignments").exec();
      
      const result = AllAssignment[0].assignments;
     
      return res.status(200).json({
        success: true,
        data: result,
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



  exports.getAssignment = async (req, res) => {
    try {
      const{asgId} = req.body;
      const AllAssignment = await Assignment.find({asgId}) 
      
      const result = AllAssignment[0];
     
      return res.status(200).json({
        success: true,
        data: result,
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


  exports.submitAsg= async (req, res) => {
    try {
      const{language,content,questionId} = req.body;
      const student = await Student.findById(req.user.id).populate("submissions").exec();
      
     let flag = false;
      let qid =new mongoose.Types.ObjectId(questionId)
      let submission;
      for(let i =0; i<student.submissions.length;i++){

        if(student.submissions[i].question.equals(qid)) {
          submission= await Submission.findByIdAndUpdate(
            {
              _id: student.submissions[i]._id,
            },
            
               {
                code:content,
               language:language,
                Date:Date.now()
              },
            
            { new: true }
          )
         flag = true;
         console.log("first case")
          break;
        }
        else{
          continue;
        }
      }

     

      

      if(flag == false){
         submission = await Submission.create(
          {
            question:new mongoose.Types.ObjectId(questionId),
            user:new mongoose.Types.ObjectId(req.user.id),
            code:content,
            language:language,
            Date:Date.now()
          }) 
          console.log(submission)
        
        await Student.findByIdAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(req.user.id),
          },
          {
            $push: {
              submissions: submission._id,
            },
          },
          { new: true }
        );
        }
        

      return res.status(200).json({
        success: true,
        data: submission,
        message:"Assignment Submitted Successfully"
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