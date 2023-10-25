import express from "express";
import { createBoard, getBoard } from "../controllers/board";

const router = express.Router();
router.route("/").post(createBoard).get(getBoard);

export default router;
