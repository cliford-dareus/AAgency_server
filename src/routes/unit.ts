import express from "express";
import { createUnit, getUnit } from "../controllers/unit";

const router = express.Router();
router.route("/:unitname").get(getUnit);
router.route("/").post(createUnit);

export default router;
