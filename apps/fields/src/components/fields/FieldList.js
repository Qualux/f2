import { useFieldCollection } from '../../lib/useFieldCollection';
import { NavLink } from "react-router-dom";

function EmptyMessage() {
    return(
        <p className="text-xl font-semibold text-zinc-500 bg-zinc-100 py-8 px-10 rounded">
            No field groups.
        </p>
    )
}

function Field({field, index}) {
    return(
        <li className="w-full flex justify-between gap-6 items-center bg-zinc-100 rounded py-1 px-2">
            <h2 className="basis-10 font-bold text-zinc-400 mb-6 !my-0">
                {field.id}
            </h2>
            <div>
                {field.title}
            </div>
            <div className="flex justify-end grow gap-6 items-center">
                <NavLink
                    to={`/fields/edit/${field.id}`}
                    className="font-bold text-zinc-100 bg-sky-800 py-2 px-6 rounded"
                    >
                    EDIT
                </NavLink>
                <NavLink
                    to={`/fields/delete/${field.id}`}
                    className="font-bold text-zinc-100 bg-sky-800 py-2 px-6 rounded"
                    >
                    DELETE
                </NavLink>
            </div>
        </li>
    )
}

export default function FieldList() {

    const { fields, isLoaded } = useFieldCollection();

    if( !isLoaded ) {
        return <main>Loading fields....</main>
    }

    return(
        <ul>
            {fields.map( ( field, index ) =>
                <Field key={index} field={field} index={index} />
            )}
        </ul>
    )

}