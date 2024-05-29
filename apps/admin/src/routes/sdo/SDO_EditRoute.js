import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useCrudible } from 'shared';
import AppTemplate from '../../components/AppTemplate';
import { ScreenWrap } from 'shared';

function EditHeader() {

    const { Header, useSDO } = useCrudible();
    const sdo = useSDO();

    return(
        <Header 
            routeType="edit"
            primaryLink={<NavLink to={sdo.routes.dashboard}>RETURN</NavLink>}
        />
    );

}

export default function SDO_EditRoute( {sdo} ) {

    const { id } = useParams();
    
    const { Crudible, AppForm } = useCrudible();

    return(
        <Crudible sdo={sdo}>
            <AppTemplate>
                <EditHeader />
                <ScreenWrap>
                    <AppForm recordId={id} />
                </ScreenWrap> 
            </AppTemplate>
        </Crudible>
    );

}