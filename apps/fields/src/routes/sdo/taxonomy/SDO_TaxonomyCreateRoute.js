import { useCrudible } from '../../../lib/useCrudible/useCrudible';

export default function SDO_TaxonomyCreateRoute() {

    const { Header, AppForm, sdoRoutes } = useCrudible({
        sdoKey: 'f2-taxonomy'
    });

    return(
        <main>
            <AppForm />
        </main>
    );

}