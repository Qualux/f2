import { useParams } from 'react-router-dom';
import AppTemplate from '../../../components/global/AppTemplate';
import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import { OptionsPageAPI } from '../../../api/OptionsPageAPI';

export default function SDO_OptionsPageViewRoute() {

    const { id } = useParams();

    const { ViewScreen } = useCrudible({
        sdoKey: 'f3-options-page',
        recordId: id,
        api: OptionsPageAPI,
    });

    return(
        <AppTemplate>
            <ViewScreen />
        </AppTemplate>
    );

}