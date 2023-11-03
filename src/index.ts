import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
dotenv.config();

// Import Routes
import unitRouter from "./routes/unit";
import shiftRouter from "./routes/shift";
import boardRouter from "./routes/board";
import authRouter from "./routes/auth";
import scheduleRouter from "./routes/schedule";
import userRouter from "./routes/user";
import employeeRouter from "./routes/employee";


const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SECRET!));
app.use(passport.initialize());
require("./middleware/stategy");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/unit", unitRouter);
app.use("/api/v1/shift", shiftRouter);
app.use("/api/v1/board", boardRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/schedule", scheduleRouter);
app.use("/api/v1/employee", employeeRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log("server is up " + process.env.PORT);
});
