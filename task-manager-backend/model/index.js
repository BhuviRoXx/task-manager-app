import User from "./userSchema.js";
import Project from "./projectSchema.js";
import Task from "./taskSchema.js";

// User ↔ Project
User.hasMany(Project, { foreignKey: "ownerId", as: "projects" });
Project.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

// Project ↔ Task
Project.hasMany(Task, { foreignKey: "projectId", as: "tasks" });
Task.belongsTo(Project, { foreignKey: "projectId", as: "project" });

// User ↔ Task (assigned tasks)
User.hasMany(Task, { foreignKey: "assignedTo", as: "assignedTasks" });
Task.belongsTo(User, { foreignKey: "assignedTo", as: "assignee" });

export { User, Project, Task };
