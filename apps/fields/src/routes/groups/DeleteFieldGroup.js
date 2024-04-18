import { useState } from 'react';
import AppTemplate from '../../components/global/AppTemplate';
import { useParams } from 'react-router-dom';
import { useFieldGroup } from '../../lib/useFieldGroup';
import Button from '../../components/Button';

export default function DeleteFieldGroup() {

    const [ complete, setComplete ] = useState(false);
    const { groupId } = useParams();
    const { fieldGroup, isLoaded, deleteFieldGroup } = useFieldGroup( groupId );

    const handleDelete = async () => {

        const resp = await deleteFieldGroup();
        setComplete(true);

    }

    if( !isLoaded ) {
        return(
            <AppTemplate title="Field Group Manager">
                Loading field group.
            </AppTemplate>
        )
    }

    if(complete) {
        return(
            <AppTemplate title="Field Group Manager">
                Deleted!
            </AppTemplate>
        )
    }

    return(
        <AppTemplate title="Field Group Manager">
            <h1 className="mt-8 font-bold text-lg text-zinc-300">
                Delete Field Group
            </h1>
            <p className="mt-8 mt-5 font-medium text-zinc-500">
                Are you sure you want to delete {fieldGroup.title} with ID {fieldGroup.id}?
            </p>
            <Button 
                label="Confirm Delete"
                handler={handleDelete}
            />
        </AppTemplate>
    )
}