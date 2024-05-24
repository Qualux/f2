export default function Button( {label, handler} ) {
    
    return(
        <button 
            className="bg-neutral-900 text-neutal-200 py-1 px-4 font-medium hover:bg-neutral-800"
            onClick={handler}
        >
            {label}
        </button>
    );

}