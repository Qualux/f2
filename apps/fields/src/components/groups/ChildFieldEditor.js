import { useState } from 'react';
import Modal from '../Modal';
import FieldList from '../fields/FieldSelectionList';

function SelectExistingField({open, setOpen}) {
    return(
        <Modal title="Select Existing Field" open={open} setOpen={setOpen}>
            <p>
                Select a field to add to the field group.
            </p>
            <FieldList />
        </Modal>
    )
}

export default function ChildFieldEditor() {

    const [existingField, setExistingField] = useState(false);

    return(
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
            {existingField && <SelectExistingField open={existingField} setOpen={setExistingField} />}
        </main>
    )
}