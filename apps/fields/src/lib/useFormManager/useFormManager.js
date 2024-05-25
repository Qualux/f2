import { createContext, useContext, useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Field from '../../components/fields/Field';
import { checkConditions } from './conditionsChecker';
import { makeDefaultFieldValues } from './defaultValues';

const FormContext = createContext();

export function useFormManager() {

    function FormProvider({ formData, children }) {

        const [formStatus, setFormStatus] = useState('loading');

        let defaultValues = {}
        if( formData.record ) {
            defaultValues = formData.record;
        } else {
            defaultValues = makeDefaultFieldValues( formData.form.field_groups );
        }

        const {
            register,
            handleSubmit,
            formState: { errors },
            setValue,
            reset,
            watch,
            control,
            getFieldState,
        } = useForm( {defaultValues} );

        const formSubmitHandler = (data) => {

            if( window.F3_NESTED_FORM_SUBMISSION ) {
                return;
            }

            if( !formData.record?.id ) {
                formData.api.create(data);
                setFormStatus('complete');
            } else {
                formData.api.edit(formData.record.id, data);
                setFormStatus('complete');
            }

        }

        const contextValues = {
            register, 
            handleSubmit, 
            errors, 
            setValue, 
            reset, 
            watch, 
            control,
            formSubmitHandler,
            formData,
            formStatus, 
            setFormStatus,
            getFieldState,
        }

        return (
            <FormContext.Provider value={contextValues}>
                {children}
            </FormContext.Provider>
        );

    }

    const useFormContext = () => {
        const context = useContext(FormContext);
        if (!context) {
            throw new Error('useFormContext must be used within a FormProvider');
        }
        return context;
    };

    function Form( {children} ) {

        const { handleSubmit, formSubmitHandler } = useFormContext();

        return(
            <form onSubmit={handleSubmit(formSubmitHandler)}>
                {children}
            </form>
        )
    }

    function SubmitButton() {
        return(
            <button className="border border-neutral-700">
                Submit
            </button>
        )
    }

    function Fields() {

        const { formData } = useFormContext();

        function render(fieldGroup, index) {

            if( fieldGroup.repeat ) {
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

        return(
            <div>
                {fieldGroup.fields.map((field, index) => (
                    <FieldRenderer key={index} field={field} />
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

        function render( field, fieldIndex, rhfFieldIndex ) {

            const repeatField = { ...field, field_name: `${fieldGroup.name}.${rhfFieldIndex}.${field.field_name}` };

            return(
                <FieldRenderer 
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

    function FieldRenderer( { field } ) {

        const { watch, register, errors, setValue, control } = useFormContext();
        const conditionsCheckPassed = checkConditions(field, watch);
    
        if (!conditionsCheckPassed) {
            return null;
        }
    
        return (
            <div className="my-6">
                <Field
                    field={field}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    control={control}
                />
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

        const { formStatus } = useFormContext();

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
        useFormContext,
        FormProvider,
        Form,
        Fields,
        Field,
        SubmitButton,
        makeValidationObject,
        FormComplete,
        checkConditions,
    }

}