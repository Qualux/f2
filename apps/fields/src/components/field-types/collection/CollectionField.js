import { useState } from 'react';

const AddScreen = ({ addItem }) => {
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

const ItemsList = ({ items, removeItem }) => {
    return (
        <div>
            {items.map((item, index) => (
                <div key={index} className="flex gap-6 items-center">
                    <span>{item.id}</span>
                    <span>{item.label}</span>
                    <button 
                        type="button"addItem
                        onClick={() => removeItem(index)}
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
};

export default function CollectionField({field, setValue}) {


    const [mode, setMode] = useState('view');
    const [items, setItems] = useState([]);

    const addItem = (newItem) => {
        setItems([...items, newItem]);
        setValue(field.name, [...items, newItem]);
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
        </main>
    )
}