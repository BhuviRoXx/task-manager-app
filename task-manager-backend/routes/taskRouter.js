import express from "express";
import { createProject } from "../controllers/projectController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getProjects } from "../controllers/projectController.js";
import { createTask } from "../controllers/projectController.js";

const router = express.Router();

router.post("/createproject", verifyToken, createProject);
router.get("/getprojects", verifyToken, getProjects);
router.post("/createTask", verifyToken, createTask);

export default router;