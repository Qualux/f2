import { NavLink } from "react-router-dom";

export default function CreateComplete({resetForm}) {

    return(
        <main>
            <h1 className="mb-6 text-zinc-500 text-xl font-bold">
                Create complete.
            </h1>
            <p className="text-zinc-500 text-lg">
                Processing response message...
            </p>
            <div className="flex gap-6 items-center">
                <button
                    type="button"
                    onClick={resetForm}
                >
                    Create another field group
                </button>
                <NavLink
                    to="/fields/edit/"
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Edit created field group
                </NavLink>
                <NavLink
                    to="/fields"
                    className="underline font-bold text-zinc-400 transition-colors hover:text-zinc-600"
                    >
                    Return to manage field groups
                </NavLink>
            </div>
        </main>
    );

}