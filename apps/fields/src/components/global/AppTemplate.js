import AppHeader from './AppHeader';

export default function AppTemplate( {title, children} ) {

    return(
        <main className="w-full flex flex-col">
            <AppHeader title={title} />
            <div className="grow m-6">
                {children}
            </div>
            <footer>
                FOOTER
            </footer>
        </main>
    );

}