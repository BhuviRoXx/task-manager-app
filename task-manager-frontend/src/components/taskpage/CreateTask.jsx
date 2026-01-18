import { useState } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import TaskCard from "../taskpage/TaskCard"

const CreateTask = (props) => {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* project title */}
       <div className="flex items-center justify-between bg-white w-full px-20 ">
        <div>
            <h2 className="text-3xl font-semibold text-gray-800 py-2">
              {props.projectName}
        </h2>
        <p className="text-gray-500">Here's what's happening with your projects today</p>
        </div>

        {props.projectId && (<button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          <Plus size={18} />
          New Task
        </button>)}
      </div>
      {/* Create Project Modal */}
      {open && <TaskCard projectId = { props.projectId } fetchData={props.fetchData} onClose={() => setOpen(false)} />}
    </>
  );
};

export default CreateTask;
