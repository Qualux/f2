import { useLocation, Outlet } from "react-router-dom";
import { useCrudible } from '../../lib/useCrudible/useCrudible';
import AppTemplate from '../../components/global/AppTemplate';

export default function SDO_DashboardRoute( {sdo} ) {

    const location = useLocation();
    const isMainRoute = location.pathname === '/' + sdo.routeBase;

    const { Crudible, Manager } = useCrudible();

    if( ! isMainRoute ) {
        return <Outlet />
    }

    return(
        <Crudible sdo={sdo}>
            <AppTemplate>
                <Manager 
                    sdoKey="f3-options-page"
                />
            </AppTemplate>
        </Crudible>
    );

}