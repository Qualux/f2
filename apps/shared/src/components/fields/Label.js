export default function Label( {text, fieldName} ) {

    console.log('Rendering Label component...')
    
    return(
        <label htmlFor={fieldName} className="block text-sm font-medium leading-6 text-neutral-600">
            {text}
        </label>
    );

}