const express = require("express");
const { isStudent, isInstructor } = require("../Middlewares/Auth");
const  getAllSubmission  = require("../Controllers/Getters").getAllSubmission;
const auth = require("../Middlewares/Auth").auth;
const getAllInstructors = require("../Controllers/Getters").getAllInstructors;
const getAllStudents = require("../Controllers/Getters").getAllStudents;
const getsub = require("../Controllers/Getters").getsub;    
const getsub2= require("../Controllers/Getters").getsub2;  
const router = express.Router();


router.get("/getallinstructors", auth, isStudent,getAllInstructors);
router.get("/getallstudents", auth,isInstructor, getAllStudents);
router.post("/getsubmission", auth, isStudent,getsub);
router.post("/getsubmission2", auth, isInstructor,getsub2);
router.get('/getallsub',auth,isInstructor,getAllSubmission);


module.exports = router;



