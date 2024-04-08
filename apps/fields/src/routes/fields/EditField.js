import FieldForm from '../../components/fields/FieldForm';
import { useParams } from 'react-router-dom';
import { useField } from '../../lib/useField';

export default function EditField() {

    const { fieldId } = useParams();
    const { field, isLoaded } = useField( fieldId );

    return(
        <FieldForm field={field} fieldLoaded={isLoaded} />
    )
}