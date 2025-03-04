import mongoose from "mongoose";

const propertyTypeSchema = new mongoose.Schema({
     name: {
          type: String,
          trim: true,
          minLength: 3,
          maxLength: 50,
          unique: true,
          required: [true, "Please enter property type name"]
     }
}, {timestamps: true});

const PropertyType = mongoose.model("PropertyType", propertyTypeSchema);

export default PropertyType;
