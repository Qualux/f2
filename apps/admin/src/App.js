import AppHeader from './components/AppHeader';
import {
  Outlet,
} from "react-router-dom";

function App() {

  return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <div className="flex gap-0">
          <Outlet />
        </div>
      </div>
  );

}

export default App;
