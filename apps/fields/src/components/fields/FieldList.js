import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import FieldListOutput from './field_list/FieldListOutput';

const queryClient = new QueryClient();

export default function FieldList() {
    return(
        <QueryClientProvider client={queryClient}>
            <FieldListOutput />
        </QueryClientProvider>
    );
}