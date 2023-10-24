import express from "express";
import { createShift, getShifts } from "../controllers/shifts";

const router = express.Router();
router.route("/").post(createShift);
router.route("/:unitId").get(getShifts);

export default router;
