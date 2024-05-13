import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';

export default function SDO_PostTypeEditRoute() {

    const { HeaderSDO, AppForm } = useCrudible({
        sdoKey: 'f2-post-type'
    });

    return(
        <AppTemplate>
            <HeaderSDO />
            <AppForm />
        </AppTemplate>
    );

}