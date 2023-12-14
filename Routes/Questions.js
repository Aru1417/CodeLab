const express = require('express');
const router = express.Router();
const { isInstructor, isStudent } = require("../Middlewares/Auth");
const { addQuestion, addAssignment, getAllAssignment,getAssignment,submitAsg } = require("../Controllers/Questions");
const {auth}  = require("../Middlewares/Auth");


router.post("/addquestion", auth,isInstructor,  addQuestion);
// router.post("/addquestion", auth, isInstructor, addQuestion);
router.post("/addasg",auth, isInstructor, addAssignment);
router.post("/getallasg", auth, isStudent, getAllAssignment);
router.get("/getasg", auth,isStudent,getAssignment);
router.get("/getasg2", auth,getAssignment);
router.post("/subasg", auth, isStudent,submitAsg);

module.exports = router;