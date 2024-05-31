import AppHeader from './components/AppHeader';
import {
  Outlet,
} from "react-router-dom";

function App() {

  return (
      <div className="min-h-screen bg-admin-dark flex flex-col px-5 border-0 !border-l border-solid !border-white/5">
        <AppHeader />
        <div className="flex flex-col gap-0">
          <Outlet />
        </div>
      </div>
  );

}

export default App;
