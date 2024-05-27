import { createContext, useState, useContext, useEffect, useRef } from 'react';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    keepPreviousData,
} from '@tanstack/react-query';
import { ScreenWrap } from 'shared';
import { SkeletonList } from 'shared';
import { useFieldArray } from 'react-hook-form';
import { useFormManager } from '../../lib/useFormManager/useFormManager';
import { useFieldGroupRender } from '../../lib/useFieldGroupRender/useFieldGroupRender';
import { useStandardAPI } from 'shared';

const FieldArrayContext = createContext();
const queryClient = new QueryClient();

export function useRecordRelate( RecordRelateContext ) {

    function RecordRelateProviders({children, fieldName, sdo}) {

        return (
            <RecordRelateProvider
                fieldName={fieldName}
                sdo={sdo}
            >
                <QueryClientProvider client={queryClient}>
                    <FieldArrayProvider>
                        {children}
                    </FieldArrayProvider>
                </QueryClientProvider>
            </RecordRelateProvider>
        );

    }

    function RecordRelateProvider({children, fieldName, sdo}) {

        return (
            <RecordRelateContext.Provider value={{ fieldName, sdo }}>
                {children}
            </RecordRelateContext.Provider>
        );

    }

    function useRecordRelateContext() {
        return useContext(RecordRelateContext);
    }

    function FieldArrayProvider({ children }) {

        const { useFormContext } = useFormManager();
        const { control } = useFormContext();
        const { fieldName } = useRecordRelateContext();

        console.log("setting fieldName useFieldArray:")
        console.log(fieldName)

        const { fields, append, remove } = useFieldArray({
            control: control,
            name: fieldName,
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

        const { sdo } = useRecordRelateContext();
        const API = useStandardAPI(sdo.route_base);

        const { isLoading, data } = useQuery({
            queryKey: ['f3_sdo_query_' + sdo.route_base, sdo.route_base],
            queryFn: () => API.get(1),
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
            <div>
                <h2>Selection List {sdo.route_base} {API.route_base}</h2>
                <ul>
                    {data.records.map((record, index) => (
                        <li key={index}>
                            {record.id} <button onClick={() => addRecord(record)}>Add</button>
                        </li>
                    ))}
                </ul>
            </div>
        );

    }

    function InlineCreateForm( { fieldRegisterPrefix } ) {
        
        const { sdo } = useRecordRelateContext();
        const { FieldGroupRender } = useFieldGroupRender();

        return(
            <div className="flex gap-3 mb-2">
                {sdo.field_groups.map((fieldGroup, index) => (
                    <FieldGroupRender 
                        key={index}
                        fieldGroup={fieldGroup}
                        fieldRegisterPrefix={fieldRegisterPrefix}
                    />
                ))}
            </div>
        );

    }

    function RecordList() {

        const { useFieldArrayContext } = useRecordRelate();
        const { fieldName } = useRecordRelateContext();
        const { fields } = useFieldArrayContext(); 
        
        console.log('RecordList fields from useFieldArrayContext:');
        console.log(fields)
    
        return(
            <div className="p-6"> 
                {fields.map((field, index) => (
                    <InlineCreateForm 
                        key={field.id}
                        fieldRegisterPrefix={`${fieldName}.${index}`}
                    />
                ))} 
            </div>
        );

    }

    return {
        RecordRelateProviders,
        SelectionList,
        CreateButton,
        SelectExistingButton,
        RecordList,
        useFieldArrayContext,
        useRecordRelateContext, 
    };
}
