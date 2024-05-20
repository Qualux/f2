import { useCrudible } from '../../lib/useCrudible/useCrudible';
import AppTemplate from '../../components/global/AppTemplate';
import ScreenWrap from '../../components/global/ScreenWrap';
import { GridAPI } from '../../api/GridAPI';

export default function GridCreateRoute() {

    const { Crudible, HeaderSDO, AppForm } = useCrudible({
        sdoKey: 'f3-grid'
    });

    return(
        <Crudible>
            <AppTemplate>
                <HeaderSDO mode="create" />
                <ScreenWrap>
                    <AppForm 
                        api={GridAPI} 
                    />
                </ScreenWrap> 
            </AppTemplate>
        </Crudible>
    );

}