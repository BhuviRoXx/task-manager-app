import { useState } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ProjectCard from "./ProjectCard"

const WelcomeBox = ({ fetchData }) => {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Welcome Card */}
      <div className="flex items-center justify-between bg-white w-full px-20">
        <div>
            <h2 className="text-3xl font-semibold text-gray-800 py-2">
          Welcome back, <span className="text-gray-600">{auth?.username || "User"}</span> 👋
        </h2>
        <p className="text-gray-500">Here's what's happening with your projects today</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          <Plus size={18} />
          Create Project
        </button>
      </div>

      {/* Create Project Modal */}
      {open && <ProjectCard fetchData = {fetchData} onClose={() => setOpen(false)} />}
    </>
  );
};

export default WelcomeBox;
