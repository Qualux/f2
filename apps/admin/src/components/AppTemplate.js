import AppFooter from './AppFooter';

export default function AppTemplate( {title, children} ) {

    return(
        <main className="w-full flex flex-col">
            <div className="grow m-3">
                {children}
            </div>
            <AppFooter />
        </main>
    );

}