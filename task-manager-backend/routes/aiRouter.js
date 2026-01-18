import express from "express";
import { handleAICommand } from "../controllers/aiControllers.js";
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router();

router.post("/:projectId", verifyToken, handleAICommand);

export default router;