import { useState } from 'react';
import { useCrudible } from './useCrudible';
import ScreenWrap from '../../components/global/ScreenWrap';

export default function DeleteScreen( {id, sdo, sdoRoutes, api} ) {

    const [status, setStatus] = useState('ready');

    const { Header } = useCrudible({
        sdoKey: 'f3-options-page'
    });

    const deleteHandler = async (e) => {
        try {
            await api.delete(id);
            console.log('Delete successful');
            setStatus('done');
        } catch (error) {
            console.error('Delete failed:', error.message);
        }
    };

    if( status === 'done' ) {
        return(
            <main>
            <Header 
                to={sdoRoutes.create} 
                buttonLabel={sdo.create.button.label}
                title={sdo.displayTitle}
            />
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
            <Header 
                to={sdoRoutes.create} 
                buttonLabel={sdo.create.button.label}
                title={sdo.displayTitle}
            />
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