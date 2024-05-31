import { createContext } from 'react';
import { useFormManager } from '../../../../lib/useFormManager/useFormManager';
import { useRecordRelate } from '../../../../lib/useRecordRelate/useRecordRelate';
import fieldSDO from '../../../../../../../data/sdo/field.json';

export default function FieldCollectionField( { field } ) {

    const { 
        RecordRelateProviders, 
        SelectionList, 
        CreateButton,
        SelectExistingButton,
        RecordList,
        ModeButtons,
        Container,
        Body,
    } = useRecordRelate();

    return(
        <main>
            
            <RecordRelateProviders
                fieldName={field.name}
                sdo={fieldSDO}
            >
                <Container>
                    <header>
                         <h2 className="text-neutral-500 font-medium text-base">
                            Fields
                        </h2>
                    </header>
                    <Body>
                        <SelectionList />
                        <RecordList />
                    </Body>
                    <ModeButtons>
                        <CreateButton />
                        <SelectExistingButton />
                    </ModeButtons>
                </Container>
            </RecordRelateProviders>
        </main>
    );

}