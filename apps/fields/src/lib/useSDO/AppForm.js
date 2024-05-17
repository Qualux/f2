import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import Field from '../../components/fields/Field';

function FieldGroup( { fieldGroup, register, errors, setValue } ) {

    return(
        <div>
            {fieldGroup.fields.map( ( field, index ) =>
                <div key={index} className="my-6">
                    <Field 
                        field={field} 
                        register={register}
                        errors={errors} 
                        setValue={setValue}
                    />
                </div>
            )}
        </div>
    );

}

export default function AppForm( { sdo, postData, domain, api, recordId } ) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm();

    useEffect(() => {
        
        //api.getOne()
        //reset 

        console.log('recordId:')
        console.log(recordId)

    }, []);

    const onSubmit = (data) => {

        console.log('submit:')
        console.log(data)
        postData(domain.api + '/f3/v1/' + sdo.routeBase, data).then((data) => {
            console.log(data)
        });

    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                {sdo.field_groups.map( ( fieldGroup, index ) =>
                    <FieldGroup 
                        key={index} 
                        fieldGroup={fieldGroup} 
                        register={register}
                        errors={errors}
                        setValue={setValue}
                    />
                )}
            </div>
            <button 
                className="bg-sky-700 text-white py-2 px-12 font-semibold hover:bg-sky-800"
            >
                SAVE FORM
            </button>
        </form>
    );

}