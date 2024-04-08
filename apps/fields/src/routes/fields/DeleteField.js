import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useField } from '../../lib/useField';
import Button from '../../components/Button';

export default function DeleteField() {

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
            <main>
                Deleted!
            </main>
        )
    }

    return(
        <main>
            <h1 className="mt-8 font-bold text-lg text-zinc-300">
                Delete Field
            </h1>
            <p className="mt-8 mt-5 font-medium text-zinc-500">
                Are you sure you want to delete {field.title} with ID {field.id}?
            </p>
            <Button 
                label="Confirm Delete"
                handler={handleDelete}
            />
        </main>
    )
}