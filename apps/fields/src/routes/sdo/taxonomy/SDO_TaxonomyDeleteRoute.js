import { useParams } from 'react-router-dom';
import AppTemplate from '../../../components/global/AppTemplate';
import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import { TaxonomyAPI } from '../../../api/TaxonomyAPI';

export default function SDO_TaxonomyDeleteRoute() {

    const { id } = useParams();

    const { DeleteScreen, sdo, sdoRoutes } = useCrudible({
        sdoKey: 'f3-taxonomy'
    });

    return(
        <AppTemplate>
            <DeleteScreen
                id={id}
                sdo={sdo}
                sdoRoutes={sdoRoutes}
                api={TaxonomyAPI}
            />
        </AppTemplate>
    );

}