import { model } from "mongoose";
import Project from "../model/projectSchema.js";
import Task from "../model/taskSchema.js";

export const createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, status } = req.body;
    const ownerId = req.user.id;

    // Validation
    if (!name) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    const project = await Project.create({
      name,
      description,
      status,
      startDate,
      endDate,
      ownerId,
    });

    return res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const project = await Project.findAll({
      where: {
        ownerId: ownerId,
      }
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found or access denied",
      });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getProjectId = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const projectId = req.params.id;

    const project = await Project.findOne({
      where: {
        id: projectId,
        ownerId: ownerId, // authorization check
      },
      include: [
        {
          model: Task,
          as: "tasks",
        },
      ],
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found or access denied",
      });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { name, description, dueDate, assignedTo, state, priority, projectId } = req.body;
    const userId = req.user.id; // logged-in user

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
      dueDate,
      assignedTo: assignedTo || null,
      state: state || "Not Started",
      priority: priority || "Medium",
      projectId,
    });

    return res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};