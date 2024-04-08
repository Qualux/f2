import { useParams } from 'react-router-dom';
import { useFieldGroup } from '../../lib/useFieldGroup';

export default function DeleteFieldGroup() {

    const { groupId } = useParams();
    const { fieldGroup, isLoaded, deleteFieldGroup } = useFieldGroup( groupId );

    const handleDelete = async () => {
        console.log('handle...')
        console.log(deleteFieldGroup)
        const resp = await deleteFieldGroup();
        console.log(resp)
    }

    return(
        <main>
            <button 
                className=""
                onClick={handleDelete}
            >
                CONFIRM DELETE
            </button>

        </main>
    )
}