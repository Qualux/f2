import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

export default function AppTemplate( {title, children} ) {

    return(
        <main className="w-full flex flex-col">
            <AppHeader title={title} />
            <div className="grow m-6">
                {children}
            </div>
            <AppFooter />
        </main>
    );

}