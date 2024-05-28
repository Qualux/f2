export default function Label( {text, fieldName} ) {
    
    return(
        <label htmlFor={fieldName} className="block text-8xl font-medium leading-6 text-gray-900">
            {text}
        </label>
    );

}