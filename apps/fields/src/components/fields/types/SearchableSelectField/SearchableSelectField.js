import Label from '../../Label';
import Select from 'react-select';
import { Controller } from "react-hook-form";

export default function SearchableSelectField( {field, register, errors, control} ) {

    return(
        <div className="my-4">
            <Label text={field.field_label} />
            <Controller
                name={field.field_name}
                control={control}
                render={({ field: selectField }) => 
                    <Select 
                        {...selectField}
                        options={field.field_choices}
                    />
                }
            />
            {errors[field.field_name] && <span className="text-rose-700 text-sm font-bold">Field is required</span>}
        </div>
    );

}