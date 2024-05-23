import { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Field from '../../components/fields/Field';
import { checkConditions } from './conditionsChecker';
import { makeDefaultFieldValues } from './defaultValues';

const FormContext = createContext();

export function useFormManager( params = {} ) {

    function FormProvider({ formData, children }) {

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
        } = useForm( {defaultValues} );

        const formSubmitHandler = (data) => {

            console.log('Handling submit with formSubmitHandler in useFormManager')
            console.log('Form submit data:')
            console.log(data)

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

        return(  
            <section>
                {formData.form.field_groups.map((fieldGroup, index) => (
                    <FieldGroupRenderer key={index} fieldGroup={fieldGroup} />
                ))}
            </section>
        );

    }

    function FieldGroupRenderer( { fieldGroup } ) {
        return(
            <div>
                {fieldGroup.fields.map((field, index) => (
                    <FieldRenderer key={index} field={field} />
                ))}
            </div>
        )
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

    return {
        useFormContext,
        FormProvider,
        Form,
        Fields,
        SubmitButton,
    }

}