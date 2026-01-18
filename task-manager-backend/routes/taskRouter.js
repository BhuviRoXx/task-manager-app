import express from "express";
import { createProject } from "../controllers/projectController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getProjects } from "../controllers/projectController.js";
import { createTask } from "../controllers/taskController.js";
import { getTasks } from "../controllers/taskController.js";
import { deleteTask } from "../controllers/taskController.js";
import { updateTaskStatus } from "../controllers/taskController.js";

const router = express.Router();

router.post("/createproject", verifyToken, createProject);
router.get("/getprojects", verifyToken, getProjects);


router.post("/:projectId/createtask", verifyToken, createTask);
router.get("/:projectId/gettasks", verifyToken, getTasks);
router.get("/getalltask", verifyToken, getTasks);
router.delete("/:projectId/deletetask/:taskId", deleteTask);
router.patch("/:projectId/task/:taskId/status", updateTaskStatus);

export default router;