import { useFormContext, useFieldArray } from 'react-hook-form';
import { useFieldRender } from '../useFieldRender/useFieldRender';

export function useFieldGroupRender() {

    function FieldGroupRender( { fieldGroup, fieldRegisterPrefix = '' } ) {

        const { FieldRender } = useFieldRender();

        if( fieldGroup?.repeat ) {
            return(
                <FieldGroupRepeatRender
                    key={index}
                    fieldGroup={fieldGroup}
                />
            );
        }

        return(
            <div>
                {fieldGroup.fields.map((field, index) => (
                    <FieldRender
                        key={index}
                        field={field}
                        fieldRegisterPrefix={fieldRegisterPrefix}
                    />
                ))}
            </div>
        );

    }

    function FieldGroupRepeatRender( { fieldGroup } ) {

        const { control } = useFormContext();
        const { fields, append, remove, move } = useFieldArray({
            control,
            name: fieldGroup.name,
          });

        useEffect(() => {
            if (fields.length === 0) {
                append({});
            }
        }, [fields, append]);

        return(
            <div>
                {fields.map((rhfField, rhfFieldIndex) => (
                    <RepeatRow 
                        key={rhfField.id}
                        fieldGroup={fieldGroup}
                        rhfField={rhfField}
                        rhfFieldIndex={rhfFieldIndex}
                        append={append}
                        remove={remove}
                        move={move}
                    />
                ))}
            </div>
        );

    }

    function RepeatRow( { fieldGroup, rhfFieldIndex, append, remove, move } ) { 

        const { FieldRender } = useFieldRender();

        function render( field, fieldIndex, rhfFieldIndex ) {

            const repeatField = { ...field, name: `${fieldGroup.name}.${rhfFieldIndex}.${field.name}` };

            return(
                <FieldRender
                    key={fieldIndex}
                    field={repeatField} 
                />
            );

        }

        return(
            <div className="flex gap-10"> 
                {fieldGroup.fields.map((field, fieldIndex) => (
                    render( field, fieldIndex, rhfFieldIndex )
                ))}
                <button 
                    type="button"
                    onClick={() => { move(rhfFieldIndex, rhfFieldIndex-1) }}
                >
                    UP
                </button>
                <button 
                    type="button"
                    onClick={() => { move(rhfFieldIndex, rhfFieldIndex+1) }}
                >
                    DOWN
                </button>
                <button 
                    type="button"
                    onClick={() => { append() }}
                >
                    ADD
                </button>
                <button 
                    type="button"
                    onClick={() => { remove(rhfFieldIndex) }}
                >
                    REMOVE
                </button>
            </div>
        );

    }

    return{
        FieldGroupRender,
    }

}