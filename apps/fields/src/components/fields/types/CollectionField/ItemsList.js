export default function ItemsList({ items, removeItem }) {

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