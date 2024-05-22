import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Field from '../../components/fields/Field';
import {
    useQuery
} from '@tanstack/react-query';
import { useCrudible } from './useCrudible';
import { SDO_StandardAPI } from '../../api/SDO_StandardAPI';

function FieldRenderer({field, watch, register, errors, setValue, value, control}) {

    const currentFormValues = watch();

    // Block rendering if conditions not met. 
    if( Object.hasOwn( field, 'field_conditions') && field.field_conditions === true ) {

        let conditionsCheckPassed = false;

        /* @param crg | Conditions Rule Group */
        if( Object.hasOwn( field, 'field_condition_rules') && field.field_condition_rules instanceof Array ) {

            field.field_condition_rules.forEach((crg, i) => {
                const cr = crg[0];
                const testFieldValue = watch(cr.field);

                if( cr.operator === '=' ) {
                    if( testFieldValue == cr.value ) {
                        conditionsCheckPassed = true;
                    } else {
                        console.log('conditions check failed')
                    }
                }

            }) 
        }

        if( ! conditionsCheckPassed ) {
            return null;
        } 

    }

    return(
        <div className="my-6">
            <Field 
                field={field} 
                register={register}
                errors={errors} 
                setValue={setValue}
                value={value}
                control={control}
            />
        </div>
    )
}

function getFieldValue(record, field) {
    return record && record.hasOwnProperty(field.field_name) ? record[field.field_name] : '';
}

function FieldGroup({ fieldGroup, watch, register, errors, setValue, record, control }) {

    console.log('record:')
    console.log(record)

    return (
        <div>
            {fieldGroup.fields.map((field, index) => (
                <FieldRenderer
                    key={index}
                    field={field}
                    watch={watch}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    value={getFieldValue(record, field)}
                    control={control}
                />
            ))}
        </div>
    );
}

function makeDefaultFieldValues(fields) {

    const defaultValues = {};

    fields.forEach(field => {
        const key = field.field_name;
        const value = field.field_default_value !== undefined ? field.field_default_value : null;
        defaultValues[key] = value;
    });

    return defaultValues;

}

export default function AppForm( { postData, domain, recordId = 0 } ) {

    const { useSDO } = useCrudible();
    const sdo = useSDO();

    // Setup API.
    const api = SDO_StandardAPI;
    api.routeBase = sdo.routeBase;

    const [formStatus, setFormStatus] = useState('loading');
    const [record, setRecord] = useState(false);

    const { data } = useQuery({
        queryKey: ['record', recordId],
        queryFn: () => api.getOne(recordId),
        enabled: !!recordId, // Only run query if recordId is available
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch,
        control,
    } = useForm();

    useEffect(() => {

        if( !recordId ) {
            const defaultValues = makeDefaultFieldValues( sdo.field_groups[0].fields ); 
            reset(defaultValues, { keepDirtyValues: true });
        }


        if (recordId && data) {
            const defaultValues = makeDefaultFieldValues( sdo.field_groups[0].fields ); 
            reset(data.record); // Reset the form with the fetched data
            setFormStatus('ready');
            setRecord(data.record);
        }

    }, [data, reset]);

    const onSubmit = (data) => {

        if( !recordId ) {
            postData(domain.api + '/f3/v1/' + sdo.routeBase, data).then((data) => {
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
                        record={record}
                        watch={watch}
                        register={register}
                        errors={errors}
                        setValue={setValue} 
                        control={control}
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