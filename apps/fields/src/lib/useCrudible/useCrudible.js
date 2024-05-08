import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import Header from './Header';
import Footer from './Footer';
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

    return { Crudible, Grid, SortableHeader, Pager, Header, Footer }

}