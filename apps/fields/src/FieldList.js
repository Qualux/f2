import { useFieldCollection } from './lib/useFieldCollection';

function Field({field, index, setMode}) {
    return(
        <li className="flex gap-6">
            <h2 className="font-bold text-zinc-400 mb-6">
                {field.id}
            </h2>
            <h3>
                {field.type}
            </h3>
            <div>
                <button
                    className=""
                    onClick={() => { setMode('edit') }}
                >
                    EDIT
                </button>
            </div>
        </li>
    )
}

export default function FieldList({setMode}) {

    const { fields, isLoaded } = useFieldCollection();

    if( !isLoaded ) {
        return <main>Loading fields....</main>
    }

    return(
        <ul>
            {fields.map( ( field, index ) =>
                <Field key={index} field={field} index={index} setMode={setMode} />
            )}
        </ul>
    )

}