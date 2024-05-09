import AppTemplate from '../../components/global/AppTemplate';
import FieldGroupList from '../../components/groups/FieldGroupList';
import { useLocation, Outlet } from "react-router-dom";

export default function GroupsDashboard() {

    const location = useLocation();

    // Check if the current route is the main route ("/groups")
    const isMainRoute = location.pathname === "/groups";

    if( isMainRoute ) {
        return(
            <AppTemplate title="Field Group Manager">
                <div className="max-w-3xl my-2">
                    <FieldGroupList />
                </div>
            </AppTemplate>
        );
    }

    return(
        <Outlet />
    );
    
}