import { useLocation, Outlet } from "react-router-dom";
import { useCrudible } from '../../lib/useCrudible/useCrudible';
import AppTemplate from '../../components/global/AppTemplate';
import { GridAPI } from '../../api/GridAPI';

export default function GridDashboard() {

    const location = useLocation();
    const isMainRoute = location.pathname === "/grids";

    const { Crudible, Manager } = useCrudible({
        sdoKey: 'f3-grid'
    });

    if( ! isMainRoute ) {
        return <Outlet />
    }

    return(
        <Crudible>
            <AppTemplate>
                <Manager 
                    sdoKey="f3-grid"
                    api={GridAPI}
                />
            </AppTemplate>
        </Crudible>
    );

}