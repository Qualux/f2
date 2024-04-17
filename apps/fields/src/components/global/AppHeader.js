export default function AppHeader({title}) {
    return(
        <header className="flex items-center justify-between bg-sky-800 mb-6 text-zinc-200 font-semibold p-3">
            <div>
                {title}
            </div>
            <span>
                F2 | Fields and Forms 
            </span>
        </header>
    )
}