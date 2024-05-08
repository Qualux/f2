import { useCrudible } from '../../../lib/useCrudible/useCrudible';
import FieldListOutput from './FieldListOutput';

export default function FieldList() {

    const { Crudible } = useCrudible();

    return(
        <Crudible>
            <FieldListOutput />
        </Crudible>
    );
}