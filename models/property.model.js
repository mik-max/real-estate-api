import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
     name: {
          type: String,
          required: [true, "Please enter property name"],
          trim: true,
          minLength: 3,
          maxLength: 50
     },
     description: {
          type: String,
          required: [true, "Please enter property description"],
          trim: true,
          minLength: 10,
          maxLength: 500
     },
     price: {
          type: Number,
          required: [true, "Please enter property price"],
          min: [1000, "Price must be at least 1000"]
     },
     leaseType: {
          type: String,
          enum: ["sale", "rent"],
          required: [true, "Please enter property lease type"]
     },
     country: {
          type: String,
          trim: true,
          minLength: 3,
          default: "Nigeria"
     },
     state: {
          type: String,
          required: [true, "Please enter property state"],
          trim: true,
          minLength: 3,
          maxLength: 50
     },
     address: {
          type: String,
          required: [true, "Please enter property location"],
          trim: true,
          minLength: 3,
          maxLength: 100
     },
     propertyType: {
          type: String,
          ref: "PropertyType",
          required: true
     },
     facilities:{
          type: [String],
          ref: "Facility",
     },
     status: {
          type: String,
          enum: ["available", "sold", "unavailable"],
          default: "available"
     },
     gallery: {
          type : [String],
     },
     image: {
          type: String,
          required: [true, "Please upload property image"]
     },
     agent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Agent",
          required: true
     }
     }, {timestamps: true});



     const Property = mongoose.model('Property', propertySchema);

     export default Property;