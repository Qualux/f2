import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';
import ScreenWrap from '../../../components/global/ScreenWrap';

export default function SDO_OptionsPageEditRoute() {

    const { HeaderSDO, AppForm } = useCrudible({
        sdoKey: 'f3-options-page'
    });

    return(
        <AppTemplate>
            <HeaderSDO mode="edit" />
            <ScreenWrap>
                <AppForm />
            </ScreenWrap> 
        </AppTemplate>
    );

}