import Label from '../../Label';
import Select from 'react-select';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';
import { Controller } from 'react-hook-form';

export default function SearchableSelectField( { field } ) {

    const { makeValidationObject, useFormContext, useFieldRenderContext } = useFormManager();
    const { control, register, getFieldState } = useFormContext();
    const validators = makeValidationObject( field );
    const fieldRenderData = useFieldRenderContext();
    const registerName = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${field.name}` : field.name;
    const fieldState = getFieldState( registerName ); 

    return(
        <div className="my-4">
            <Label text={field.label} />
            <Controller
                name={registerName}
                control={control}
                render={({ field: selectField }) => 
                    <Select 
                        {...selectField}
                        options={field.choices}
                    />
                }
            />
            {fieldState.invalid && <span className="text-rose-700 text-sm font-bold">Field has errors</span>}
        </div>
    );

}