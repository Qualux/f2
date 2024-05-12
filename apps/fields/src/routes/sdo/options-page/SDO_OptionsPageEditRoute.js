import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';

export default function SDO_OptionsPageCreateRoute() {

    const { Header, AppForm } = useCrudible({
        sdoKey: 'f2-options-page'
    });

    return(
        <AppTemplate>
            <Header />
            <AppForm />
        </AppTemplate>
    );

}