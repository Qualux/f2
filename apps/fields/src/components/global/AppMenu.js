import { NavLink } from "react-router-dom";

const itemClasses = ({ isActive, isPending }) => {

    const base  = "grow py-0.5 px-3 font-semibold text-sm"
    const extra = isActive ? "text-neutral-500 border border-solid border-neutral-500" : "!text-neutral-100 hover:!text-neutral-300"
    return base + ' ' + extra;
}

export default function AppMenu() {

    return(
        <main className="">
            <ul className="gap-2 flex">
                <li className="flex items-center justify-stretch m-0">
                    <NavLink
                            to="/sdo"
                            className={itemClasses}
                            >
                            SDO
                    </NavLink>
                </li>
                <li className="flex items-center justify-stretch m-0">
                    <NavLink
                            to="/fields"
                            className={itemClasses}
                            >
                            FIELDS
                    </NavLink>
                </li>
                <li className="block flex items-center justify-stretch m-0">
                    <NavLink
                            to="/groups"
                            className={itemClasses}
                            >
                            FIELD GROUPS
                    </NavLink>
                </li>
                <li className="flex items-center justify-stretch m-0">
                    <NavLink
                            to="/forms"
                            className={itemClasses}
                            >
                            FORMS
                    </NavLink>
                </li>
                <li className="flex items-center justify-stretch m-0">
                    <NavLink
                            to="/grid"
                            className={itemClasses}
                            >
                            GRIDS
                    </NavLink>
                </li>
            </ul>
        </main>   
    )
}