import { useParams } from 'react-router-dom';
import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import AppTemplate from '../../../components/global/AppTemplate';
import ScreenWrap from '../../../components/global/ScreenWrap';
import { PostTypeAPI } from '../../../api/PostTypeAPI';

export default function SDO_PostTypeEditRoute() {

    const { id } = useParams();

    const { Crudible, HeaderSDO, AppForm } = useCrudible({
        sdoKey: 'f3-post-type'
    });

    return(
        <Crudible>
            <AppTemplate>
                <HeaderSDO mode="edit" />
                <ScreenWrap>
                    <AppForm 
                        recordId={id}
                        api={PostTypeAPI} 
                    />
                </ScreenWrap> 
            </AppTemplate>
        </Crudible>
    );

}