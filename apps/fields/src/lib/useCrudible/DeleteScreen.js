import { useState } from 'react';
import { useCrudible } from './useCrudible';
import { SDO_StandardAPI } from '../../api/SDO_StandardAPI';
import ScreenWrap from '../../components/global/ScreenWrap';


export default function DeleteScreen( {id} ) {

    const [status, setStatus] = useState('ready');
    const { Header, useSDO } = useCrudible();

    const sdo = useSDO();

    // Setup API.
    const api = SDO_StandardAPI;
    api.routeBase = sdo.routeBase;

    const deleteHandler = async (e) => {
        try {
            await api.delete(id);
            setStatus('done');
        } catch (error) {
            console.error('Delete failed:', error.message);
        }
    };

    if( status === 'done' ) {
        return(
            <main>
            <Header />
            <ScreenWrap>
                <p>
                    Record deleted.
                </p>
            </ScreenWrap>
        </main>
        )
    }

    return(
        <main>
            <Header />
            <ScreenWrap>
                <h2 className="text-2xl font-bold mb-6">
                    Confirm Deletion
                </h2>
                <button
                    className="bg-neutral-700 text-neutral-100 font-bold text-lg"
                    onClick={deleteHandler}
                >
                    Delete
                </button>
            </ScreenWrap>
        </main>
    );

}