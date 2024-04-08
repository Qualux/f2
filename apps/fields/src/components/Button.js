export default function Button( {label, handler} ) {
    return(
        <button 
            className="bg-sky-700 text-white py-2 px-12 font-semibold hover:bg-sky-800"
            onClick={handler}
        >
            {label}
        </button>
    )
}