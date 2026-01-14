import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <header>Task Manager</header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
