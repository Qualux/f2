import { NavLink } from "react-router-dom";
import DeleteButton from './DeleteButton';

export default function Field({field, index}) {

    /* Invalid field_type property. @TODO this property should be valid prior to response from API P/R. */
    if( field.field_type?.value ) {
        return null;
    }

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
                <DeleteButton field={field} />
            </div>
        </>
    );

}