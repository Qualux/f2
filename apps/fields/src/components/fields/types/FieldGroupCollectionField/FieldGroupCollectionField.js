import { useRecordRelate } from '../../../../lib/useRecordRelate/useRecordRelate';

export default function FieldGroupCollectionField() {

    const { 
        RecordRelateProviders, 
        SelectionList, 
        CreateButton,
        SelectExistingButton,
        RecordList,
    } = useRecordRelate();

    return(
        <main>
            <h2>Field Group Collection</h2>
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
        </main>
        
    );

}