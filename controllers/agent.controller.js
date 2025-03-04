import Agent from "../models/agent.model.js";

export const getAgents = async (req, res, next) => {
     try {
          const agents = await Agent.find();

          res.status(200).json({success: true, data: agents});
     } catch (error) {
          next(error);
     }
}

export const getAgent = async (req, res, next) => {
     try {
          const agent = await Agent.findById(req.params.id);

          if(!agent) return res.status(404).json({success: false, message: "Agent not found"});

          res.status(200).json({success: true, data: agent});
     } catch (error) {
          next(error);
     }
}

export const createAgent = async (req, res, next) => {
     try {
          const agent = await Agent.findOne({email:
          req.body.email});

          if(agent) return res.status(409).json({success: false, message: "Agent already exists"});

          const newAgent = await Agent.create({...req.body});

          res.status(201).json({success: true, data: newAgent});

     } catch (error) {
          next(error);
     }
}