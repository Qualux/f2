import { useState } from 'react';
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useFieldType } from '../../lib/useFieldType';
import { useFetch } from '../../lib/useFetch';

const CancelButton = () => {
    return(
        <div className="mt-12">
            <NavLink
                to="/fields"
                className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                >
                Cancel
            </NavLink>
        </div>
    )
}

export default function FieldCreateForm({field, fieldLoaded}) {

    const [complete, setComplete] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const { fieldTypeList } = useFieldType();
    const { postData } = useFetch();

    const onSubmit = (data) => {

        const url = 'http://zero1.local/wp-json/zero/v1/field';
        postData(url, data).then((data) => {
            console.log(data);
            setComplete(true);
        });


    }

    console.log(watch("type")) // watch input value by passing the name of it

    if( complete ) {
        return(
            <main>
                Field created.
            </main>
        )
    }

    return(
        <main>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="hidden" value="0" />

                <div>
                    <label className="block">
                        Type
                    </label>
                    <select
                        className="w-64 border border-solid border-zinc-200"
                        {...register("type")}
                    >
                        {fieldTypeList.map( ( fieldType, index ) =>
                            <option key={index} value={fieldType.name}>
                                {fieldType.label}
                            </option> 
                        )}
                    </select>
                </div>

                <div className="my-4">
                    <label className="block">
                        Title
                    </label>
                    <input 
                        className="w-64 border border-solid border-zinc-200"
                        type="text"
                        placeholder="Field display title..."
                        {...register("title", { required: true })}
                    />
                    {errors.title && <span>Field title is required</span>}
                </div>

                <div className="my-4">
                    <label className="block">
                        Name
                    </label>
                    <input 
                        className="w-64 border border-solid border-zinc-200"
                        type="text"
                        placeholder="Field unique name..."
                        {...register("name", { required: true })}
                    />
                </div>

                <div className="my-4">
                    <label className="block">
                        Storage
                    </label>
                    <select 
                        className="w-64 border border-solid border-zinc-200"
                        {...register("storage", { required: true })}
                    >
                        <option value="post_meta">
                            Post Meta
                        </option>
                        <option value="option">
                            Option
                        </option>
                    </select>
                </div>
                
                <button 
                    className="bg-sky-700 text-white py-2 px-12 font-semibold hover:bg-sky-800"
                >
                    SAVE FIELD
                </button>
            </form>
            <CancelButton />
        </main>
    )
}