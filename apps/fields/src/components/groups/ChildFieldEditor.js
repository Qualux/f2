import { useState, createContext } from 'react';
import Modal from '../Modal';
import FieldList from '../fields/FieldSelectionList';
import ChildFieldContext from './child-fields/ChildFieldContext';

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

export default function ChildFieldEditor({selectedChildIds, setSelectedChildIds}) {

    const [existingField, setExistingField] = useState(false);
    
    const handleSelectChild = (childId) => {
        setSelectedChildIds((prevIds) => [...prevIds, childId]);
    };
    
    const handleDeselectChild = (childId) => {
        setSelectedChildIds((prevIds) => prevIds.filter((id) => id !== childId));
    };

    return(
        <ChildFieldContext.Provider
            value={{
                selectedChildIds,
                handleSelectChild,
                handleDeselectChild,
            }}
        >
            <main>
                <h2>
                    Fields
                </h2>
                <div className="flex gap-6">
                    <button
                        onClick={ () => { setExistingField(true)} }
                    >
                        Existing Field
                    </button>
                    <button>
                        New Field
                    </button>
                </div>
                <div>
                    {existingField && <SelectExistingField open={existingField} setOpen={setExistingField} />}
                </div>
                <div>
                    <h4>Selected Fields</h4>
                    {selectedChildIds.map( ( fieldId, index ) =>
                        <main>{fieldId}</main>
                    )}
                </div>
            </main>
        </ChildFieldContext.Provider>
    )
}