import express from "express";
import { createUnit, getUnits } from "../controllers/unit";

const router = express.Router();
// router.route("/").get(getUnit);
router.route("/").post(createUnit).get(getUnits);

export default router;
