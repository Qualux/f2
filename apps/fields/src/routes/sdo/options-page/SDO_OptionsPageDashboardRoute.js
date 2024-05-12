import { useLocation, Outlet } from "react-router-dom";
import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';
import { OptionsPageAPI } from '../../../api/OptionsPageAPI';

export default function SDO_OptionsPageDashboardRoute() {

    const location = useLocation();
    const isMainRoute = location.pathname === "/sdo/options-page";

    const { Crudible, Manager } = useCrudible({
        sdoKey: 'f2-options-page'
    });

    if( ! isMainRoute ) {
        return <Outlet />
    }

    return(
        <Crudible>
            <AppTemplate>
                <Manager 
                    sdoKey="f2-options-page"
                    api={OptionsPageAPI}
                />
            </AppTemplate>
        </Crudible>
    );

}