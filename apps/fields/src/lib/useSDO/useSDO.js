import { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import systemSDO from '../../../../../data/system_sdos.json';
import Field from '../../components/fields/Field';
import { DomainContext } from '../../contexts';
import { useFetch } from '../../lib/useFetch';

export function useSDO( sdoKey ) {

    const domain = useContext(DomainContext);
    const { postData } = useFetch();

    function getSystemSDO( SDO_Key ) {
        return systemSDO[ SDO_Key ];
    }
    const sdo = getSystemSDO( sdoKey );

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

    function AppForm() {

        const sdo = getSystemSDO( sdoKey );

        const {
            register,
            handleSubmit,
            formState: { errors },
            setValue
        } = useForm();

        const onSubmit = (data) => {

            console.log('submit:')
            console.log(data)
            postData(domain.api + '/f2/v1/' + sdo.routeBase, data).then((data) => {
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

    return { sdo, AppForm }

}