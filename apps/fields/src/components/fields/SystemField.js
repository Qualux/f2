export default function SystemField({field, register, errors}) {

    switch( field.type ) {

        case 'text':
            return(
                <div className="my-4">
                    <label className="block mb-1 text-sm text-medium text-zinc-500">
                        {field.label}
                    </label>
                    <input 
                        className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                        type="text"
                        placeholder={field.placeholder}
                        {...register(field.name, { required: true })}
                    />
                    {errors[field.name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
                </div>
            );
            break;
        case 'select':
            return(
                <div className="my-4">
                    <label className="block mb-1 text-sm text-medium text-zinc-500">
                        {field.label}
                    </label>
                    <select
                        className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                        {...register(field.name, { required: true })}
                    >
                        {field.choices.map((choice, index) => (
                            <option key={index} value={choice.value}>
                                {choice.label}
                            </option>
                        ))}
                    </select>
                    {errors[field.name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
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