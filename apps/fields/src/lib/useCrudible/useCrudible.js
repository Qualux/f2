import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import Header from './Header';
import Pager from './Pager';
import Grid from './Grid';
import SortableHeader from './SortableHeader';

export function useCrudible() {

    function Crudible({children}) {

        const queryClient = new QueryClient();

        return(
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );

    }

    function Footer({data}) {
        return(
            <div className="flex gap-6 text-xs text-neutral-400">
                <div>
                    Pages Found: {data.max_num_pages}
                </div>
                <div>
                    Total Records: {data.found_posts}
                </div>
            </div>
        )
    }


    return { Crudible, Grid, SortableHeader, Pager, Header, Footer }

}