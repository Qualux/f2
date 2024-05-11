import { useCrudible } from '../../../lib/useCrudible/useCrudible';

export default function SDO_PostTypeCreateRoute() {

    const { Header, AppForm, sdoRoutes } = useCrudible({
        sdoKey: 'f2-post-type'
    });

    return(
        <main>
            <AppForm />
        </main>
    );

}