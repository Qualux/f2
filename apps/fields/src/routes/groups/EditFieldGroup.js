import FieldGroupForm from '../../components/groups/FieldGroupForm';
import { useParams } from 'react-router-dom';

export default function EditFieldGroup() {

    const { groupId } = useParams();

    return(
        <FieldGroupForm field={false} />
    )
}