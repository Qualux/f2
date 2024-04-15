import { useFieldGroup } from './lib/useFieldGroup';
import Field from './components/fields/Field';

export default function FieldGroupRenderApp() {

    const { fieldGroup, isLoaded } = useFieldGroup(218);

    if( !isLoaded ) {
        return(
            <main>Field group loading...</main>
        )
    }

    return(
        <main>
            {fieldGroup.id} {fieldGroup.title}
            <div>
                {fieldGroup.fields_numeric.map( ( field, index ) =>
                    <div className="my-6">
                        <Field field={field} />
                    </div>
                )}
            </div>
        </main>
    )

}