import Label from '../../Label';

export default function ImageField( {field, register, errors} ) {

    return(
        <div className="my-4">
            <Label text={field.label} />
            <input 
                className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                type="text"
                placeholder={field.placeholder}
                {...register(field.name, { required: true })}
            />
            {errors[field.name] && <span className="text-rose-700 text-sm font-bold">Image field is required</span>}
        </div>
    );

}