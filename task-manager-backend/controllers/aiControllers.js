import { parseIntent } from "../ai/intentParser.js";
import { createTask } from "./taskController.js";
import { updateTaskStatus } from "./taskController.js";
import { getTasks } from "./taskController.js";

export const handleAICommand = async (req, res) => {
  try {
    const { command } = req.body;

    const intent = await parseIntent(command);

    switch (intent.action) {
      case "CREATE_TASK":
        req.body = {
          name: intent.data.taskName,
        };
        return createTask(req, res);

      case "UPDATE_TASK_STATUS":
        req.body = {
          status: intent.data.status,
          name: intent.data.taskName
        };
        return updateTaskStatus(req, res);

        case "LIST_TASKS":
        req.body = {
          status: intent.filters.status,
        };
        return getTasks(req, res);

      default:
        return res.status(400).json({ message: "Unknown action" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};
