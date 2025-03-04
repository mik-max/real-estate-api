import express from "express";
import connectToDatabase from "./database/mongodb.js";
import { PORT } from "./config/env.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.routes.js";
import propertyRouter from "./routes/property.routes.js";
import userRouter from "./routes/user.routes.js";
import agentRouter from "./routes/agent.routes.js";

const app = express();

app.use(express.json());
app.use(errorMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/properties', propertyRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/agents', agentRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});




app.listen(PORT, async() => {
     // console.log(`Server is running on http://localhost:${PORT}`);
     await connectToDatabase();
});


export default app;