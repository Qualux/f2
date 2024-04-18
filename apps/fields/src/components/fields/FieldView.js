import { useState } from 'react';
import Label from './Label';
import SelectField from './types/SelectField';
import Field from './Field';

const Input = ({placeholder, name, value, setFieldValue}) => {
    return(
        <input 
            className="w-full border border-solid border-zinc-300 rounded py-2 px-2"
            name={name}
            id={name}
            type="text"
            placeholder={placeholder}
            value={value}
            onInput={(e) => {setFieldValue(e.target.value)}}
        />
    )
}

const FieldType = ({field, fieldValue, setFieldValue}) => {

    if(field.type === 'text') {
        return(
            <Input name={field.name} placeholder={field.placeholder} value={fieldValue} setFieldValue={setFieldValue} />
        )
    }

    if(field.type === 'number') {
        return(
            <Input name={field.name} placeholder="Enter first name..." value={fieldValue} setFieldValue={setFieldValue} />
        )
    }

    if(field.type === 'select') {
        return(
            <SelectField field={field} />
        )
    }

}

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
    if( ! fieldLoaded ) {
        return(
            <div>Field loading...</div>
        );
    }

    return(
        <div className="bg-zinc-100 p-12">
            <Label text={field.label} />
            <FieldType field={field} fieldValue={fieldValue} setFieldValue={setFieldValue} />
            <FieldValue fieldValue={fieldValue} />
        </div>
    )

}