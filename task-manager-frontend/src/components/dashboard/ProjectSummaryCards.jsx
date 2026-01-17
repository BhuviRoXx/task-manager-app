import {
  Folder,
  CheckCircle,
  ClipboardList,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const ProjectSummaryCards = ({ projects }) => {
  const navigate = useNavigate();

  const totalProjects = projects.length;
  const completedProjects = projects.filter(
    p => p.status === "Completed"
  ).length;

  const allTasks = projects.flatMap(p => p.tasks || []);
  const totalTasks = allTasks.length;

  const overdueTasks = allTasks.filter(task => {
    if (!task.dueDate || task.state === "Completed") return false;
    return new Date(task.dueDate) < new Date();
  }).length;

  const cards = [
    {
      label: "Total Projects",
      value: totalProjects,
      icon: <Folder />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Completed Projects",
      value: completedProjects,
      icon: <CheckCircle />,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: <ClipboardList />,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Overdue Tasks",
      value: overdueTasks,
      icon: <AlertCircle />,
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white w-70 border border-gray-200 rounded-sm p-5 flex justify-between items-center"
        >
          <div>
            <p className="text-sm text-gray-500">{card.label}</p>
            <h3 className="text-2xl font-semibold">{card.value}</h3>
          </div>

          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}
          >
            {card.icon}
          </div>
        </div>
      ))}
    </div>
      <div className="w-full max-w-5xl mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Project Overview
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/project/${p.id}/gettasks`)}
              className="bg-white border-r border-gray-200 rounded-md p-4 shadow-sm hover:shadow-md transition"
            >
              {/* Project Name */}
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {p.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {p.description || "No description provided"}
              </p>

              {/* Status + Date */}
              <div className="flex items-center justify-between mt-auto">
                {/* Status */}
                <span
                  className={`px-2 py-1 text-xs rounded-full font-medium
                    ${
                      p.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : p.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {p.status}
                </span>

                {/* End Date */}
                <span className="text-xs text-gray-500">
                  Ends on{" "}
                  {new Date(p.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>

  );
};

export default ProjectSummaryCards;
