import Menu from './Menu';
import {
  createHashRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";





function App() {
  return (
    <div className="flex gap-12">
      <Menu />
      <Outlet />
    </div>
  );
}

export default App;
