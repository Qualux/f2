import { NavLink } from "react-router-dom";

export default function CrudibleHeader({to, buttonLabel, title}) {

    return(
        <div className="flex mb-6 items-center justify-between">
            <div>
                <NavLink
                    to={to}
                    className="inline-block bg-neutral-700 text-neutral-200 text-sm py-1 px-4 font-medium rounded-sm shadow-md transition-transform hover:scale-110"
                    >
                    {buttonLabel}
                </NavLink>
            </div>
            <div className="flex gap-1 items-center">
                <svg className="w-5 h-5 stroke-neutral-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                <p className="text-neutral-300 font-semibold text-sm">
                    {title}
                </p>
            </div>
        </div>
    );

}