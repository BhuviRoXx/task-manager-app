import { useEffect, useState } from "react";
import ProjectSummaryCards from "../../components/dashboard/ProjectSummaryCards"
import axios from "axios";
import { useAuth } from "../../context/AuthContext";


const ProjectPage = () => {
  const { auth } = useAuth();

  const [projects, setProjects] = useState([]);
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    if (!auth?.accessToken) return;

    const fetchData = async () => {
      const token = auth.accessToken;

      // const [projectsRes, tasksRes] = await Promise.all([
      //   axios.get("/api/project/getproject",{
      //     headers : {Authorization : `Bearer ${token}`}
      //   }),
      //   axios.get("/api/task/mytaks", {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }),
      // ]);

      const projectsRes = await axios.get("/api/project/getprojects",{
          headers : {Authorization : `Bearer ${token}`}
        });
        console.log(projectsRes.data);

      setProjects(projectsRes.data);
      // setMyTasks(tasksRes.data);
    };

    fetchData();
  }, [auth?.accessToken]);

  return (
    <div className="flex bg-gray-50">
      <div className="flex flex-col  w-full gap-10 bg-white">
        <ProjectSummaryCards
          projects = {projects}
        />
      </div>
      
    </div>
  );
};

export default ProjectPage;