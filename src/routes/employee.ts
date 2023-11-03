import express from "express";
import { createEmployee } from "../controllers/employee";

const router = express.Router();
router.route("/").post(createEmployee);

export default router;
