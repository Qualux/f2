import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';

export default function SDO_PostTypeEditRoute() {

    const { Header, AppForm } = useCrudible({
        sdoKey: 'f2-post-type'
    });

    return(
        <AppTemplate>
            <Header />
            <AppForm />
        </AppTemplate>
    );

}