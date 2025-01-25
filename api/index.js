import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import areaRoutes from "./routes/area.route.js";
import cityRoutes from "./routes/city.route.js";
import contactFormRoutes from "./routes/contactForm.route.js";
import teacherRoutes from "./routes/teacher.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" assert { type: "json" };

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

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use("/api/user", UserRouter);
// app.use("/api/auth", authRoutes);
// app.use("/api/area", areaRoutes);
// app.use("/api/city", cityRoutes);
// app.use("/api/form", contactFormRoutes);
// app.use("/api/teacher", teacherRoutes);


app.use("/api", UserRouter);
app.use("/api", authRoutes);
app.use("/api", areaRoutes);
app.use("/api", cityRoutes);
app.use("/api", contactFormRoutes);
app.use("/api", teacherRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
