import { useLocation, Outlet } from "react-router-dom";
import AppTemplate from '../../components/global/AppTemplate';
import Dashboard from '../../components/fields/FieldDashboard';

export default function FieldDashboardRoute() {

    const location = useLocation();
    const isMainRoute = location.pathname === "/fields";

    if( isMainRoute ) {
        return(
            <AppTemplate title="Field Manager">
                <div className="max-w-3xl my-2">
                    <Dashboard />
                </div>
            </AppTemplate>
        )
    }

    return(
        <Outlet />
    )
    
}