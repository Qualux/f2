import { useParams } from 'react-router-dom';
import AppTemplate from '../../components/global/AppTemplate';
import { useCrudible } from 'shared';

export default function SDO_DeleteRoute( {sdo} ) {

    const { id } = useParams();

    const { Crudible, DeleteScreen } = useCrudible();

    return(
        <Crudible sdo={sdo}>
            <AppTemplate>
                <DeleteScreen
                    id={id}
                />
            </AppTemplate>
        </Crudible>
    );

}