import { useState, createContext, useEffect } from 'react';
import Modal from '../Modal';
import FieldList from '../fields/FieldSelectionList';
import ChildFieldContext from './child-fields/ChildFieldContext';
import Label from '../fields/Label';

function SelectExistingField({open, setOpen}) {

    return(
        <Modal title="Select Existing Field" open={open} setOpen={setOpen}>
            <p>
                Select a field to add to the field group.
            </p>
            <FieldList setOpen={setOpen} />
        </Modal>
    )
}

export default function ChildFieldEditor({selectedChildIds, setSelectedChildIds, setValue}) {

    const [existingField, setExistingField] = useState(false);
    
    const handleSelectChild = (childId) => {
        setSelectedChildIds((prevIds) => [...prevIds, childId]);
    };
    
    const handleDeselectChild = (childId) => {
        setSelectedChildIds((prevIds) => prevIds.filter((id) => id !== childId));
    };

    useEffect(() => {
        setValue('fields', selectedChildIds);
    }, [setValue, selectedChildIds]);

    return(
        <ChildFieldContext.Provider
            value={{
                selectedChildIds,
                handleSelectChild,
                handleDeselectChild,
            }}
        >
            <main className="my-8">
                <Label text="Fields" />
                <div className="flex gap-6">
                    <button
                        className="bg-sky-700 text-white py-2 px-12 font-semibold hover:bg-sky-800"
                        type="button"
                        onClick={ () => { setExistingField(true)} }
                    >
                        Choose Field
                    </button>
                </div>
                <div>
                    {existingField && <SelectExistingField open={existingField} setOpen={setExistingField} />}
                </div>
                <div className="mt-6 shadow-lg p-8">
                    <h4 className="font-semibold text-zinc-600">
                        Selected Fields
                    </h4>
                    {selectedChildIds.map( ( fieldId, index ) =>
                        <main>{fieldId}</main>
                    )}
                </div>
            </main>
        </ChildFieldContext.Provider>
    )
}