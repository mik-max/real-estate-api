import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
     password: {
          type: String,
          required: [true, "Please enter your password"],
          minLength: 6,
     },
     role: {
          type: String,
          enum: ["user", "agent", "admin"],
          default: "user"
     }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;