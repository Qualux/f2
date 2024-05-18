import { useParams } from 'react-router-dom';
import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';
import ScreenWrap from '../../../components/global/ScreenWrap';
import { TaxonomyAPI } from '../../../api/TaxonomyAPI';

export default function SDO_TaxonomyEditRoute() {

    const { id } = useParams();

    const { Crudible, HeaderSDO, AppForm } = useCrudible({
        sdoKey: 'f3-taxonomy'
    });

    return(
        <Crudible>
            <AppTemplate>
                <HeaderSDO mode="edit" />
                <ScreenWrap>
                    <AppForm 
                        recordId={id}
                        api={TaxonomyAPI}
                    />
                </ScreenWrap> 
            </AppTemplate>
        </Crudible>
    );

}