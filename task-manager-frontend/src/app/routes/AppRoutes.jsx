import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../../pages/auth/SignIn";
import SignUp from "../../pages/auth/SignUp";
import Dashboard from "../../pages/dashboard/Dashboard";
import TaskPage from "../../pages/taskpage/TaskPage";
import AppLayout from "../../components/layout/AppLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
