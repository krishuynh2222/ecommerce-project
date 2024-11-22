import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success: false, message: "User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({success:true, token})
        } else {
            res.json({success: false, message: "Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error})
    }
}

//Route for user resgister

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //checking user already exists or not 
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success: false, message: "User already exists"})
        }
        //validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"})
        }
        // if (password.length < 8) {
        //     return res.json({success: false, message: "Please enter a strong password"})
        // }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.json({ success: false, message: "Password must be at least 8 characters, contain one uppercase letter, and one special character." });
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)  //genSalt() - it is used to generate salt
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({success: true, token})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error})
        
    }
}

//Route for admin login
const adminLogin = async (req, res) => {
    try {
        //get user emailId and password
        const {email, password}  = req.body;
        
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token}) //send this token to admin user 
        } else {
            res.json({success:false, message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error})
    }
}

export { loginUser, registerUser, adminLogin};