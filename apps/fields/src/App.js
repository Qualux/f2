import Menu from './components/Menu';
import {
  createHashRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen flex gap-4">
      <Menu />
      <Outlet />
    </div>
  );
}

export default App;