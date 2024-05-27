import { useParams } from 'react-router-dom';
import AppTemplate from '../../components/AppTemplate';
import { useCrudible } from 'shared';

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