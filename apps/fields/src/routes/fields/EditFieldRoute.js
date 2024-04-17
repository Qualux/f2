import { useState } from 'react';
import AppTemplate from '../../components/global/AppTemplate';
import FieldEditForm from '../../components/fields/FieldEditForm';
import FieldView from '../../components/fields/FieldView';
import { useParams } from 'react-router-dom';
import { useField } from '../../lib/useField';

export default function EditFieldRoute() {

    const { fieldId } = useParams();
    const { field, isLoaded } = useField( fieldId );
    const [fieldValue, setFieldValue] = useState(null);

    return(
        <AppTemplate title="Edit Field">
            <FieldEditForm field={field} fieldLoaded={isLoaded} />
        </AppTemplate>
        
    )
}