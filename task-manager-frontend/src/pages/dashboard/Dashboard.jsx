import { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import Header from "../../components/Header";
import ProjectSummaryCards from "../../components/ProjectSummaryCards"
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import WelcomeBox from "../../components/WelcomeBox";


const Dashboard = () => {
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
      <Sidebar
        projects={projects}
        myTasks={myTasks}
      />
      <div className="flex flex-col  w-full gap-10 bg-white">
        <Header/>
        <WelcomeBox/>
        <ProjectSummaryCards
          projects = {projects}
        />
      </div>
      
    </div>
  );
};

export default Dashboard;