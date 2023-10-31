const Student = require("../Models/Student");
const Instructor = require("../Models/Instructor");
const Admin = require("../Models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
// const mongoose = require("mongoose");

dotenv.config();

exports.signup = async (req, res) => {
  try {
    const { userName, password, accountType } = req.body;

    if (!userName || !password || !accountType) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const existingUser = await Student.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    if (accountType === "student") {
      const user = await Student.create({
        userName,
        password: hashedPassword,
        accountType,

      });
    } else if (accountType === "instructor") {
      const user = await Instructor.create({
        userName,
        password: hashedPassword,
        accountType,
      });
    }
    else{
      const user = await Admin.create({
        userName,
        password: hashedPassword,
        accountType,
      });
    }
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};


exports.login = async (req, res) => {
  try {
 
    const { userName, password } = req.body

    if (!userName || !password) {
      
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      })
    }

    
    let user = await Student.findOne({ userName })
    if (!user)
    user = await Instructor.findOne({ userName })
    if (!user)
    user = await Admin.findOne({ userName })
    
    if (!user) {
     
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      })
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { userName: user.userName, id: user._id, role: user.accountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      )

      
      user.token = token
      user.password = undefined
      
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      })
    }
  } catch (error) {
    console.error(error)
   
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    })
  }
}

exports.addToClass = async (req, res)=>{
  try {
    const { userName, instructorName } = req.body;

    if (!userName || !instructorName) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }
    const std = await Student.findOne({userName})
    const instructorDetails = await Instructor.findOne({userName:instructorName})
    await Instructor.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          students  : std._id ,
        },
      },
      { new: true }
    );
    
    return res.status(200).json({
      success: true,
      message: "User registered to class successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered to class. Please try again.",
    });
  } 
}