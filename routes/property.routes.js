import { Router } from "express";
import { createProperty, deleteProperty, getProperties, getProperty, updateProperty, getFacilities, getPropertyTypes, createFacility, createPropertyTypes } from "../controllers/property.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const propertyRouter = Router();

propertyRouter.get("/", authorize, getProperties);

propertyRouter.post("/", authorize, createProperty);

propertyRouter.get("/facilities", authorize, getFacilities);

propertyRouter.post("/facilities/create", authorize, createFacility);

propertyRouter.get("/types", authorize, getPropertyTypes);

propertyRouter.post("/types/create", authorize, createPropertyTypes);

propertyRouter.get("/:id", authorize, getProperty);

propertyRouter.put("/:id", authorize, updateProperty);

propertyRouter.delete("/:id", authorize, deleteProperty);

export default propertyRouter;

