import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";


export const signUp = async (req, res, next) => {
     const session = await mongoose.startSession();
     session.startTransaction();
     try {
        const {email, password, name, role} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
          return res.status(409).json({success: false, message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = await  User.create([{email, password: hashedPassword, name, role}], {session});

        const token = jwt.sign({userId: newUser[0]._id, role: newUser[0].role}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
          success: true,
          data: {user: newUser[0], token}
        });

     } catch (error) {
         await session.abortTransaction();
         session.endSession();
          next(error); 
     }
}

export const signIn = async (req, res, next) => {
     try {
          const {email, password} = req.body;
          const user = await User.findOne({email});
          
          if(!user){
               return res.status(404).json({success: false, message: "User not found"});
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if(!isPasswordValid){
               return res.status(400).json({success: false, message: "Invalid credentials"});
          }
          const token = jwt.sign({userId: user._id, role: user.role}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
          res.status(200).json({
               success: true,
               data: {user, token}
          });
     } catch (error) {
          next(error);
     }
}

