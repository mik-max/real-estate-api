import { Router } from "express";
import { createAgent, getAgent, getAgents } from "../controllers/agent.controller.js";

const agentRouter = Router(); 

agentRouter.post("/", createAgent);

agentRouter.get("/", getAgents);

agentRouter.get("/:id", getAgent);

export default agentRouter;