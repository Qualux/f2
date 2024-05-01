import { useForm } from "react-hook-form";
import Field from '../fields/Field';
import { useFieldGroup } from '../../lib/useFieldGroup';

export default function Form() {

    const { fieldGroup, isLoaded } = useFieldGroup( '001', 0 );

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue, 
        getValues,
        control
    } = useForm();

    if( !isLoaded ) {
        return(
            <main>Field group loading...</main>
        )
    }

    return(
        <main>
            <form>
                <div>
                    {fieldGroup.fields_numeric.map( ( field, index ) =>
                        <div key={index} className="my-6">
                            <Field 
                                field={field} 
                                register={register}
                                errors={errors} 
                                getValues={getValues}
                                setValue={setValue}
                                control={control}
                            />
                        </div>
                    )}
                </div>
            </form>
        </main>
    );

}