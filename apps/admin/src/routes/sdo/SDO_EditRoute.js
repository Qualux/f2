import { useParams } from 'react-router-dom';
import { useCrudible } from 'shared';
import AppTemplate from '../../components/AppTemplate';
import { ScreenWrap } from 'shared';

export default function SDO_EditRoute( {sdo} ) {

    const { id } = useParams();
    
    const { Crudible, Header, AppForm } = useCrudible();

    return(
        <Crudible sdo={sdo}>
            <AppTemplate>
                <Header />
                <ScreenWrap>
                    <AppForm recordId={id} />
                </ScreenWrap> 
            </AppTemplate>
        </Crudible>
    );

}