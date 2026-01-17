import {
  LayoutDashboard,
  Folder,
  Users,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ myTasks }) => {
  const navigate = useNavigate(); // ✅ inside component

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200">
      {/* Workspace */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-m font-bold">Victopia Labs</h2>
        <p className="text-xs text-gray-500">Workspace</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" route="" navigate={navigate} />
        <SidebarItem icon={<Folder size={18} />} label="Projects" route="project" navigate={navigate} />
        <SidebarItem icon={<Users size={18} />} label="Team" route="project" navigate={navigate} />
        <SidebarItem icon={<Settings size={18} />} label="Settings" route="project" navigate={navigate} />
      </nav>

      {/* My Tasks */}
      <div className="p-6">
        <h4 className="text-md font-semibold text-black mb-3">My Tasks</h4>
        {myTasks?.length > 0 ? (
          myTasks.slice(0, 3).map(task => (
            <TaskItem key={task._id} label={task.name} state={task.state} />
          ))
        ) : (
          <p className="text-sm text-gray-400">No tasks assigned</p>
        )}
      </div>

      {/* My Projects */}
      <div className="p-6">
        <h4 className="text-md font-semibold text-black mb-3">My Projects</h4>
        {myTasks?.length > 0 ? (
          myTasks.slice(0, 3).map(task => (
            <TaskItem key={task._id} label={task.name} state={task.state} />
          ))
        ) : (
          <p className="text-sm text-gray-400">No Projects yet, create one</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;


const SidebarItem = ({ icon, label, active, route, navigate }) => (
  <div
    onClick={() => navigate(`/${route}`)}
    className={`flex items-center gap-3 px-3 py-3 rounded cursor-pointer
      ${active ? "bg-gray-100 font-medium" : "text-black font-semibold hover:bg-gray-50"}`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

const TaskItem = ({ label, state }) => {
  const stateColor = {
    "Not Started": "bg-gray-400",
    "In Progress": "bg-yellow-400",
    "Completed": "bg-green-500",
  };

  return (
    <div className="flex items-center gap-3 mb-2 text-sm">
      <span className={`w-2 h-2 rounded-full ${stateColor[state] || "bg-gray-300"}`} />
      <span className="text-gray-700 truncate">{label}</span>
    </div>
  );
};
