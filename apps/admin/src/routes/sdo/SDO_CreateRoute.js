import { useCrudible } from 'shared';
import AppTemplate from '../../components/global/AppTemplate';
import { ScreenWrap } from 'shared';

export default function SDO_CreateRoute({sdo}) {

    const { Crudible, Header, AppForm } = useCrudible();

    return(
        <Crudible sdo={sdo}>
            <AppTemplate>
                <Header />
                <ScreenWrap>
                    <AppForm />
                </ScreenWrap> 
            </AppTemplate>
        </Crudible>
    );

}