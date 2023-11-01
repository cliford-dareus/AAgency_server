import express from "express";
import { createUnit, getUnits, updateUnit } from "../controllers/unit";
import { isAuthorized } from "../guards/isAuthorized";

const router = express.Router();
// router.route("/").get(getUnit);
router.route("/").post(createUnit).get(isAuthorized(), getUnits).put(updateUnit);
export default router;
