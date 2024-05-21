import { useCrudible } from '../../lib/useCrudible/useCrudible';
import AppTemplate from '../../components/global/AppTemplate';
import ScreenWrap from '../../components/global/ScreenWrap';

export default function SDO_OptionsPageCreateRoute({sdo}) {

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