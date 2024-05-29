/*
 * Collection Field
 *
 * Field Type Key: collection
 * 
 * Collection of arbitrary data that is not a specific object record.
 * Used to assign choices to choice F3 Fields.
 * 
 * Refactor Note
 * 2024-05-29: Should useFieldArray() hook instead of custom handler for adding rows.
 * 
 */

import { useState, useEffect } from 'react';
import ItemsList from './ItemsList';
import AddScreen from './AddScreen';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';

export default function CollectionField( { field } ) {

    const [mode, setMode] = useState('view');
    const [items, setItems] = useState([]);

    const { makeValidationObject, useFormContext, useFieldRenderContext } = useFormManager();
    const { register, getFieldState, getValues, setValue } = useFormContext();
    const validators = makeValidationObject(field);
    const fieldState = getFieldState( field.name );
    const fieldRenderData = useFieldRenderContext();
    const registerName = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${field.name}` : field.name;

    register( registerName, validators );

    useEffect(() => {

        const collectionList = getValues( field.name );
        if( typeof collectionList !== 'undefined' && collectionList !== null && collectionList.length ) {
            setItems( collectionList );
        }

    }, [])

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
            {fieldState.invalid && <span className="text-rose-700 text-sm font-bold">Field has errors</span>}
        </main>
    )
}