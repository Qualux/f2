import { useState } from 'react';
import { NavLink } from "react-router-dom";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { FieldAPI } from '../../api/FieldAPI';

const queryClient = new QueryClient();

function EmptyMessage() {
    return(
        <p className="text-xl font-semibold text-zinc-500 bg-zinc-100 py-8 px-10 rounded">
            No field groups.
        </p>
    )
}

function Field({field, index}) {

    /* Invalid field_type property. @TODO this property should be valid prior to response from API P/R. */
    if( field.field_type?.value ) {
        return null;
    }

    return(
        <>
            <div className="font-medium text-xs text-zinc-800 px-2 py-1">
                {field.id}
            </div>
            <div className="font-medium text-xs px-2 py-1">
                {field.field_title}
            </div>
            <div className="font-medium text-xs px-2 py-1">
                {field.field_type}
            </div>
            <div className="flex justify-end grow gap-3 items-center">
                <NavLink
                    to={`/fields/view/${field.id}`}
                    className="font-semibold text-zinc-100 text-xs bg-neutral-900 py-1 px-6 rounded transition-colors hover:bg-sky-700"
                    >
                    VIEW
                </NavLink>
                <NavLink
                    to={`/fields/edit/${field.id}`}
                    className="font-semibold text-zinc-100 text-xs bg-neutral-900 py-1 px-6 rounded transition-colors hover:bg-sky-700"
                    >
                    EDIT
                </NavLink>
                <NavLink
                    to={`/fields/delete/${field.id}`}
                    className="font-semibold text-zinc-100 text-xs bg-neutral-900 py-1 px-6 rounded transition-colors hover:bg-sky-700"
                    >
                    DELETE
                </NavLink>
            </div>
        </>
    );

}

function FieldListFilters() {

    return(
        <div className="my-8">
            <h5 className="text-xs mb-6">
                FILTER BY
            </h5>
            <div className="flex items-center justify-between">
                <div>
                    <h4>FIELD TYPE</h4>
                    <div className="flex gap-1 items-center">
                        <button>Text</button>
                        <button>Button Group</button>
                        <button>Number</button>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );

}

export default function FieldLIst() {
    return(
        <QueryClientProvider client={queryClient}>
            <FieldListOutput />
        </QueryClientProvider>
    );
}

function FieldListOutput() {

    const [page, setPage] = useState(1);

    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
    } = useQuery({
        queryKey: ['fields', page],
        queryFn: () => FieldAPI.get(page),
        keepPreviousData: true,
    });

    if (isLoading && !data) {
        return(
            <div>
                IS LOADING
            </div>
        )
    }

    return(
        <div className="max-w-3xl">
            <FieldListFilters />
            <div className="grid grid-cols-4 gap-2">
                <div className="font-bold text-sm text-neutral-800 px-2 py-1">
                    ID
                </div>
                <div className="font-bold text-sm text-neutral-800 px-2 py-1">
                    Title
                </div>
                <div className="font-bold text-sm text-neutral-800 px-2 py-1">
                    Type
                </div>
                <div>&nbsp;</div>
                {data.fields.map( ( field, index ) =>
                    <Field key={index} field={field} index={index} />
                )}
            </div>
            <Pager 
                pageCount={data.max_num_pages}
                page={page}
                setPage={setPage}
            />
            <div className="flex gap-6 text-xs text-neutral-400">
                <div>
                    Pages Found: {data.max_num_pages}
                </div>
                <div>
                    Total Records: {data.found_posts}
                </div>
            </div>
        </div>
    );

}

function PagerLink({ pageNum, handleClick, active }) {

    let classes = 'px-2 py-1 rounded-sm';
    if(active) {
        classes += ' bg-sky-200';
    } else {
        classes += ' cursor-pointer bg-neutral-200';
    }
    
    const handleClickWrapper = () => {
        handleClick(pageNum);
    };

    return (
        <li 
            className={classes}
            onClick={handleClickWrapper}
        >
           {pageNum}
        </li>
    );
}

function Pager({ pageCount, page, setPage }) {
    const handleClick = (pageNum) => {
        setPage(pageNum);
    };

    // Generate dynamic page links up to the pageCount
    const pageLinks = [];
    for (let i = 1; i <= pageCount; i++) {
        
        pageLinks.push(
            <PagerLink
                key={i}
                pageNum={i}
                handleClick={handleClick}
                active={i === page}
            />
        );
    }

    return (
        <main className="my-8 bg-neutral-100 p-6 flex justify-center">
            <ul className="flex items-center gap-1">
                {pageLinks}
            </ul>
        </main>
    );
}




/* 

PHP WP QUERY PAGING SUPPORT 

posts_per_page
"paged"



*/