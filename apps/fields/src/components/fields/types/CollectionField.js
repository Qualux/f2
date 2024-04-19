import { useState, useEffect } from 'react';
import ItemsList from './CollectionField/ItemsList';
import AddScreen from './CollectionField/AddScreen';

export default function CollectionField({field, valuesInit, setValue, getValues, register, errors}) {

    const [mode, setMode] = useState('view');
    const [items, setItems] = useState([]);

    register( field.name, { required: 'Collection field is required.' } );

    useEffect(() => {

        if(valuesInit) {

            const collectionList = getValues( field.name );
            console.log('cl:')
            console.log(collectionList)
            if( typeof collectionList !== 'undefined' && collectionList.length ) {
                setItems( collectionList );
            }

        }

    }, [valuesInit])

    const addItem = (newItem) => {
        setItems([...items, newItem]);
        setValue(field.name, [...items, newItem], { shouldValidate: true });
    };

    const removeItem = (index) => {
        if (index < 0 || index >= items.length) {
            console.error('Invalid index for removing item.');
            return;
        }
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
        setValue(field.name, JSON.stringify(updatedItems));
    };

    const addChoiceHandler = () => {
        setMode('add');
    }

    return(
        <main className="my-6">
            <h2 className="font-semibold text-zinc-400">
                {field.title}
            </h2>
            <button
                type="button"
                className="bg-sky-700 rounded-lg py-2 px-8 text-zinc-100 transition-colors hover:bg-sky-800"
                onClick={addChoiceHandler}
            >
                ADD CHOICE
            </button>
            {mode === 'add' && <AddScreen addItem={addItem} />}
            <ItemsList items={items} removeItem={removeItem} />
            {errors[field.name] && <span className="text-rose-700 text-sm font-bold">Field is required</span>}
        </main>
    )
}