import { useState } from 'react';

const Label = ({text}) => {
    return(
        <label className="block text-zinc-300 font-semibold text-sm mt-4 mb-1">
            {text}
        </label>
    )
}

const Input = ({placeholder, name, value, setFieldValue}) => {
    return(
        <input 
            className="border border-solid border-zinc-300 rounded py-2 px-2"
            name={name}
            id={name}
            type="text"
            placeholder={placeholder}
            value={value}
            onInput={(e) => {setFieldValue(e.target.value)}}
        />
    )
}

const SelectField = ({name, value}) => {
    return(
        <select 
            className="border border-solid border-zinc-300 rounded py-2 px-2"
            name={name}
            id={name}
            value={value}
        >
            <option>1</option>
            <option>2</option>
            <option>3</option>
        </select>
    )
}

const FieldType = ({field, fieldValue, setFieldValue}) => {

    if(field.type === 'text') {
        return(
            <Input name={field.name} placeholder="Enter first name..." value={fieldValue} setFieldValue={setFieldValue} />
        )
    }

    if(field.type === 'number') {
        return(
            <Input name={field.name} placeholder="Enter first name..." value={fieldValue} setFieldValue={setFieldValue} />
        )
    }

    if(field.type === 'select') {
        return(
            <SelectField name={field.name} value={fieldValue} setFieldValue={setFieldValue} />
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
        <div className="my-8">
            <h5 className="text-lg font-semibold text-zinc-700 mb-4">
                Field Value Preview
            </h5>
            <p className="text-zinc-300 text-sm">
                Enter values into the field to test it out. Values will not be saved.
            </p>
            <h4 className="text-2xl font-bold text-zinc-700">
                {renderValue()}
            </h4>
        </div>  
    );

}


export default function FieldView({field, fieldLoaded, fieldValue, setFieldValue}) {

    if( !fieldLoaded ) {
        return(
            <div>Field loading...</div>
        );
    }

    return(
        <div className="bg-zinc-100 p-12">
            <Label text="Field Label" />
            <FieldType field={field} fieldValue={fieldValue} setFieldValue={setFieldValue} />
            <FieldValue fieldValue={fieldValue} />
        </div>
    )

}