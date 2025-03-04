import mongoose from 'mongoose'
import { type } from 'os'

const agentSchema = new mongoose.Schema({
     name: {
          type: String,
          required: [true, "Please enter your name"],
          trim: true,
          minLength: 3,
          maxLength: 50
     },
     email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          match:[/\S+@\S+\.\S+/, "Please provide a valid email address"]
     },

     phoneNumber: {
          type: String,
          required: true,
          minLength: 11,
          maxLength: 11
     },

     gender: {
          type: String,
          enum:['male', 'female', "others"],
          required: true,
     },

     profileImage: {
          type: String,
     },

}, {timestamps: true});

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;