import { useParams } from 'react-router-dom';
import AppTemplate from '../../../components/global/AppTemplate';
import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import { OptionsPageAPI } from '../../../api/OptionsPageAPI';

export default function SDO_OptionsPageDeleteRoute() {

    const { id } = useParams();

    const { Header, DeleteScreen, sdo, sdoRoutes } = useCrudible({
        sdoKey: 'f3-options-page'
    });

    return(
        <AppTemplate>
            <DeleteScreen
                id={id}
                sdo={sdo}
                sdoRoutes={sdoRoutes}
                api={OptionsPageAPI}
            />
        </AppTemplate>
    );

}