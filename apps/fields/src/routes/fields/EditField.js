import { useState } from 'react';
import FieldForm from '../../components/fields/FieldForm';
import FieldView from '../../components/fields/FieldView';
import { useParams } from 'react-router-dom';
import { useField } from '../../lib/useField';

export default function EditField() {

    const { fieldId } = useParams();
    const { field, isLoaded } = useField( fieldId );
    const [fieldValue, setFieldValue] = useState(null);

    return(
        <main className="flex gap-8">
            <FieldForm field={field} fieldLoaded={isLoaded} />
            <FieldView 
                field={field} 
                fieldLoaded={isLoaded} 
                fieldValue={fieldValue}
                setFieldValue={setFieldValue}
            />
        </main>
        
    )
}