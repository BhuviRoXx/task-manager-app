import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../../pages/auth/SignIn";
import SignUp from "../../pages/auth/SignUp";
import Dashboard from "../../pages/dashboard/Dashboard";
import TaskPage from "../../pages/taskpage/TaskPage";
import AppLayout from "../../components/layout/AppLayout";
import ProjectPage from "../../pages/projectpage/ProjectPage"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/project/:projectId/gettasks" element={<TaskPage />} />
          <Route path="/project" element={<ProjectPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
