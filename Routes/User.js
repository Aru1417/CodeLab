const express = require("express");
const addToClass  = require("../Controllers/Auth").addToClass;
const router = express.Router()

const signup = require("../Controllers/Auth").signup;
const login = require("../Controllers/Auth").login;
const auth = require("../Middlewares/Auth").auth;
const isAdmin = require("../Middlewares/Auth").isAdmin;
router.post("/signup",auth,isAdmin, signup);
router.post("/login", login);
router.post("/addtoclass",auth,isAdmin,addToClass);

module.exports = router;