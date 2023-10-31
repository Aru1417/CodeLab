const express = require("express");
const { isStudent, isInstructor } = require("../Middlewares/Auth");
const auth = require("../Middlewares/Auth").auth;
const getAllInstructors = require("../Controllers/Getters").getAllInstructors;
const getAllStudents = require("../Controllers/Getters").getAllStudents;    

const router = express.Router();


router.get("/getallinstructors", auth, isStudent,getAllInstructors);
router.get("/getallstudents", auth,isInstructor, getAllStudents);


module.exports = router;



