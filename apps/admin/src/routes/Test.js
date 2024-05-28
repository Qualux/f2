import { useEffect, createContext, useContext } from 'react';
import { useForm, FormProvider, useFormContext, useFieldArray } from "react-hook-form";

const NestedFieldContext = createContext({registerPrefix: null});

export default function Test() {

    const methods = useForm()

    const onSubmit = (data) => console.log(data)

    return(
        <main className="p-10">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="grid gap-8">
                        <Field name="first_name" />
                        <NestedField name="hobbies" />
                        <div>
                            <input 
                                className="text-neutral-200 bg-neutral-800"
                                type="submit" 
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </main>
    );

}

function Field( {name} ) {

    const { registerPrefix } = useContext(NestedFieldContext);
    const registerName = registerPrefix ? registerPrefix + '.' + name : name;
    

    const { register } = useFormContext();

    return(
        <div>
            <input 
                className="border border-solid border-neutral-800" 
                placeholder="Field value..."
                {...register(registerName)} 
            />
        </div> 
    );

}

function NestedField( {name} ) {

    const { registerPrefix } = useContext(NestedFieldContext);
    const registerName = registerPrefix ? registerPrefix + '.' + name : name;

    const { control } = useFormContext();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: name,
      });

    useEffect(() => {
        if (fields.length === 0) {
            append({});
        }
    }, [append, fields.length]);

    return(
        <div>
            {fields.map((field, index) => (
                <NestedFieldContext.Provider 
                    key={field.id}
                    value={{registerPrefix: registerName + '.' + index}}
                >
                    <div className="flex gap-4 items-center">
                        <Field 
                            name="title" 
                        />
                        <DeepNestedField 
                            name="notes" 
                        />
                        <button
                            type="button"
                            onClick={() => append({})}
                            className="text-neutral-200 bg-neutral-800"
                        >
                            ADD
                        </button>
                    </div>
                    
                </NestedFieldContext.Provider>
            ))}
            
        </div> 
    );
    
}

function DeepNestedField( {name} ) {

    const { registerPrefix } = useContext(NestedFieldContext);
    const registerName = registerPrefix ? registerPrefix + '.' + name : name;

    const { control } = useFormContext();
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: registerName,
      });

    useEffect(() => {
        if (fields.length === 0) {
            append({});
        }
    }, [append, fields.length]);

    return(
        <div>
            {fields.map((field, index) => (
                <NestedFieldContext.Provider 
                    key={field.id}
                    value={{registerPrefix: registerName + '.' + index}}
                >
                    <div className="flex gap-4 items-center">
                        <Field 
                            name="notes" 
                        />
                        <button
                            type="button"
                            onClick={() => append({})}
                            className="text-neutral-200 bg-neutral-800"
                        >
                            ADD NOTES
                        </button>
                    </div>
                    
                </NestedFieldContext.Provider>
            ))}
            
        </div> 
    );

}