import { useLocation, Outlet } from "react-router-dom";
import { useCrudible } from 'shared';
import AppTemplate from '../../components/AppTemplate';

export default function SDO_DashboardRoute( {sdo} ) {

    const location = useLocation();
    const isMainRoute = location.pathname === '/' + sdo.route_base;

    const { Crudible, Manager } = useCrudible();

    if( ! isMainRoute ) {
        return <Outlet />
    }

    return(
        <Crudible sdo={sdo}>
            <AppTemplate>
                <Manager />
            </AppTemplate>
        </Crudible>
    );

}