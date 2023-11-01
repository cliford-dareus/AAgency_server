import express from "express";
import {
  createBoard,
  deleteBoard,
  getBoard,
  updateBoard,
} from "../controllers/board";

const router = express.Router();
router.route("/").post(createBoard).get(getBoard).put(updateBoard);
router.route("/:id").delete(deleteBoard);

export default router;
