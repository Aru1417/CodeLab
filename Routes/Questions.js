const express = require("express");
const { isInstructor } = require("../Middlewares/Auth");
const { addQuestion } = require("../Controllers/Questions");
const {auth}  = require("../Middlewares/Auth");
const router = express.Router()


router.post("/addquestion",auth, isInstructor, addQuestion);
module.exports = router;