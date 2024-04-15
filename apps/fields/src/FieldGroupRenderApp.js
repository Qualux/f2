import { useState } from 'react';
import { useFieldGroup } from './lib/useFieldGroup';
import Field from './components/fields/Field';
import { useForm } from "react-hook-form";
import { useFetch } from './lib/useFetch';

const CompleteScreen = () => {

    return(
        <main>
            <h2>
                Congrats the form is saved.
            </h2>
            <p>
                Message here from response...
            </p>
        </main>
    )
}

export default function FieldGroupRenderApp( {fieldGroupId} ) {

    const [complete, setComplete] = useState(false);

    const { fieldGroup, isLoaded } = useFieldGroup( fieldGroupId );
    const { postData } = useFetch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue, 
        getValues,
    } = useForm();

    const onSubmit = (data) => {

        console.log('submit data:')
        console.log(data)

    }

    if( complete ) {
        return <CompleteScreen />
    }

    if( !isLoaded ) {
        return(
            <main>Field group loading...</main>
        )
    }

    return(
        <main>
            {fieldGroup.id} {fieldGroup.title}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {fieldGroup.fields_numeric.map( ( field, index ) =>
                        <div key={index} className="my-6">
                            <Field field={field} register={register} />
                        </div>
                    )}
                </div>
                <div>
                    <button 
                        className="bg-sky-700 text-white py-2 px-12 font-semibold hover:bg-sky-800"
                    >
                        SAVE FORM
                    </button>
                </div>
            </form>
        </main>
    )

}