import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//REGISTER USER 

export const registerUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        //Basic Validation
        if(!name || !email || !password){
            return res.status(400).json({
                message:"Please fill in all fields"
            });
        }

        //Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists with this email"
            });
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //Create new user
        const user = new User({
            name,
            email,
            password:hashedPassword
        });

        await user.save();

        res.status(201).json({
            message:"User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        });
    }
}


//LOGIN USER

export const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;

        //Basic Validation
        if(!email || !password){
            return res.status(400).json({
                message:"Please fill in all fields"
            });
        }

        //Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid credentials"
            });
        }

        //Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            });
        }

        //Generate JWT token
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );
        res.json({
            message:"Login successful",
            token
        });

    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        });
    }
}