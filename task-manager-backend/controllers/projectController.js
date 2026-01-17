import { Project, Task } from "../model/index.js";

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


