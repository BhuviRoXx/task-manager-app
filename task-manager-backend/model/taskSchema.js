import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./userSchema.js";
import Project from "./projectSchema.js";

const Task = sequelize.define(
  "Task",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    projectId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Project, key: "id" }, onDelete: "CASCADE" },
    assignedTo: { type: DataTypes.INTEGER, allowNull: true, references: { model: User, key: "id" }, onDelete: "SET NULL" },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.ENUM("Not Started", "In Progress", "Completed"), defaultValue: "Not Started" },
    priority: { type: DataTypes.ENUM("Low", "Medium", "High"), defaultValue: "Medium" },
    startDate: { type: DataTypes.DATE, allowNull: true },
    endDate: { type: DataTypes.DATE, allowNull: true },
  },
  { timestamps: true }
);

export default Task;
