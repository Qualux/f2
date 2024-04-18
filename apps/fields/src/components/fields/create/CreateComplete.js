import { NavLink } from "react-router-dom";

export default function CompleteScreen({createdFieldData, resetForm}) {

    const editLink = '/fields/edit/'+createdFieldData.field_id;

    return(
        <main>
            <h2 className="font-bold text-2xl text-zinc-700">
                Field Created!
            </h2>
            <p className="mt-4 mb-12 font-semibold text-xl text-zinc-700">
                {createdFieldData.message}
            </p>
            <div className="flex gap-6">
                <NavLink
                    to={editLink}
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Edit Field
                </NavLink>
                <button
                    onClick={resetForm}
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Make Another Field
                </button>
            </div>
        </main>
    );

}