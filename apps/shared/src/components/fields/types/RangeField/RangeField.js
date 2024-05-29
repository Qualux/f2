/*
 *
 * Range Field 
 * 
 * Base Type: single_value_field
 * 
 * Refactor Note: Needs extra properties to set min/max for the range, currently hardcoded as 0-100.
 * 
 */

import React, { useState, useEffect } from 'react';
import Label from '../../Label';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function RangeField({ field }) {
    const { makeValidationObject, useFormContext, useFieldRenderContext } = useFormManager();
    const { register, getFieldState, setValue, watch } = useFormContext();
    const validators = makeValidationObject(field);
    const fieldState = getFieldState(field.name);
    const fieldRenderData = useFieldRenderContext();
    const registerName = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${field.name}` : field.name;

    // Initialize state for the slider value
    const [sliderValue, setSliderValue] = useState(field.defaultValue || 0);

    // Register the field with React Hook Form
    const { ref } = register(registerName, validators);

    // Handle slider change
    const handleSliderChange = (value) => {
        setSliderValue(value);
        setValue(registerName, value);
    };

    return (
        <div className="my-4">
            <Label text={field.label} />
            <div className="flex justify-between mb-2">
                <span>{field.min || 0}</span>
                <span>{field.max || 100}</span>
            </div>
            <Slider
                ref={ref}
                min={field.min || 0}
                max={field.max || 100}
                step={field.step || 1}
                onChange={handleSliderChange}
                value={sliderValue}
            />
            <div className="text-center mt-2">{sliderValue}</div>
            {fieldState.invalid && <span className="text-rose-700 text-sm font-bold">Field has errors</span>}
        </div>
    );
}
