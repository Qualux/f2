import { useParams } from 'react-router-dom';
import AppTemplate from '../../../components/global/AppTemplate';
import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import { TaxonomyAPI } from '../../../api/TaxonomyAPI';

export default function SDO_TaxonomyViewRoute() {

    const { id } = useParams();

    const { ViewScreen } = useCrudible({
        sdoKey: 'f3-taxonomy',
        recordId: id,
        api: TaxonomyAPI,
    });

    return(
        <AppTemplate>
            <ViewScreen />
        </AppTemplate>
    );

}