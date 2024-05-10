import AppTemplate from '../../components/global/AppTemplate';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useField } from '../../lib/useField';
import Button from '../../components/Button';
import { NavLink } from "react-router-dom";

export default function FormDeleteRoute() {

    const [ complete, setComplete ] = useState(false);
    const { fieldId } = useParams();
    const { field, isLoaded, deleteField } = useField( fieldId );

    const handleDelete = async () => {

        const resp = await deleteField();
        setComplete(true);

    }

    if( !isLoaded ) {
        return(
            <main>Loading field.</main>
        )
    }

    if(complete) {
        return(
            <AppTemplate title="Delete Field">
                <h2 className="font-bold text-zinc-700 text-2xl">
                    Field deleted!
                </h2>
                <div className="mt-12">
                    <NavLink
                        to="/fields"
                        className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                        >
                        Fields Dashboard
                    </NavLink>
                </div>
            </AppTemplate>
        )
    }

    return(
        <AppTemplate title="Delete Field">
            <p className="font-medium text-zinc-500">
                Are you sure you want to delete {field.title} with ID {field.id}?
            </p>
            <div className="mt-6">
                <Button 
                    label="Confirm Delete"
                    handler={handleDelete}
                />
            </div>
            <div className="mt-12">
                <NavLink
                    to="/fields"
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Cancel
                </NavLink>
            </div>
        </AppTemplate>
    );

}