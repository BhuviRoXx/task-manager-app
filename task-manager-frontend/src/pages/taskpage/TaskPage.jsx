import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateTask from "../../components/taskpage/CreateTask";
import TaskTable from "../../components/taskpage/TaskTable";

export default function TaskPage() {
  const { projectId } = useParams();
  const { auth } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);

  const fetchData = async () => {
    if (!auth?.accessToken || !projectId) return;

    try {
      const token = auth.accessToken;

      const res = await axios.get(
        `/api/project/${projectId}/gettasks`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks(res.data.tasks);
      setProject(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId, auth?.accessToken]);

  return (
    <div className="flex flex-col gap-10">
      <CreateTask
        projectId={projectId}
        projectName={project?.name}
        fetchData={fetchData}
      />

      <TaskTable tasks={tasks} projectId={projectId} fetchData={fetchData}/>
    </div>
  );
}
