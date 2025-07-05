import { Link, Outlet } from "react-router";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <>
      <div className="flex items-center max-w-7xl mx-auto gap-4">
        <span className="text-2xl">Todo App</span>
        <Link to="/tasks">Tasks</Link>
        <Link to="/users">Users</Link>
        <div>
          <ModeToggle />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default App;
