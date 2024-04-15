export default function Field( {field, register} ) {

    switch( field.type ) {

        case 'text':
            return(
                <div className="my-4">
                    <label className="block mb-1 text-sm text-medium text-zinc-500">
                        {field.label} -- id: {field.id}
                    </label>
                    <input 
                        className="border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                        type="text"
                        placeholder={field.placeholder}
                        {...register(field.name, { required: true })}
                    />
                </div>
            );
            break;
        case 'select':
            return(
                <div className="my-4">
                    <label className="block mb-1 text-sm text-medium text-zinc-500">
                        {field.label} -- id: {field.id}
                    </label>
                    <select
                        className="border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                        {...register(field.name, { required: true })}
                    >
                        {field.choices.map((choice, index) => (
                            <option key={index} value={choice.value}>
                                {choice.label}
                            </option>
                        ))}
                    </select>
                </div>
            );
            break;
        default:
            return(
                'Invalid or missing field type.'
            )
            break;
    }

}