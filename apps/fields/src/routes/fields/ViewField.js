import { useState } from 'react';
import FieldView from '../../components/fields/FieldView';
import { useParams, NavLink } from 'react-router-dom';
import { useField } from '../../lib/useField';

export default function ViewField() {

    const { fieldId } = useParams();
    const { field, isLoaded } = useField( fieldId );
    const [fieldValue, setFieldValue] = useState(null);

    return(
        <main>
            <FieldView field={field} fieldLoaded={isLoaded} fieldValue={fieldValue} setFieldValue={setFieldValue} />
            <NavLink
                to="/fields"
                className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                >
                Return to fields
            </NavLink>
        </main>
    )
}