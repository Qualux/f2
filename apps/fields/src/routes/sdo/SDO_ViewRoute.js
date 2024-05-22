import { useParams } from 'react-router-dom';
import AppTemplate from '../../components/global/AppTemplate';
import { useCrudible } from '../../lib/useCrudible/useCrudible';

export default function SDO_ViewRoute( {sdo} ) {

    const { id } = useParams();

    const { Crudible, Header, ViewScreen } = useCrudible();

    return(
        <Crudible sdo={sdo}>
            <AppTemplate>
                <Header />
                <ViewScreen id={id} />
            </AppTemplate>
        </Crudible>
    );

}