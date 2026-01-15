import {
  LayoutDashboard,
  Folder,
  Users,
  Settings,
} from "lucide-react";

/**
 * Sidebar is a PURE UI component
 * It receives all data via props
 */
const Sidebar = ({ workspaceName, myTasks }) => {
  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col">

      {/* Workspace */}
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">
          {workspaceName || "Workspace"}
        </h2>
        <p className="text-sm text-gray-500">Workspace</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
        <SidebarItem icon={<Folder size={18} />} label="Projects" />
        <SidebarItem icon={<Users size={18} />} label="Team" />
        <SidebarItem icon={<Settings size={18} />} label="Settings" />
      </nav>

      {/* My Tasks */}
      <div className="p-4 border-t">
        <h4 className="text-sm font-semibold text-gray-500 mb-3">
          MY TASKS
        </h4>

        {myTasks?.length > 0 ? (
          myTasks.slice(0, 3).map(task => (
            <TaskItem
              key={task._id}
              label={task.name}
              state={task.state}
            />
          ))
        ) : (
          <p className="text-sm text-gray-400">No tasks assigned</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

/* ---------- Small Components ---------- */

const SidebarItem = ({ icon, label, active }) => (
  <div
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
    ${active ? "bg-gray-100 font-medium" : "text-gray-600 hover:bg-gray-50"}`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

/**
 * Task state strictly follows backend rules
 * Not Started | In Progress | Completed
 */
const TaskItem = ({ label, state }) => {
  const stateColor = {
    "Not Started": "bg-gray-400",
    "In Progress": "bg-yellow-400",
    "Completed": "bg-green-500",
  };

  return (
    <div className="flex items-center gap-3 mb-2 text-sm">
      <span
        className={`w-2 h-2 rounded-full ${
          stateColor[state] || "bg-gray-300"
        }`}
      />
      <span className="text-gray-700 truncate">{label}</span>
    </div>
  );
};
