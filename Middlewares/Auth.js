const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Student = require("../Models/Student");
const Instructor = require("../Models/Instructor");
const Admin = require("../Models/Admin");
const mongoose = require("mongoose");


dotenv.config();


exports.auth = async (req, res, next) => {
	try {
		
		// console.log(req.header("Authorization"));
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");
			// console.log("token is here");	
			// console.log(token);
         
		
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			const decode =  jwt.verify(token, process.env.JWT_SECRET);
			// console.log(decode);
			req.user = decode;
		} catch (error) {
			
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" ,error:error.message});
		}

		
		next();
	} catch (error) {
		
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token here auth`,
			error: error.message,
		});
	}
};
exports.isStudent = async (req, res, next) => {
	try {
		let id = new mongoose.Types.ObjectId(req.user.id);
		// console.log(id)
		
		const userDetails = await Student.findOne({ _id: id });
		

		if (userDetails.accountType !== "student") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Students",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified student`,error:error.message });
	}
};
exports.isAdmin = async (req, res, next) => {
	try {
		// console.log(req.user);
		const userDetails = await Admin.findOne({ userName: req.user.userName });

		if (userDetails.accountType !== "admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified admin` });
	}
};
exports.isInstructor = async (req, res, next) => {
	try {
		
		const userDetails = await Instructor.findOne({ userName: req.user.userName });
		

		

		if (userDetails.accountType !== "instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified instructor` });
	}
};
