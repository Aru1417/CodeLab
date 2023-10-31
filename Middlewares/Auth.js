const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Student = require("../Models/Student");
const Instructor = require("../Models/Instructor");
const Admin = require("../Models/Admin");

dotenv.config();


exports.auth = async (req, res, next) => {
	try {
		
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorization").replace("Bearer ", "");

		
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			
			const decode =  jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			req.user = decode;
		} catch (error) {
			
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		
		next();
	} catch (error) {
		
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};
exports.isStudent = async (req, res, next) => {
	try {
		const userDetails = await Student.findOne({ userName: req.user.userName });

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
			.json({ success: false, message: `User Role Can't be Verified` });
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
