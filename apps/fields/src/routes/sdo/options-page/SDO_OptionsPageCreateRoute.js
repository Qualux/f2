import { useCrudible } from '../../../lib/useCrudible/useCrudible';

export default function SDO_OptionsPageCreateRoute() {

    const { Header, AppForm, sdoRoutes } = useCrudible({
        sdoKey: 'f2-options-page'
    });

    return(
        <main>
            <AppForm />
        </main>
    );

}