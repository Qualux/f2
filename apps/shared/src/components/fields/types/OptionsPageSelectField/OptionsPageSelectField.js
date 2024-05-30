/*
 *
 * Options Page Select Field
 * 
 * Renders an HTML5 select. Populates with list of all F3 Options Pages.
 *
 */

const { useEffect, useState } = wp.element;
import Label from '../../Label';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';
import { useStandardAPI } from '../../../../lib/useStandardAPI';

export default function OptionsPageSelectField({ field }) {

    const API = useStandardAPI('options-page');
    const { makeValidationObject, useFormContext, useFieldRenderContext } = useFormManager();
    const { register, getFieldState } = useFormContext();
    const validators = makeValidationObject(field);
    const fieldState = getFieldState( field.name );
    const fieldRenderData = useFieldRenderContext();
    const registerName = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${field.name}` : field.name;

    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        API.get()
            .then(queryResult => {

                const optionsArray = Object.entries(queryResult.records).map(([key, record]) => ({ value: record.id, label: record.title }));
                setOptions(optionsArray);
                setLoading(false);

            })
            .catch(error => {
                console.error('Error fetching options pages:', error);
                setLoading(false);
            });

    }, [API]);

    return (
        <div className="my-4">
            <Label text={field.label} />
            <select 
                id={field.name} 
                name={field.name} 
                disabled={loading} 
                className="w-full border border-solid border-zinc-300 rounded py-2 px-1 font-semibold text-lg"
                {...register(registerName, validators)}
            >
                {loading ? (
                    <option>Loading...</option>
                ) : (
                    options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                )}
            </select>
            {fieldState.invalid && <span className="text-rose-700 text-sm font-bold">{fieldState.error?.message || 'Field has errors'}</span>}
        </div>
    );
}
