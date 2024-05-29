import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import Label from '../../Label';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TrueFalseField( { field } ) {

    const [enabled, setEnabled] = useState(false);

    const { makeValidationObject, useFormContext, useFieldRenderContext } = useFormManager();
    const { register, getFieldState } = useFormContext();
    const validators = makeValidationObject(field);
    const fieldState = getFieldState( field.name );
    const fieldRenderData = useFieldRenderContext();
    const registerName = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${field.name}` : field.name;

    const handleChange = ( newValue ) => {

        setEnabled( newValue );
        setValue( registerName, newValue );
    }

    return(
        <div className="my-4">
            <Label text={field.label} />
            <Switch
                checked={enabled}
                onChange={handleChange}
                className={classNames( enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2' )}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={classNames( enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out' )}
                />
            </Switch>
            {fieldState.invalid && <span className="text-rose-700 text-sm font-bold">Field has errors</span>}
         </div>
    );

}