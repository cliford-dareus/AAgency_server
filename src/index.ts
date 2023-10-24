import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

// Import Routes
import scheduleRouter from "./routes/schedule";
import unitRouter from "./routes/unit";
import shiftRouter from "./routes/shift";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"))
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/schedule", scheduleRouter);
app.use('/api/v1/unit', unitRouter)
app.use('/api/v1/shift', shiftRouter);


app.listen(process.env.PORT || 8080, () => {
  console.log("server is up " + process.env.PORT);
});
