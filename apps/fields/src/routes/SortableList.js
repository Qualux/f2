import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRecordRelate } from '../lib/useRecordRelate/useRecordRelate';

const SortableList = () => {

    const { 
        RecordRelateProviders, 
        SelectionList, 
        CreateButton,
        SelectExistingButton,
        RecordList,
    } = useRecordRelate();

    const formMethods = useForm();

    const onSubmit = (data) => {

    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                <RecordRelateProviders>
                    <main>
                        <div className="flex items-center gap-px">
                            <CreateButton />
                            <SelectExistingButton />
                        </div>
                        <section className="grid grid-cols-2 gap-px bg-neutral-800 text-neutral-100">
                            <SelectionList />
                            <RecordList />
                        </section>
                    </main>
                </RecordRelateProviders>
            </form>
        </FormProvider>
    );
};

export default SortableList;
