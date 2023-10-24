import express from "express";
import { createSchedule, getAllSchedules } from "../controllers/scheduler";

const router = express.Router();
router.route("/").get(getAllSchedules).post(createSchedule);

export default router;
