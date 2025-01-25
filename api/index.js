import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import  swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert {type:'json'};

dotenv.config();

mongoose
.connect(process.env.MONGO)
.then(() => {
  console.log("mongodb is connected");
})
.catch((err) => {
  console.log(err);
});




const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("server is running on 3000");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/user", UserRouter);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
