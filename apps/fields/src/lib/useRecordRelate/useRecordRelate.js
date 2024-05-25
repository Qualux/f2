import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    keepPreviousData,
} from '@tanstack/react-query';
import { SDO_StandardAPI } from '../../api/SDO_StandardAPI';
import ScreenWrap from '../../components/global/ScreenWrap';
import SkeletonList from '../../components/global/SkeletonList';
import Sortable from 'sortablejs';
import { useFormContext } from 'react-hook-form';

const sdo = {
    routeBase: 'field-group',
};

const SelectedListContext = createContext();

export function useRecordRelate() {

    function RecordRelateProviders({children}) {
        const queryClient = new QueryClient();

        return (
            <QueryClientProvider client={queryClient}>
                <SelectedListProvider>
                    {children}
                </SelectedListProvider>
            </QueryClientProvider>
        );
    }

    function SelectedListProvider({ children }) {
        const [selectedList, setSelectedList] = useState([]);

        const addToSelectedList = (item) => {
            setSelectedList((prevList) => [...prevList, item]);
        };

        const removeFromSelectedList = (itemId) => {
            setSelectedList((prevList) => prevList.filter((item) => item.id !== itemId));
        };

        return (
            <SelectedListContext.Provider value={{ selectedList, addToSelectedList, removeFromSelectedList }}>
                {children}
            </SelectedListContext.Provider>
        );
    }

    function CreateButton() {
        return (
            <button className="bg-neutral-800 py-4 px-12 text-neutral-100 font-semibold">
                CREATE
            </button>
        );
    }

    function SelectExistingButton() {
        return (
            <button className="bg-neutral-800 py-4 px-12 text-neutral-100 font-semibold">
                SELECT EXISTING
            </button>
        );
    }

    function SelectionList() {
        const api = SDO_StandardAPI;
        api.routeBase = sdo.routeBase;

        const { isLoading, data } = useQuery({
            queryKey: ['f3_sdo_query_' + sdo.routeBase],
            queryFn: () => api.get(1),
            placeholderData: keepPreviousData,
        });

        const { addToSelectedList } = useContext(SelectedListContext);

        if (isLoading && !data || data === undefined) {
            return (
                <ScreenWrap>
                    <SkeletonList />
                </ScreenWrap>
            );
        }

        return (
            <ul>
                {data.records.map((record, index) => (
                    <li key={index}>
                        {record.id} <button onClick={() => addToSelectedList(record)}>Add</button>
                    </li>
                ))}
            </ul>
        );
    }

    function SelectedList() {
        const { selectedList, removeFromSelectedList } = useContext(SelectedListContext);
        const listRef = useRef(null);

        useEffect(() => {
            if (listRef.current) {
                const sortable = new Sortable(listRef.current, {
                    animation: 150,
                });

                return () => {
                    sortable.destroy();
                };
            }
        }, [selectedList]);

        return (
            <main className="bg-neutral-800 p-6">
                <h2 className="text-neutral-400 font-medium text-sm">
                    RELATED RECORDS
                </h2>
                <ul className="text-neutral-400 font-medium text-sm" ref={listRef}>
                    {selectedList.map((record, index) => (
                        <li key={index}>
                            {record.id} <button onClick={() => removeFromSelectedList(record.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </main>
        );
    }

    function InlineCreateForm() {

        const { register, formState: { errors } } = useFormContext();

        return(
            <div>
                <div>
                    <label className="block text-neutral-400 font-medium mb-1">Title</label>
                    <input
                        type="text"
                        className="border border-neutral-400 bg-neutral-800 text-neutral-200 text-sm px-2 py-1 rounded"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Submit
                    </button>
                </div>
            </div>
        );
    }

    return {
        RecordRelateProviders,
        SelectionList,
        SelectedList,
        CreateButton,
        SelectExistingButton,
        InlineCreateForm,
    };
}
