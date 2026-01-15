import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";


const Dashboard = () => {
  const { auth } = useAuth();

  const [projects, setProjects] = useState([]);
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    if (!auth?.accessToken) return;

    const fetchData = async () => {
      const token = auth.accessToken;

      const [projectsRes, tasksRes] = await Promise.all([
        axios.get("/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("/api/tasks/my", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setProjects(projectsRes.data);
      setMyTasks(tasksRes.data);
    };

    fetchData();
  }, [auth]);

  return (
    <div className="flex bg-gray-50">
      <Sidebar
        workspaceName={auth?.email}
        projects={projects}
        myTasks={myTasks}
      />
      <main className="flex-1 p-6">Dashboard Content</main>
    </div>
  );
};

export default Dashboard;