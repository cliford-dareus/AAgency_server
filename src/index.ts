import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
dotenv.config();

// Import Routes
import unitRouter from "./routes/unit";
import shiftRouter from "./routes/shift";
import boardRouter from "./routes/board";
import scheduleRouter from "./routes/schedule";

const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/schedule", scheduleRouter);
app.use("/api/v1/unit", unitRouter);
app.use("/api/v1/shift", shiftRouter);
app.use("/api/v1/board", boardRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log("server is up " + process.env.PORT);
});
