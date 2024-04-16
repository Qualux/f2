import FieldGroupEditForm from '../../components/groups/FieldGroupEditForm';
import { useParams } from 'react-router-dom';
import { useFieldGroup } from '../../lib/useFieldGroup';

export default function EditFieldGroup() {

    const { groupId } = useParams();
    const { fieldGroup, isLoaded } = useFieldGroup( groupId, groupId );

    return(
        <FieldGroupEditForm fieldGroup={fieldGroup} fieldGroupLoaded={isLoaded} />
    )
}