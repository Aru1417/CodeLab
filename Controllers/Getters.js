const Instructor = require("../Models/Instructor");
const Student = require("../Models/Student");
const Submission = require("../Models/Submission");
const mongoose = require("mongoose");

exports.getAllInstructors = async (req, res) => {
  try {
    const userName1 = req.user.userName;
    console.log(userName1);
    const student = await Student.findById(req.user.id);
    console.log(student);
    const instructors = await Instructor.find({ students: student._id });
    const instructors1 = instructors.map((instructor) => {
      return { name: instructor.userName, id: instructor._id };
    });
    // console.log(instructors);

    res.status(200).json({
      success: true,
      data: instructors1,
      message: "Instructors Fetched Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Instructors can't be fetched",
    });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const userName1 = req.user.userName;
    const allData = await Instructor.findById(req.user.id).populate("students");
    const studentUsernames = allData.students.map((student) => {
      return { stdname: student.userName, stdid: student._id };
    });
    res.status(200).json({
      success: true,
      data: studentUsernames,
      message: "students Fetched Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "students can't be fetched",
    });
  }
};
exports.getsub = async (req, res) => {
  try {
  
    let {qid} = req.body;
    
    qid = new mongoose.Types.ObjectId(qid);
   
   
    const allData = await Student.findById({_id:req.user.id})
      .populate("submissions")
      .exec();


    if(allData.submissions.length == 0){
      return res.status(200).json({
        success: false,
        message: "no submission",
      });
    }
    let flag = false;
    console.log(allData.submissions[0].question);
    
    for (let i = 0; i < allData.submissions.length; i++) {
      
      if (allData.submissions[i].question.equals(qid)) {
        console.log("inside if");
         let sub = await Submission.findById({
          _id: allData.submissions[i]._id,
        });
        res.status(200).json({
          success: true,
          data: sub,
          message: "Submission Fetched Successfully",
        });
        flag = true;
        break;
      }
      else{
        continue;
      }

      
    }
    if(flag == false){
     
    res.status(200).json({
      success: false,
      message: "no submission",
    });
  }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "submission can't be fetched",
      error: error.message,
    });
  }
};
exports.getsub2 = async (req, res) => {
  try {
  
    let {qid,stdid,submissionid} = req.body;
    
    qid = new mongoose.Types.ObjectId(qid);
   
   
    const allData = await Submission.findById({_id:submissionid})
     


    // if(allData.submissions.length == 0){
    //   return res.status(200).json({
    //     success: false,
    //     message: "no submission",
    //   });
    // }
    // let flag = false;
    // console.log(allData.submissions[0].question);
    
    // for (let i = 0; i < allData.submissions.length; i++) {
      
    //   if (allData.submissions[i].question.equals(qid)) {
    //     console.log("inside if");
    //      let sub = await Submission.findById({
    //       _id: allData.submissions[i]._id,
    //     });
    //     res.status(200).json({
    //       success: true,
    //       data: sub,
    //       message: "Submission Fetched Successfully",
    //     });
    //     flag = true;
    //     break;
    //   }
    //   else{
    //     continue;
    //   }

      
    // }
    // if(flag == false){
     
    res.status(200).json({
      success: true,
      data:allData,
      message: " submission",
    });
  // }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "submission can't be fetched",
      error: error.message,
    });
  }
};




exports.getAllSubmission = async (req, res) => {
  try {
    let Data = [];
    let Data2=[];
    const userName1 = req.user.userName;
    let stdid = req.query.stdid.id;
    let insid = req.user.id;
    // console.log(insid)
    const id = new mongoose.Types.ObjectId(stdid);
    const ins = new mongoose.Types.ObjectId(insid);
    
    const student = await Student.find({_id:id}).populate("submissions").exec();
    
    const submission = student[0].submissions;
    
    // console.log("starts here")
   
    
    for(let i= 0; i<submission.length;i++ ){
       Data[i]= await Submission.find({_id:  submission[i]._id}).populate("question").exec();
      
    }

    console.log(ins)
    const instructorSubmissions = Data.filter(submission => {
      // console.log("User ID:", submission[0].question.instructor.toString() );
    
      return submission[0].question.instructor.equals(ins);
    });
    // console.log(instructorSubmissions)

    
  //   let j=0;
  //   for(let i= 0; i<Data.length;i++ ){
  //    if(Data[i].question.instructor.equals()){
  //     Data2[j] = Data[i];
  //    }
      
  //  }
    // console.log(Data2)
    
    // await submission.populate("question").exec();
  
    // const studentUsernames = allData.students.map((student) => {
    //   return { stdname: student.userName, stdid: student._id };
    // });
    res.status(200).json({
      success: true,
      data: instructorSubmissions,
      message: "students Fetched Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "students can't be fetched",
      error:error.message
    });
  }
};