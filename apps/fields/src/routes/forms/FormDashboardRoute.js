import { useLocation, Outlet } from "react-router-dom";
import Dashboard from '../../components/forms/FormDashboard';

export default function FormDashboardRoute() {

    const location = useLocation();
    const isMainRoute = location.pathname === "/forms"; 

    if( isMainRoute ) {
        return(
            <Dashboard />
        );
    }

    return(
        <Outlet />
    );

}