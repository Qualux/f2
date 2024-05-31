import AppFooter from './AppFooter';

export default function AppTemplate( { children } ) {

    return(
        <main className="w-full flex flex-col">
            <div className="grow">
                {children}
            </div>
            <AppFooter />
        </main>
    );

}