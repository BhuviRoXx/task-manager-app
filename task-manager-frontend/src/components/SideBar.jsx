import {
  LayoutDashboard,
  Folder,
  ListTodo,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ myTasks }) => {
  const navigate = useNavigate(); // ✅ inside component

  return (
    <aside className="w-60 h-screen bg-white border-r border-gray-200">
      {/* Workspace */}
      <div className="p-6 border-b border-gray-200">
        <img src="/victopia-logo.webp" alt="Victopia Logo" className="h-10 w-auto" />
      </div>


      {/* Navigation */}
      <nav className="flex-1 p-4">
        <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" route="" navigate={navigate} />
        <SidebarItem icon={<Folder size={18} />} label="Projects" route="project" navigate={navigate} />
        <SidebarItem icon={<ListTodo size={18} />} label="Tasks" route="task" navigate={navigate} />
        <SidebarItem icon={<Settings size={18} />} label="Settings" route="task" navigate={navigate} />
      </nav>
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
