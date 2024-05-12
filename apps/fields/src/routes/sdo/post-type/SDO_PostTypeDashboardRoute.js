import { useLocation, Outlet } from "react-router-dom";
import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';
import { PostTypeAPI } from '../../../api/PostTypeAPI';

export default function SDO_PostTypeDashboardRoute() {

    const location = useLocation();
    const isMainRoute = location.pathname === "/sdo/post-type";

    const { Crudible, Manager } = useCrudible({
        sdoKey: 'f2-post-type'
    });

    if( ! isMainRoute ) {
        return <Outlet />
    }

    return(
        <Crudible>
            <AppTemplate>
                <Manager 
                    sdoKey="f2-post-type"
                    api={PostTypeAPI}
                />
            </AppTemplate>
        </Crudible>
    );

}