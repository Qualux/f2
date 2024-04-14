import { useState } from 'react';
import FieldEditForm from '../../components/fields/FieldEditForm';
import FieldView from '../../components/fields/FieldView';
import { useParams } from 'react-router-dom';
import { useField } from '../../lib/useField';

export default function EditFieldRoute() {

    const { fieldId } = useParams();
    const { field, isLoaded } = useField( fieldId );
    const [fieldValue, setFieldValue] = useState(null);

    return(
        <main className="flex gap-8">
            <FieldEditForm field={field} fieldLoaded={isLoaded} />
            <FieldView 
                field={field} 
                fieldLoaded={isLoaded} 
                fieldValue={fieldValue}
                setFieldValue={setFieldValue}
            />
        </main>
        
    )
}