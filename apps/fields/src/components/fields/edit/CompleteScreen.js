import { NavLink } from "react-router-dom";

export default function CompleteScreen({createdFieldData, resetForm}) {

    return(
        <main>
            <h2>
                Congrats. The field was successfully edited.
            </h2>
            <p>
                {createdFieldData.message}
            </p>
            <div>
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