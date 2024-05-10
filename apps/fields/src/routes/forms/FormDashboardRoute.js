import { useLocation, Outlet } from "react-router-dom";
import AppTemplate from '../../components/global/AppTemplate';
import Dashboard from '../../components/forms/FormDashboard';

export default function FormDashboardRoute() {

    const location = useLocation();
    const isMainRoute = location.pathname === "/forms"; 

    if( isMainRoute ) {
        return(
            <AppTemplate title="Form Manager">
                <div className="max-w-3xl my-2">
                    <Dashboard />
                </div>
            </AppTemplate>
        );
    }

    return(
        <Outlet />
    );

}