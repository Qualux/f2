import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';
import ScreenWrap from '../../../components/global/ScreenWrap';
import { OptionsPageAPI } from '../../../api/OptionsPageAPI';

export default function SDO_OptionsPageCreateRoute() {

    const { Crudible, HeaderSDO, AppForm } = useCrudible({
        sdoKey: 'f3-options-page'
    });

    return(
        <Crudible>
            <AppTemplate>
                <HeaderSDO mode="create" />
                <ScreenWrap>
                    <AppForm 
                        api={OptionsPageAPI} 
                    />
                </ScreenWrap> 
            </AppTemplate>
        </Crudible>
    );

}