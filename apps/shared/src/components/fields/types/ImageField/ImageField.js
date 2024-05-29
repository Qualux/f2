import React from 'react';
import Label from '../../Label';
import MediaUploader from '../../../global/MediaUploader';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';

export default function ImageField({ field }) {
    
    const { makeValidationObject, useFormContext, useFieldRenderContext } = useFormManager();
    const { register, setValue, getFieldState } = useFormContext();
    const fieldState = getFieldState(field.name);
    const fieldRenderData = useFieldRenderContext();
    const registerName = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${field.name}` : field.name;
    const validators = makeValidationObject(field);

    const handleSelect = (url) => {
        setValue(registerName, url, { shouldValidate: true });
    };

    return (
        <div className="my-4">
            <Label text={field.label} />
            <input
                className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                type="text"
                placeholder={field.placeholder}
                {...register(registerName, validators)}
            />
            <MediaUploader onSelect={handleSelect} />
            {fieldState.invalid && (
                <span className="text-rose-700 text-sm font-bold">{fieldState.error?.message || 'Field has errors'}</span>
            )}
        </div>
    );
}
