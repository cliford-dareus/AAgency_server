import express from "express";
import { isAuthorized } from "../guards/isAuthorized";
import { getAllUsers } from "../controllers/user";

const router = express.Router();
router.route("/").get(getAllUsers);
export default router;
