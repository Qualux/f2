import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';
import ScreenWrap from '../../../components/global/ScreenWrap';
import { PostTypeAPI } from '../../../api/PostTypeAPI';

export default function SDO_PostTypeCreateRoute() {

    const { Crudible, HeaderSDO, AppForm } = useCrudible({
        sdoKey: 'f3-post-type'
    });

    return(
        <Crudible>
            <AppTemplate>
                <HeaderSDO mode="create" />
                <ScreenWrap>
                    <AppForm 
                        api={PostTypeAPI} 
                    />
                </ScreenWrap> 
            </AppTemplate>
        </Crudible>
    );

}