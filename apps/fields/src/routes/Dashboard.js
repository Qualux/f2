import { useContext, Suspense } from 'react';
import { DomainContext } from '../contexts';
import AppTemplate from '../components/global/AppTemplate';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { FieldAPI } from '../api/FieldAPI';

// Create a client
const queryClient = new QueryClient();

export default function Dashboard() {

    const domain = useContext(DomainContext);

    return(
        <QueryClientProvider client={queryClient}>
            <AppTemplate title="Dashboard">
                <div className="grow max-w-3xl">
                    <section className="text-zinc-800">
                        <h2 className="font-bold text-xl mb-5">
                            Dashboard
                        </h2>
                    </section>
                </div>
                <ChildList />
            </AppTemplate>
        </QueryClientProvider>
    );

}

function ChildList() {

    const queryClient = useQueryClient()

    console.log('queryClient:')
    console.log(queryClient)

    const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

    if(query.status === 'pending') {
        return(
            <div>
                PENDING
            </div>
        )
    }

    console.log(query.data.data.fields)

    return(
        <main>
            <ul>{query.data.data.fields?.map((field) => <li key={field.id}>{field.field_title}</li>)}</ul>
        </main>
    )
}

function getTodos() {
    return FieldAPI.get();
}