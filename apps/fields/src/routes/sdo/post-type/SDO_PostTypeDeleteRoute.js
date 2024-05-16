import { useParams } from 'react-router-dom';
import AppTemplate from '../../../components/global/AppTemplate';
import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import { PostTypeAPI } from '../../../api/PostTypeAPI';

export default function SDO_TaxonomyDeleteRoute() {

    const { id } = useParams();

    const { DeleteScreen, sdo, sdoRoutes } = useCrudible({
        sdoKey: 'f3-post-type'
    });

    return(
        <AppTemplate>
            <DeleteScreen
                id={id}
                sdo={sdo}
                sdoRoutes={sdoRoutes}
                api={PostTypeAPI}
            />
        </AppTemplate>
    );

}