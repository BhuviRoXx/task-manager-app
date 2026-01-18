import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const TaskCard = ({ projectId, fetchData, onClose }) => {
  const auth = useAuth();

  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Not Started",
    priority : ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `/api/project/${projectId}/createtask`,
        form,
        {
          headers: {
            Authorization: `Bearer ${auth.auth.accessToken}`,
          },
        }
      );

      console.log("Task created:", res.data);
      fetchData();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create Task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 shadow-lg relative rounded-lg">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X />
        </button>

        <h3 className="text-lg font-semibold mb-4">Create Task</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-400 rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded"
          />

          <div className="flex gap-3">
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-400 rounded"
            />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>

          <div className="flex gap-3">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
            >
              {/* Placeholder option */}
              <option value="" disabled>
                Select status
              </option>

              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              name="Priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
            >
              {/* Placeholder option */}
              <option value="" disabled>
                Select Priority
              </option>

              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>


          {/* Error message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskCard;
