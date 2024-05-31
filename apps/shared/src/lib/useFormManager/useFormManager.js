import { createContext, useContext, useEffect, useState } from 'react';
import { useForm, useFormContext, FormProvider, useFieldArray } from 'react-hook-form';
import Field from '../../components/fields/Field';
import { checkConditions } from './conditionsChecker';
import { makeDefaultFieldValues } from './defaultValues';
import { useFieldGroupRender } from '../useFieldGroupRender/useFieldGroupRender';

const FormManagerContext = createContext();
const FieldRenderContext = createContext( { registerPrefix: null } );

export function useFormManager() {

    function FormManagerProvider({ formData, children }) {

        const [formStatus, setFormStatus] = useState('loading');
        let defaultValues = formData.record || makeDefaultFieldValues(formData.form.field_groups);
        const methods = useForm({ defaultValues });

        const formSubmitHandler = (data) => {

            console.log('formSubmitHandler in useFormManager:')
            console.log(data)

            if( !formData.record?.id ) {
                formData.API.create(data);
                setFormStatus('complete');
            } else {
                formData.API.edit(formData.record.id, data);
                setFormStatus('complete');
            }

        }

        return (
            <FormManagerContext.Provider value={{ formStatus, setFormStatus, formData, formSubmitHandler }}>
                <FormProvider {...methods}>
                    {children}
                </FormProvider>
            </FormManagerContext.Provider>
        );

    }

    const useFormManagerContext = () => {
        const context = useContext(FormManagerContext);
        if (!context) {
            throw new Error('useFormManagerContext must be used within a FormManagerProvider');
        }
        return context;
    };
    
    const useFieldRenderContext = () => {
        return useContext(FieldRenderContext);
    };

    function Form( {children} ) {

        const { handleSubmit }      = useFormContext();
        const { formSubmitHandler } = useFormManagerContext();

        return(
            <form onSubmit={handleSubmit(formSubmitHandler)}>
                {children}
            </form>
        );

    }

    function SubmitButton() {
        
        return(
            <button className="border border-neutral-700">
                Submit
            </button>
        );

    }

    function Fields() {

        const { formData } = useFormManagerContext();
        const { FieldGroupRender } = useFieldGroupRender();

        return(  
            <section>
                {formData.form.field_groups.map((fieldGroup, index) => (      
                    <FieldGroupRender
                        key={index} 
                        fieldGroup={fieldGroup} 
                    />
                ))}
            </section>
        );

    }

    function makeValidationObject( field ) {

        let validators = {}
        if( field?.required ) {
            validators.required = true; 
        }
        return validators;

    }

    function FormComplete() {

        const { formStatus } = useFormManagerContext();

        if( formStatus !== 'complete' ) {
            return null;
        }

        return(
            <main>
                Form submission complete.
            </main>
        )
    }

    return {
        FormManagerProvider,
        useFormManagerContext,
        FieldRenderContext,
        useFieldRenderContext,
        useFormContext,
        Form,
        Fields,
        Field,
        SubmitButton,
        FormComplete,
        makeValidationObject,
        checkConditions,
    }

}