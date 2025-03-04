import Property from "../models/property.model.js";
import PropertyType from "../models/propertyType.model.js";
import Facility from "../models/facility.model.js";

export const getProperties = async (req, res, next) => {
     try {
          const {
               page = 1, 
               limit = 10, 
               sortBy = "createdAt", 
               order = "desc",
               type, 
               status, 
               leaseType 
          } = req.query;

          const filter = {};

          if(type) filter.propertyType = type;
          if(status) filter.status = status;
          if(leaseType) filter.leaseType = leaseType;


          const properties = await Property.find(filter)
            .sort({ [sortBy]: order === "asc" ? 1 : -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

            const total = await Property.countDocuments(filter);

          res.status(200).json({success: true,count: properties.length,total,page: parseInt(page),pages: Math.ceil(total / limit), data: properties});
     } catch (error) {
          next(error);
     }
}

export const getProperty = async (req, res, next) => {
     try {
          const property = await Property.findById(req.params.id);

          if(!property) {
               return res.status(404).json({success: false, message: "Property not found"});
          }

          res.status(200).json({success: true, data: property});
     } catch (error) {
          next(error);
     }
}

export const  createProperty = async (req, res, next) => {
     try {
          const property = await Property.create({...req.body})

          res.status(201).json({success: true, data: property});
     } catch (error) {
          next(error)
     }
}

export const updateProperty = async (req, res, next) => {
     try {
          const property = await Property.findById(req.params.id);

          if(!property) return res.status(404).json({success: false, message: "Property not found"});

          const updated = await Property.findOneAndUpdate({_id: req.params.id},{...req.body});
          res.status(201).json({success: true, data: updated});

     } catch (error) {
          next(error);
     }
}

export const deleteProperty = async (req, res, next) => {
     try {
          const property = await Property.findById(req.params.id);

          if(!property) return res.status(404).json({success: false, message: "Property not found"});

          await Property.findByIdAndDelete(req.params.id);
          res.status(200).json({success: true, data:{message:"Property deleted successfully"}});
     } catch (error) {
          next(error)
     }
}


// Property Types

export const createPropertyTypes = async (req, res, next) => {
     try {

          const propertyTypes = await PropertyType.create(req.body);
          res.status(201).json({success: true, data: propertyTypes});

     } catch (error) {
          next(error)
     }
}

export const getPropertyTypes = async (req, res, next) => {
     try {
          const propertyTypes = await PropertyType.find();
          res.status(200).json({success: true, data: propertyTypes});
     } catch (error) {
          next(error)
     }
}

// Facilities

export const createFacility = async (req, res, next) => {
     try {
          const facility = await Facility.create(req.body);
          res.status(201).json({success: true, data: facility});

     } catch (error) {
          next(error)
     }
}

export const getFacilities = async (req, res, next) => {
     try {
          const facilities = await Facility.find();
          res.status(200).json({success: true, data: facilities});
     } catch (error) {
          next(error)
     }
}

