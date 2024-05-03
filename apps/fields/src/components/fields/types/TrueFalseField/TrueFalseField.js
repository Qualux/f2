import { useState } from 'react';
import { Switch } from '@headlessui/react';
import Label from '../../Label';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TrueFalseField( {field, register, errors, setValue} ) {

    const [enabled, setEnabled] = useState(false);

    const handleChange = ( value ) => {
        setEnabled( value );
        setValue( field.field_name, value );
    }

    return(
        <div className="my-4">
            <Label text={field.field_label} />
            <Switch
                checked={enabled}
                onChange={handleChange}
                className={classNames(
                enabled ? 'bg-indigo-600' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                )}
            >
                <span className="sr-only">Use setting</span>
                <span
                aria-hidden="true"
                className={classNames(
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
                />
            </Switch>
            {errors[field.field_name] && <span className="text-rose-700 text-sm font-bold">Field title is required</span>}
         </div>
    );

}