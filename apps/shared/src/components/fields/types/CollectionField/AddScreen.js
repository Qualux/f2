import { useState } from 'react';

export default function AddScreen({ addItem }) {

    const [itemId, setItemId] = useState('');
    const [itemLabel, setItemLabel] = useState('');

    const saveItemHandler = () => {
        addItem({ id: itemId, label: itemLabel });
        setItemId(''); // Clear the input after saving
        setItemLabel('');
    };

    return (
        <div>
            <h2>Add New Choice</h2>
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Value"
                        value={itemId}
                        onChange={(e) => setItemId(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Label"
                        value={itemLabel}
                        onChange={(e) => setItemLabel(e.target.value)}
                    />
                </div>
                <div>
                    <button type="button" onClick={saveItemHandler}>
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    );
};