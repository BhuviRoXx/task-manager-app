import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateTask from "../../components/taskpage/CreateTask";
import TaskTable from "../../components/taskpage/TaskTable";
import AiSearchBox from "../../components/taskpage/AiSearchBox"

export default function TaskPage() {
  const { projectId } = useParams();
  const { auth } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState(null);
  const [aiMode, setAiMode] = useState(false);

  const fetchData = async () => {
    if (!auth?.accessToken) return;
    let apiPath;
    if(!projectId){
      apiPath = `api/task/getalltask`;
    }
    else if(projectId){
      apiPath =  `/api/project/${projectId}/gettasks`;
    }
    console.log(apiPath);

    try {
      const token = auth.accessToken;

      const res = await axios.get(
       apiPath,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("taskpage :",res.data.tasks);
      setTasks(res.data.tasks);
      setProject(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!aiMode) {
      fetchData();
    }
  }, [projectId, auth?.accessToken, aiMode]);

  return (
    <div className="flex flex-col gap-10">
      <AiSearchBox projectId={projectId} setTasks={setTasks} fetchData={fetchData} setAiMode={setAiMode}/>
      <CreateTask
        projectId={projectId}
        projectName={project?.name}
        fetchData={fetchData}
      />
      <TaskTable tasks={tasks} projectId={projectId} fetchData={fetchData} setAiMode={setAiMode}/>
    </div>
  );
}
