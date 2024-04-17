export default function SelectField( {field} ) {

    return(
        <select 
            className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
            name={field.name}
            id={field.name}
            value={field.value}
        >
           {field.choices.map((choice, index) => (
                <option key={index} value={choice.value}>
                    {choice.label}
                </option>
            ))} 
        </select>
    );

}