import { useFieldRender } from '../useFieldRender/useFieldRender';

export function useFieldGroupRender() {

    function FieldGroupRender( { fieldGroup, fieldRegisterPrefix = '' } ) {

        const { FieldRender } = useFieldRender();

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
        )

    }

    return{
        FieldGroupRender,
    }

}