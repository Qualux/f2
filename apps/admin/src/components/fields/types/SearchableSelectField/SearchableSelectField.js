import Label from '../../Label';
import Select from 'react-select';
import { Controller } from "react-hook-form";

export default function SearchableSelectField( {field, register, errors, control} ) {

    return(
        <div className="my-4">
            <Label text={field.label} />
            <Controller
                name={field.name}
                control={control}
                render={({ field: selectField }) => 
                    <Select 
                        {...selectField}
                        options={field.choices}
                    />
                }
            />
            {errors[field.name] && <span className="text-rose-700 text-sm font-bold">Field is required</span>}
        </div>
    );

}