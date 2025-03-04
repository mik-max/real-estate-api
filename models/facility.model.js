import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
     name:{
          type: String,
          trim: true,
          minLength: 3,
          maxLength: 50,
          unique: true,
          required: [true, "Please enter facility name"]
     }
}, {timestamps: true});

const Facility = mongoose.model("Facility", facilitySchema);

export default Facility;