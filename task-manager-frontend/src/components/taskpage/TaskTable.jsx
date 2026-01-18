import { useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function TaskTable({ tasks = [], projectId, fetchData, setAiMode }) {
  const { auth } = useAuth();
  console.log("tasktable",tasks);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedTasks, setSelectedTasks] = useState([]);

  const filteredTasks = tasks.filter(task => {
    const statusMatch =
      statusFilter === "All" || task.status === statusFilter;
    const priorityMatch =
      priorityFilter === "All" || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleDelete = async () => {
    try {
      const token = auth.accessToken;

      await Promise.all(
        selectedTasks.map(taskId =>
          axios.delete(
            `/api/project/${projectId}/deletetask/${taskId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        )
      );

      setSelectedTasks([]);
      fetchData(); // refresh list
    } catch (error) {
      console.error(error);
    }
  };

  const getNextStatus = (status) => {
    if (status === "Not Started") return "In Progress";
    if (status === "In Progress") return "Completed";
    return null;
  };

  const handleStatusChange = async (task) => {
    const nextStatus = getNextStatus(task.status);
    if (!nextStatus) return;

    try {
      await axios.patch(
        `/api/project/${projectId}/task/${task.id}/status`,
        { status: nextStatus },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      fetchData(); // refresh tasks
    } catch (err) {
      alert(err.response?.data?.message || "Status update failed");
    }
  };

  return (
    <div className="bg-white rounded-lg px-20 py-5 flex flex-col gap-5 relative">
      
      {/* Delete Button */}
      {selectedTasks.length > 0 && (
        <button
          onClick={handleDelete}
          className="absolute top-5 right-20 flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
        >
          <Trash2 size={16} />
          Delete
        </button>
      )}

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={statusFilter}
          onChange={(e) => {setStatusFilter(e.target.value);
            setAiMode(false);}
          }
          className="shadow border border-gray-200 rounded px-3 py-2 text-sm"
        >
          <option value="All">All Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => { setPriorityFilter(e.target.value);
            setAiMode(false);
          }}
          className="shadow border border-gray-200 rounded px-3 py-2 text-sm"
        >
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border border-gray-200">
            <tr>
              <th className="p-3"></th>
              <th className="p-3">Task</th>
              <th className="p-3">Status</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Start</th>
              <th className="p-3">End</th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-400">
                  No tasks found
                </td>
              </tr>
            ) : (
              filteredTasks.map(task => (
                <tr
                  key={task.id}
                  className="border border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task.id)}
                      onChange={() => toggleTaskSelection(task.id)}
                    />
                  </td>

                  <td className="p-3 font-medium">{task.name}</td>

                  <td className="p-3 flex items-center gap-2">
                    <StatusBadge status={task.status} />

                    {task.status !== "Completed" && (
                      <button
                        onClick={() => handleStatusChange(task)}
                        className="text-xs text-gray-600 hover:text-lg"
                      >
                        →
                      </button>
                    )}
                  </td>

                  <td className="p-3">
                    <PriorityBadge priority={task.priority} />
                  </td>

                  <td className="p-3">
                    {task.startDate
                      ? new Date(task.startDate).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-3">
                    {task.endDate
                      ? new Date(task.endDate).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* Badges unchanged */
const StatusBadge = ({ status }) => {
  const colors = {
    "Not Started": "bg-gray-200 text-gray-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "Completed": "bg-green-100 text-green-700",
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const colors = {
    Low: "bg-blue-100 text-blue-700",
    Medium: "bg-orange-100 text-orange-700",
    High: "bg-red-100 text-red-700",
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[priority]}`}>
      {priority}
    </span>
  );
};
