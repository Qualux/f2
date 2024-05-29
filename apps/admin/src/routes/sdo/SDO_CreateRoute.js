import { NavLink } from 'react-router-dom';
import { useCrudible } from 'shared';
import AppTemplate from '../../components/AppTemplate';
import { ScreenWrap } from 'shared';

function CreateHeader() {

    const { Header, useSDO } = useCrudible();
    const sdo = useSDO();

    return(
        <Header 
            routeType="create"
            primaryLink={<NavLink to={sdo.routes.dashboard}>RETURN</NavLink>}
        />
    );

}

export default function SDO_CreateRoute( {sdo} ) {

    const { Crudible, AppForm } = useCrudible();

    return(
        <Crudible sdo={sdo}>
            <AppTemplate>
                <CreateHeader />
                <ScreenWrap>
                    <AppForm />
                </ScreenWrap> 
            </AppTemplate>
        </Crudible>
    );

}