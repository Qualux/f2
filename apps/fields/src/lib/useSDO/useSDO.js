import { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import systemSDO from '../../../../../data/system_sdos.json';
import Field from '../../components/fields/Field';
import systemFields from '../../data/system_fields.json';
import { DomainContext } from '../../contexts';
import { useFetch } from '../../lib/useFetch';

export function useSDO( sdoKey ) {

    const domain = useContext(DomainContext);
    const { postData } = useFetch();

    function getSystemSDO( SDO_Key ) {
        return systemSDO[ SDO_Key ];
    }
    const sdo = getSystemSDO( sdoKey );

    function AppForm() {

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

            console.log('submit:')
            console.log(data)
    
        }

        return(
            
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <input type="hidden" value={0} />

                <Field 
                    field={systemFields.field_group_title}
                    register={register}
                    errors={errors}
                />

                <div className="mt-6">
                    <button 
                        type="submit"
                        className="w-64 bg-sky-700 text-white py-2 px-12 font-semibold hover:bg-sky-800 rounded"
                    >
                        SAVE FORM
                    </button>
                </div>

            </form>

        );

    }

    return { sdo, AppForm }

}