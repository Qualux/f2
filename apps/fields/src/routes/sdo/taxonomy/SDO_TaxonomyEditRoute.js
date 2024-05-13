import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';

export default function SDO_TaxonomyEditRoute() {

    const { Header, AppForm } = useCrudible({
        sdoKey: 'f2-taxonomy'
    });

    return(
        <AppTemplate>
            <Header />
            <AppForm />
        </AppTemplate>
    );

}