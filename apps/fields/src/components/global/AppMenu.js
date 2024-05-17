import { NavLink } from "react-router-dom";

const itemClasses = ({ isActive, isPending }) => {

    console.log(isActive)

    const base = "grow py-1 px-3 font-semibold text-sm"
    const extra = isPending ? "" : isActive ? "text-sky-200" : "!text-neutral-100 hover:text-neutral-200"
    return base + ' ' + extra;
}

export default function AppMenu() {

    return(
        <main className="">
            <ul className="w-48 gap-2 flex">
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
                <li className="flex items-center justify-stretch m-0">
                    <NavLink
                            to="/groups"
                            className={itemClasses}
                            >
                            GROUPS
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
            </ul>
        </main>   
    )
}