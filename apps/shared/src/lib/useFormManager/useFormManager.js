import { createContext, useContext, useEffect, useState } from 'react';
import { useForm, useFormContext, FormProvider, useFieldArray } from 'react-hook-form';
import Field from '../../components/fields/Field';
import { checkConditions } from './conditionsChecker';
import { makeDefaultFieldValues } from './defaultValues';
import { useFieldRender } from '../useFieldRender/useFieldRender';

const FormManagerContext = createContext();
const FieldRenderContext = createContext( { registerPrefix: null } );

export function useFormManager() {

    function FormManagerProvider({ formData, children }) {

        const [formStatus, setFormStatus] = useState('loading');

        let defaultValues = formData.record || makeDefaultFieldValues(formData.form.field_groups);

        const methods = useForm({ defaultValues });

        const formSubmitHandler = (data) => {

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

        function render(fieldGroup, index) {

            if( fieldGroup?.repeat ) {
                return(
                    <FieldGroupRepeatRender
                        key={index}
                        fieldGroup={fieldGroup}
                    />
                );
            }

            return(
                <FieldGroupRender
                    key={index} 
                    fieldGroup={fieldGroup} 
                />
            );
        }

        return(  
            <section>
                {formData.form.field_groups.map((fieldGroup, index) => (
                    render(fieldGroup, index)
                ))}
            </section>
        );

    }

    function FieldGroupRender( { fieldGroup } ) {

        const { FieldRender } = useFieldRender();

        return(
            <div>
                {fieldGroup.fields.map((field, index) => (
                    <FieldRender key={index} field={field} />
                ))}
            </div>
        );

    }

    function FieldGroupRepeatRender( { fieldGroup } ) {

        const { control } = useFormContext();
        const { fields, append, remove, move } = useFieldArray({
            control,
            name: fieldGroup.name,
          });

        useEffect(() => {
            if (fields.length === 0) {
                append({}); // You can customize this with your default field structure
            }
        }, [fields, append]);

        return(
            <div>
                {fields.map((rhfField, rhfFieldIndex) => (
                    <RepeatRow 
                        key={rhfField.id}
                        fieldGroup={fieldGroup}
                        rhfField={rhfField}
                        rhfFieldIndex={rhfFieldIndex}
                        append={append}
                        remove={remove}
                        move={move}
                    />
                ))}
            </div>
        );

    }

    function RepeatRow( { fieldGroup, rhfFieldIndex, append, remove, move } ) { 

        const { FieldRender } = useFieldRender();

        function render( field, fieldIndex, rhfFieldIndex ) {

            const repeatField = { ...field, name: `${fieldGroup.name}.${rhfFieldIndex}.${field.name}` };

            return(
                <FieldRender
                    key={fieldIndex}
                    field={repeatField} 
                />
            );

        }

        return(
            <div className="flex gap-10"> 
                {fieldGroup.fields.map((field, fieldIndex) => (
                    render( field, fieldIndex, rhfFieldIndex )
                ))}
                <button 
                    type="button"
                    onClick={() => { move(rhfFieldIndex, rhfFieldIndex-1) }}
                >
                    UP
                </button>
                <button 
                    type="button"
                    onClick={() => { move(rhfFieldIndex, rhfFieldIndex+1) }}
                >
                    DOWN
                </button>
                <button 
                    type="button"
                    onClick={() => { append() }}
                >
                    ADD
                </button>
                <button 
                    type="button"
                    onClick={() => { remove(rhfFieldIndex) }}
                >
                    REMOVE
                </button>
            </div>
        );

    }

    function makeValidationObject( field ) {

        let validators = {}
        if( field.field_required ) {
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