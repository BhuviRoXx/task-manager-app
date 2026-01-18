import { Project, Task } from "../model/index.js";
import { canTransition } from "../utils/taskState.js";
import { Op } from "sequelize";

export const createTask = async (req, res) => {
  try {
    const { name, description, startDate, endDate, status, priority } = req.body;
    const { projectId } = req.params;
    const userId = req.user.id;

    if (!name || !projectId) {
      return res.status(400).json({ message: "Task name and project are required" });
    }

    const project = await Project.findOne({ where: { id: projectId, ownerId: userId } });
    if (!project) {
      return res.status(404).json({ message: "Project not found or access denied" });
    }

    const task = await Task.create({
      name,
      description,
      startDate, 
      endDate,
      status: status || "Not Started",
      priority: priority || "Medium",
      projectId,
      assignedTo: userId,  // <-- assign to a user
    });


    return res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { projectId }  = req.params;
    const { status }  = req.body;
    let projectTasks;
    let allTasks;
    if(!status && projectId){
      projectTasks = await Project.findOne({
        where: {
          id: projectId,
          ownerId: ownerId,
        },
        include: [
          {
            model: Task,
            as: "tasks",
          },
        ],
      });
    }
    else if(status){//ai
       projectTasks = await Project.findAll({
        where: {
          id: projectId,
          ownerId: ownerId,
        },
        include: [
          {
            model: Task,
            as: "tasks",
            where: status ? { status: status.trim() } : undefined,
            required: false, // include even if no tasks match
          },
        ],
      });
    }
    else if(!projectId){//getalltasks
      allTasks = await Task.findAll({
        where: {
          assignedTo: ownerId,
        },
      });
      projectTasks = {
        tasks : allTasks
      }
    }
    console.log(projectTasks)
    if (!projectTasks) {
      return res.status(404).json({
        message: "Project not found or access denied",
      });
    }

    return res.status(200).json(projectTasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;

    const task = await Task.findOne({
      where: {
        id: taskId,
        projectId: projectId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found for this project",
      });
    }

    await task.destroy();

    return res.status(200).json({
      message: "Task deleted successfully",
      taskId,
    });
  } catch (error) {
    console.error("Delete task error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const { status: newStatus, name : taskName } = req.body;

    // 1️⃣ Verify project exists
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    let task;

    // 2️⃣ FRONTEND FLOW (taskId exists)
    if (taskId) {
      task = await Task.findOne({
        where: { id: taskId, projectId },
      });
    }

    // 3️⃣ AI FLOW (taskId missing → resolve by name)
    else if (taskName) {
      const tasks = await Task.findAll({
        where: {
          projectId,
          name: {
            [Op.like]: `%${taskName.trim()}%`,
          },
        },
      });

      if (tasks.length === 0) {
        return res.status(404).json({
          message: `No task found matching "${taskName}"`,
        });
      }

      if (tasks.length > 1) {
        return res.status(400).json({
          message: `Multiple tasks match "${taskName}". Please be more specific.`,
        });
      }

      task = tasks[0];
    }

    if (!task) {
      return res.status(404).json({
        message: "Task not found in this project",
      });
    }

    if (!canTransition(task.status, newStatus)) {
      return res.status(400).json({
        message: `Invalid status transition: ${task.status} → ${newStatus}`,
      });
    }

    task.status = newStatus;
    await task.save();

    res.json({
      message: "Task status updated successfully",
      task,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
