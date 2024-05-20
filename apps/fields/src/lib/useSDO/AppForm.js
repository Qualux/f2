import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Field from '../../components/fields/Field';
import {
    useQuery
} from '@tanstack/react-query';

function FieldGroup( { fieldGroup, register, errors, setValue, record } ) {

    return(
        <div>
            {fieldGroup.fields.map( ( field, index ) =>
                <div key={index} className="my-6">
                    <Field 
                        field={field} 
                        register={register}
                        errors={errors} 
                        setValue={setValue}
                        value={record[field.field_name]}
                    />
                </div>
            )}
        </div>
    );

}

export default function AppForm( { sdo, postData, domain, api, recordId = 0 } ) {

    const [formStatus, setFormStatus] = useState('loading');
    const [record, setRecord] = useState(false);

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

        console.log('is useEffect running once in AppForm/create?')
        if( sdo.routeBase === 'sdo/options-page' ) {
            console.log('options appform detected!')
            const position_default = sdo.field_groups[0].fields[3].field_default_value;
            console.log(sdo.field_groups[0].fields)
            reset( sdo.field_groups[0].fields )
        }

        if (data) {
            console.log('Fetched record:', data);

            // @TODO parse sdo here and if value is undefined then set the value to the default before calling reset().
            if( sdo.routeBase === 'sdo/options-page' ) {
                console.log('options appform detected!')
                
            }

            reset(data.record); // Reset the form with the fetched data
            setFormStatus('ready');
            setRecord(data.record);
        }
    }, [data, reset]);

    const onSubmit = (data) => {

        console.log('submit:')
        console.log(data)
        if( !recordId ) {
            postData(domain.api + '/f3/v1/' + sdo.routeBase, data).then((data) => {
                console.log(data)
                setFormStatus('complete');
            });
        } else {
            api.edit(recordId, data);
            setFormStatus('complete');
        }
        

    }

    if( formStatus === 'complete' ) {
        return(
            <div>
                <p>
                    Operation completed successfully.
                </p>
            </div>

        );  
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
                        record={record}
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