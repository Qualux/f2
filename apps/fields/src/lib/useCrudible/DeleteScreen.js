import { useCrudible } from './useCrudible';

export default function DeleteScreen( {id, sdo, sdoRoutes, api} ) {

    const { Header } = useCrudible({
        sdoKey: 'f3-options-page'
    });

    const deleteHandler = async (e) => {
        try {
            await api.delete(id);
            console.log('Delete successful');
        } catch (error) {
            console.error('Delete failed:', error.message);
        }
    };

    return(
        <main className="max-w-3xl">
            <Header 
                to={sdoRoutes.create} 
                buttonLabel={sdo.create.button.label}
                title={sdo.displayTitle}
            />
            <h2 className="text-2xl font-bold mb-6">
                Confirm Deletion
            </h2>
            <button
                className="bg-neutral-700 text-neutral-100 font-bold text-lg"
                onClick={deleteHandler}
            >
                Delete
            </button>
        </main>
    );

}