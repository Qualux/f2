import { useLocation, Outlet } from "react-router-dom";
import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';
import { TaxonomyAPI } from '../../../api/TaxonomyAPI';

export default function SDO_TaxonomyDashboardRoute() {

    const location = useLocation();
    const isMainRoute = location.pathname === "/sdo/taxonomy";

    const { Crudible, Manager } = useCrudible({
        sdoKey: 'f2-taxonomy'
    });

    if( ! isMainRoute ) {
        return <Outlet />
    }

    return(
        <Crudible>
            <AppTemplate>
                <Manager 
                    sdoKey="f2-taxonomy"
                    api={TaxonomyAPI}
                />
            </AppTemplate>
        </Crudible>
    );

}