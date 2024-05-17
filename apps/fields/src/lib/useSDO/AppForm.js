import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import Field from '../../components/fields/Field';
import {
    useQuery
} from '@tanstack/react-query';

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

export default function AppForm( { sdo, postData, domain, api, recordId = 0 } ) {

    const { data, error, isLoading } = useQuery({
        queryKey: ['record', recordId],
        queryFn: () => api.getOne(recordId),
        enabled: !!recordId, // Only run query if recordId is available
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm();

    useEffect(() => {
        if (data) {
            console.log('Fetched record:', data);
            reset(data.record); // Reset the form with the fetched data
        }
    }, [data, reset]);

    const onSubmit = (data) => {

        console.log('submit:')
        console.log(data)
        if( !recordId ) {
            postData(domain.api + '/f3/v1/' + sdo.routeBase, data).then((data) => {
                console.log(data)
            });
        } else {
            api.edit(recordId, data);
        }
        

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