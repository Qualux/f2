import { useContext, Suspense } from 'react';
import { DomainContext } from '../contexts';
import AppTemplate from '../components/global/AppTemplate';

export default function Dashboard() {

    const domain = useContext(DomainContext);

    return(
        <AppTemplate title="Dashboard">
            <div className="grow max-w-3xl">
                <section className="text-zinc-800">
                    <h2 className="font-bold text-xl mb-5">
                        Dashboard
                    </h2>
                </section>
            </div>
        </AppTemplate>
    );

}