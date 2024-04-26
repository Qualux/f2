import { useState } from 'react';
import Label from './Label';
import SelectField from './types/SelectField';
import Field from './Field';
import { useForm } from "react-hook-form";


const FieldValue = ({fieldValue}) => {

    const renderValue = () => {
        if(fieldValue) {
            return fieldValue;
        }
        return "NO VALUE";
    }

    return(
        <div className="my-12 shadow-xl p-8">
            <h5 className="text-xl font-bold text-zinc-700 mb-1">
                Field Value Preview
            </h5>
            <p className="text-zinc-500 text-lg">
                Enter values into the field to test it out. Values will not be saved.
            </p>
            <h4 className="mt-4 text-xl font-bold text-zinc-600">
                {renderValue()}
            </h4>
        </div>  
    );

}


export default function FieldView({field, fieldLoaded, fieldValue, setFieldValue}) {

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

    if( ! fieldLoaded ) {
        return(
            <div>Field loading...</div>
        );
    }

    return(
        <div className="bg-zinc-100 p-12">
            <Field 
                field={field} 
                register={register}
                errors={errors}
                fieldValue={fieldValue} 
                setFieldValue={setFieldValue}
                setValue={setValue}
                getValues={getValues}
                valuesInit={true} 
                control={control}
            />
            <FieldValue fieldValue={fieldValue} />
        </div>
    )

}