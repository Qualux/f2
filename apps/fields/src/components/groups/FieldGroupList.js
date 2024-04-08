import { useFieldGroupCollection } from '../../lib/useFieldGroupCollection';
import { NavLink } from "react-router-dom";

function EmptyMessage() {
    return(
        <p className="text-xl font-semibold text-zinc-500 bg-zinc-100 py-8 px-10 rounded">
            No field groups.
        </p>
    )
}

function FieldGroup({fieldGroup, index}) {
    return(
        <li className="w-full flex justify-between gap-6 items-center bg-zinc-100 rounded py-1 px-2">
            <h2 className="basis-10 font-bold text-zinc-400 mb-6 !my-0">
                {fieldGroup.id}
            </h2>
            <div>
                {fieldGroup.title}
            </div>
            <div className="flex justify-end grow gap-6 items-center">
                <NavLink
                    to={`/groups/edit/${fieldGroup.id}`}
                    className="font-bold text-zinc-100 bg-sky-800 py-2 px-6 rounded"
                    >
                    EDIT
                </NavLink>
                <NavLink
                    to={`/groups/delete/${fieldGroup.id}`}
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
        <ul className="flex flex-col gap-2 justify-stretch">
            {!fieldGroups.length && <EmptyMessage />}
            {fieldGroups.map( ( fieldGroup, index ) =>
                <FieldGroup key={index} fieldGroup={fieldGroup} index={index} setMode={setMode} />
            )}
        </ul>
    )

}