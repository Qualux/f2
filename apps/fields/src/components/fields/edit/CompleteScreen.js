import { NavLink } from "react-router-dom";

export default function CompleteScreen({createdFieldData, resetForm}) {

    return(
        <main>
            <h2 className="font-bold text-2xl text-zinc-700">
                Congrats. The field was successfully edited.
            </h2>
            <p className="mt-4 mb-12 font-semibold text-xl text-zinc-700">
                {createdFieldData.message}
            </p>
            <div className="flex gap-6">
                <NavLink
                    to="/fields"
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Manage fields
                </NavLink>
                <button
                    onClick={resetForm}
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Continue editing
                </button>
            </div>
        </main>
    );
    
}