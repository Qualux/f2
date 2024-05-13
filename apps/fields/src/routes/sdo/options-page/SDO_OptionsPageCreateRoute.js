import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';

export default function SDO_OptionsPageCreateRoute() {

    const { HeaderSDO, AppForm } = useCrudible({
        sdoKey: 'f2-options-page'
    });

    return(
        <AppTemplate>
            <HeaderSDO />
            <AppForm />
        </AppTemplate>
    );

}