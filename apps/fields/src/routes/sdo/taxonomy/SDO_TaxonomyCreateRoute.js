import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';
import ScreenWrap from '../../../components/global/ScreenWrap';
import { TaxonomyAPI } from '../../../api/TaxonomyAPI';

export default function SDO_TaxonomyCreateRoute() {

    const { Crudible, HeaderSDO, AppForm } = useCrudible({
        sdoKey: 'f3-taxonomy'
    });

    return(
        <Crudible>
            <AppTemplate>
                <HeaderSDO mode="create" />
                <ScreenWrap>
                    <AppForm 
                        api={TaxonomyAPI} 
                    />
                </ScreenWrap> 
            </AppTemplate>
        </Crudible>
    );

}