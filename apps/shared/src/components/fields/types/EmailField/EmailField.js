import Label from '../../Label';

export default function EmailField( {field, register, errors} ) {

    return(
        <div className="my-4">
            <Label text={field.label} />
            <input 
                className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                type="email"
                placeholder={field.placeholder}
                {...register(field.name, { required: true })}
            />
            {errors[field.name] && <span className="text-rose-700 text-sm font-bold">Field is required</span>}
        </div>
    );

}