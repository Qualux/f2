import FieldGroupForm from '../../components/groups/FieldGroupForm';
import { useParams } from 'react-router-dom';
import { useFieldGroup } from '../../lib/useFieldGroup';

export default function EditFieldGroup() {

    const { groupId } = useParams();
    const { fieldGroup, isLoaded } = useFieldGroup( groupId );

    return(
        <FieldGroupForm fieldGroup={fieldGroup} fieldGroupLoaded={isLoaded} />
    )
}