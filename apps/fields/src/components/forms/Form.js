import { useCrudible } from '../../lib/useCrudible/useCrudible';

export default function Form() {

    const { Header, AppForm, sdo, sdoRoutes } = useCrudible({
        sdoKey: 'form'
    });

    return(
        <main>
            <Header
                title="F2 Form Manager"
                buttonLabel="Create Form"
                to={sdoRoutes.create}
            />
            <h1 className="mb-12 text-5xl text-neutral-700">
                {sdo.title}
            </h1>
            <AppForm />
            <div>
                <button className="flex flex-col justify-center items-center gap-8 bg-neutral-300 text-neutral-700 p-12">
                    <span className="text-5xl font-bold">
                        Create Field Group
                    </span>
                    <svg className="w-16 h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>

        </main>
    );

}