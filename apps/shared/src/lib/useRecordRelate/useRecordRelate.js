import { createContext, useState, useContext, useEffect, useRef } from 'react';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
    keepPreviousData,
} from '@tanstack/react-query';
import ScreenWrap from '../../components/global/ScreenWrap';
import SkeletonList from '../../components/global/SkeletonList';
import Sortable from 'sortablejs';
import { useFieldArray } from 'react-hook-form';
import { useFormManager } from '../../lib/useFormManager/useFormManager';
import { useFieldGroupRender } from '../../lib/useFieldGroupRender/useFieldGroupRender';
import { useStandardAPI } from '../../lib/useStandardAPI';

const FieldArrayContext = createContext();
const queryClient = new QueryClient();

export function useRecordRelate() {

    const [mode, setMode]           = useState('create');
    const [activeRow, setActiveRow] = useState(null);

    function RecordRelateProviders({children, fieldName, sdo}) {

        return (
            <QueryClientProvider client={queryClient}>
                <FieldArrayProvider
                    fieldName={fieldName}
                    sdo={sdo}
                >
                    {children}
                </FieldArrayProvider>
            </QueryClientProvider>
        );

    }

    function FieldArrayProvider({ children, fieldName, sdo }) {

        const { useFormContext, useFieldRenderContext } = useFormManager();
        const { control } = useFormContext();

        const fieldRenderData = useFieldRenderContext();
        console.log('FieldArrayProvider:fieldName:', fieldName)
        const registerPrefix = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${fieldName}` : `${fieldName}`;

        const { fields, append, remove } = useFieldArray({
            control: control,
            name: registerPrefix,
          });

        function addRecord(record) {

            append(
                {
                    id: record.id,
                    recordId: record.id,
                    title: record?.title,
                }
            );
        }

        return (
            <FieldArrayContext.Provider value={{ fields, append, remove, addRecord, fieldName, sdo }}>
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
                className="bg-transparent border-0 cursor-pointer text-sm text-neutral-300 font-medium transition-colors hover:text-neutral-100"
                onClick={() => { 
                    addRecord(
                        { 
                            recordId: 0, 
                            title: 'New record...' 
                        }
                    );
                    setMode('create');
                }}
            >
                <span>
                    CREATE
                </span>
            </button>
        );
    }

    function SelectExistingButton() {
        return (
            <button 
                type="button" 
                className="bg-transparent border-0 cursor-pointer text-sm text-neutral-300 font-medium transition-colors hover:text-neutral-100"
                onClick={() => {
                    setMode('select');
                }}
            >
                SELECT EXISTING
            </button>
        );
    }

    function SelectionList() {

        if( mode === 'create' ) {
            return null;
        }

        const { sdo } = useFieldArrayContext();
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
            <div className="h-[400px] z-50 absolute left-0 top-0 right-0 bottom-0 p-6 bg-neutral-800/90">
                <header className="flex items-center justify-between bg-neutral-700 py-3 px-4">
                    <h2 className="m-0 font-medium text-sm leading-snug text-neutral-200">
                        Selection List
                    </h2>
                    <div
                        onClick={() => {
                            setMode('create');
                        }}
                        className="cursor-pointer py-2 px-4 text-neutral-400 transition-colors hover:text-neutral-200"
                    >
                        CLOSE
                    </div>
                </header>
                <div className="h-[300px]">
                    <ul className="overflow-auto h-full">
                        {data.records.map((record, index) => (
                            <li 
                                key={index}
                                onClick={() => {
                                    addRecord(record);
                                    setMode('create');
                                }}
                                className="cursor-pointer bg-neutral-800 rounded py-2 px-4 mb-2"
                            >
                                <span className="text-xl font-bold">
                                    #{record.id}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );

    }

    function RecordListHeader({ field, index }) {
        return (
            <header 
                className="cursor-pointer flex items-center gap-3 text-neutral-300 bg-white/10 px-4 py-2"
                onClick={() => {
                    setActiveRow(activeRow === index ? null : index);
                }}
            >
                {field.recordId &&
                    <span className="font-medium text-xs text-neutral-300">
                        {field.recordId}
                    </span>
                }
                <h2 className="font-medium text-xs text-neutral-300">
                    {field.title}
                </h2>
            </header>
        );
    }

    function InlineCreateForm( { field, index  } ) {
        
        const { sdo } = useFieldArrayContext();
        const { FieldGroupRender } = useFieldGroupRender();
        const { FieldRenderContext, useFieldRenderContext } = useFormManager();
        const { fieldName } = useFieldArrayContext();
        const fieldRenderData = useFieldRenderContext();

        console.log('InlineCreateForm: fieldName from useFieldArrayContext()', fieldName)
        console.log('fieldRenderData.registerPrefix:', fieldRenderData.registerPrefix)

        
        const newRegisterPrefix = fieldRenderData.registerPrefix ? `${fieldRenderData.registerPrefix}.${fieldName}.${index}` : `${fieldName}.${index}`;

        console.log('Setting newRegisterPrefix:', newRegisterPrefix)


        if( activeRow !== index ) {

            return null;

        }

        return(
            <FieldRenderContext.Provider value={{registerPrefix: newRegisterPrefix}}>
                <div className="flex gap-3 mb-2">
                    {sdo.field_groups.map((fieldGroup, index) => (
                        <FieldGroupRender 
                            key={index}
                            fieldGroup={fieldGroup}
                        />
                    ))}
                </div>
            </FieldRenderContext.Provider>
        );

    }

    function RecordListItem( { fieldName, index, field } ) {

        // Render existing item.
        if( field.recordId && activeRow === index ) {

            return(
                <section>
                    <RecordListHeader 
                        field={field}
                        index={index}
                    />
                    <main className="my-8 text-white">
                        <h3 className="font-bold text-xs text-white">
                            EXISTING RECORD
                        </h3>
                        <h2 className="font-bold text-xl text-white">
                            {field.recordId}
                        </h2>
                    </main>

                </section>
                
                
            );

        }

        if( field.recordId ) {

            return(
                <RecordListHeader 
                    field={field}
                    index={index}
                />
            );

        }

        return(
            <div>
                <RecordListHeader 
                    field={field}
                    index={index}
                />
                <InlineCreateForm 
                    field={field}
                    index={index}
                />
            </div> 
        );

    }

    function RecordList() {

        const { useFieldArrayContext } = useRecordRelate();
        const { fields, fieldName } = useFieldArrayContext();
    
        return(
            <div className="p-6 grid gap-2"> 
                {fields.map((field, index) => (
                    <RecordListItem
                        key={field.id}
                        fieldName={fieldName}
                        index={index}
                        field={field}
                    />
                ))} 
            </div>
        );

    }

    function ModeButtons( {children} ) {

        return(
            <div className="flex items-center justify-end gap-4 m-6">
                {children}
            </div>
        );

    }

    function Container( {children} ) {

        return(
            <div className="grid gap-2 p-4">
                {children}
            </div>
        );

    }

    function Body( {children} ) {

        return(
            <div className="relative">
                {children}
            </div>
        );

    }

    return {
        RecordRelateProviders,
        Container,
        Body,
        SelectionList,
        CreateButton,
        SelectExistingButton,
        RecordList,
        useFieldArrayContext,
        ModeButtons,
    };
}
