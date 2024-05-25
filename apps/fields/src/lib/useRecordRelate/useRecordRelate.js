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
import { useFieldArray } from 'react-hook-form';
import { useFormManager } from '../../lib/useFormManager/useFormManager';

const sdo = {
    routeBase: 'field-group',
};

const FieldArrayContext = createContext();
const queryClient = new QueryClient();

export function useRecordRelate() {

    function RecordRelateProviders({children}) {

        return (
            <QueryClientProvider client={queryClient}>
                <FieldArrayProvider>
                    {children}
                </FieldArrayProvider>
            </QueryClientProvider>
        );

    }

    function FieldArrayProvider({ children }) {

        const { useFormContext } = useFormManager();
        const { control } = useFormContext();

        const { fields, append, remove } = useFieldArray({
            control: control,
            name: 'records'
          });

        function addRecord(record) {
            append(
                {
                    id: record.id,
                    title: record?.title,
                }
            );
        }

        return (
            <FieldArrayContext.Provider value={{ fields, append, remove, addRecord }}>
                {children}
            </FieldArrayContext.Provider>
        );

    }

    function useFieldArrayContext() {
        return useContext(FieldArrayContext);
    }

    function CreateButton() {

        const { addRecord } = useFieldArrayContext();

        return (
            <button 
                type="button" 
                className="bg-neutral-800 py-4 px-12 text-neutral-100 font-semibold"
                onClick={() => addRecord({ id: 0, title: 'New record...' })}
            >
                CREATE
            </button>
        );
    }

    function SelectExistingButton() {
        return (
            <button type="button" className="bg-neutral-800 py-4 px-12 text-neutral-100 font-semibold">
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

        const { addRecord } = useFieldArrayContext();

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
                        {record.id} <button onClick={() => addRecord(record)}>Add</button>
                    </li>
                ))}
            </ul>
        );

    }

    function InlineCreateForm() {

        const { useFormContext } = useFormManager();
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

    function RecordList() {

        const { useFieldArrayContext } = useRecordRelate();
        const { fields } = useFieldArrayContext();

        const { useFormContext } = useFormManager();
        const { register  } = useFormContext();
    
        return(
            <div className="p-6"> 
                {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-3 mb-2">
                        <input
                            className="bg-neutral-700 text-neutral-200"
                            {...register(`records.${index}.id`)} 
                        />
                        <input
                            className="bg-neutral-700 text-neutral-200"
                            {...register(`records.${index}.title`)} 
                        />
                    </div>
                ))} 
            </div>
        )
    }

    return {
        RecordRelateProviders,
        SelectionList,
        CreateButton,
        SelectExistingButton,
        InlineCreateForm,
        useFieldArrayContext,
        RecordList,
    };
}
