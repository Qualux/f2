import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useRecordRelate } from '../lib/useRecordRelate/useRecordRelate';

const SortableList = () => {
    const { 
        RecordRelateProviders, 
        SelectionList, 
        SelectedList,
        CreateButton,
        SelectExistingButton,
        InlineCreateForm,
    } = useRecordRelate();

    const formMethods = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <RecordRelateProviders>
            <main>
                <div className="flex items-center gap-px">
                    <CreateButton />
                    <SelectExistingButton />
                </div>
                <div>
                    <SelectionList />
                </div>
                <div>
                    <SelectedList />
                </div>
                <div>
                    <FormProvider {...formMethods}>
                        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                            <InlineCreateForm />
                        </form>
                    </FormProvider>
                </div>
            </main>
        </RecordRelateProviders>
    );
};

export default SortableList;
