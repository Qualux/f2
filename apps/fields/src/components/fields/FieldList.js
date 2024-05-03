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
        <>
            <div className="font-medium text-xs text-zinc-800 px-2 py-1">
                {field.id}
            </div>
            <div className="font-medium text-xs px-2 py-1">
                {field.field_title}
            </div>
            <div className="font-medium text-xs px-2 py-1">
                {field.field_type}
            </div>
            <div className="flex justify-end grow gap-3 items-center">
                <NavLink
                    to={`/fields/view/${field.id}`}
                    className="font-semibold text-zinc-100 text-xs bg-neutral-900 py-1 px-6 rounded transition-colors hover:bg-sky-700"
                    >
                    VIEW
                </NavLink>
                <NavLink
                    to={`/fields/edit/${field.id}`}
                    className="font-semibold text-zinc-100 text-xs bg-neutral-900 py-1 px-6 rounded transition-colors hover:bg-sky-700"
                    >
                    EDIT
                </NavLink>
                <NavLink
                    to={`/fields/delete/${field.id}`}
                    className="font-semibold text-zinc-100 text-xs bg-neutral-900 py-1 px-6 rounded transition-colors hover:bg-sky-700"
                    >
                    DELETE
                </NavLink>
            </div>
        </>
    )
}

export default function FieldList() {

    const { fields, isLoaded } = useFieldCollection();

    if( !isLoaded ) {
        return <main>Loading fields....</main>
    }

    return(
        <div className="max-w-3xl grid grid-cols-4 gap-2">
            <div className="font-bold text-sm text-neutral-800 px-2 py-1">
                ID
            </div>
            <div className="font-bold text-sm text-neutral-800 px-2 py-1">
                Title
            </div>
            <div className="font-bold text-sm text-neutral-800 px-2 py-1">
                Type
            </div>
            <div>&nbsp;</div>
            {fields.map( ( field, index ) =>
                <Field key={index} field={field} index={index} />
            )}
        </div>
    )

}