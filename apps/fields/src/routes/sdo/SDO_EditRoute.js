import { useParams } from 'react-router-dom';
import { useCrudible } from '../../lib/useCrudible/useCrudible';
import AppTemplate from '../../components/global/AppTemplate';
import ScreenWrap from '../../components/global/ScreenWrap';
import { OptionsPageAPI } from '../../api/OptionsPageAPI';

export default function SDO_OptionsPageEditRoute() {

    const { id } = useParams();
    
    const { Crudible, HeaderSDO, AppForm } = useCrudible({
        sdoKey: 'f3-options-page'
    });

    return(
        <Crudible>
            <AppTemplate>
                <HeaderSDO mode="edit" />
                <ScreenWrap>
                    <AppForm 
                        recordId={id}
                        api={OptionsPageAPI} 
                    />
                </ScreenWrap> 
            </AppTemplate>
        </Crudible>
    );

}