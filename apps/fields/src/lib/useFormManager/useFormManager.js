import { createContext, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Field from '../../components/fields/Field';
import { checkConditions } from './conditionsChecker';

const FormContext = createContext();

export function useFormManager( params = {} ) {

    function FormProvider({ form, children }) {

        const {
            register,
            handleSubmit,
            formState: { errors },
            setValue,
            reset,
            watch,
            control,
        } = useForm();

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
            form,
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

        const { form } = useFormContext();

        return(  
            <main>
                <span>Fields</span>
                <span>{form.field_groups.length}</span>
                <FieldRenderer 
                    field={form.field_groups[0].fields[0]}
                />
            </main>
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

    return {
        useFormContext,
        FormProvider,
        Form,
        Fields,
        SubmitButton,
    }

}