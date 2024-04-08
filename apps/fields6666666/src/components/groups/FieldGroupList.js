import { useFieldGroupCollection } from '../../lib/useFieldGroupCollection';
import { NavLink } from "react-router-dom";

function FieldGroup({fieldGroup, index, setMode}) {
    return(
        <li className="flex gap-6 items-center">
            <h2 className="font-bold text-zinc-400 mb-6 !my-0">
                {fieldGroup.id}
            </h2>
            <div className="flex gap-6 items-center">
                <NavLink
                    to="/groups/edit"
                    className="font-bold text-zinc-100 bg-sky-800 py-2 px-6 rounded"
                    >
                    EDIT
                </NavLink>
                <NavLink
                    to="/groups/delete"
                    className="font-bold text-zinc-100 bg-sky-800 py-2 px-6 rounded"
                    >
                    DELETE
                </NavLink>
            </div>
        </li>
    )
}

export default function FieldGroupList({setMode}) {

    const { fieldGroups, isLoaded } = useFieldGroupCollection();

    if( !isLoaded ) {
        return <main>Loading field groups....</main>
    }

    return(
        <ul>
            {fieldGroups.map( ( fieldGroup, index ) =>
                <FieldGroup key={index} fieldGroup={fieldGroup} index={index} setMode={setMode} />
            )}
        </ul>
    )

}