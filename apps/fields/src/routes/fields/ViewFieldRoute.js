import { useState } from 'react';
import AppTemplate from '../../components/global/AppTemplate';
import FieldView from '../../components/fields/FieldView';
import { useParams, NavLink } from 'react-router-dom';
import { useField } from '../../lib/useField';

export default function ViewFieldRoute() {

    const { fieldId } = useParams();
    const { field, isLoaded } = useField( fieldId );
    const [fieldValue, setFieldValue] = useState(null);

    return(
        <AppTemplate title="View Field">
            <FieldView field={field} fieldLoaded={isLoaded} fieldValue={fieldValue} setFieldValue={setFieldValue} />
            <NavLink
                to="/fields"
                className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                >
                Field Manager
            </NavLink>
        </AppTemplate>
    )
}