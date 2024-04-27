import { useState, useEffect, useContext } from 'react';
import { useFieldGroup } from './lib/useFieldGroup';
import Field from './components/fields/Field';
import { useForm } from "react-hook-form";
import { useFetch } from './lib/useFetch';
import { DomainContext } from './contexts';

function domainContextValues() {

    let isLocal = false;
    if( window.location.hostname === 'localhost' ) {
      isLocal = true;
    }
  
    let url = window.location.origin;
    if( isLocal ) {
      url = 'http://ds.local/';
    } else {
      url = window.location.origin;
    }
  
    const val = {
      url,
      api: url + '/wp-json'
    }
  
    return val;
  
  }

const CompleteScreen = () => {

    return(
        <main>
            <h2>
                Congrats the form is saved.
            </h2>
            <p>
                Message here from response...
            </p>
        </main>
    )
}

function Render( {fieldGroupId} ) {

    console.log('Render running...')

    const [complete, setComplete] = useState(false);
    const { fieldGroup, isLoaded } = useFieldGroup( fieldGroupId, 'option' );
    const { postData } = useFetch();
    const domain = useContext(DomainContext);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue, 
        getValues,
    } = useForm();

    useEffect(() => {
        if (isLoaded && fieldGroup) {
            reset(fieldGroup.values);
        }
    }, [isLoaded, fieldGroup, reset]);

    useEffect(() => {

        if (window.wp !== 'undefined') {

            // @TODO replace save handling...

        }

    }, [window.wp]);

    if( complete ) {
        return <CompleteScreen />
    }

    if( !isLoaded ) {
        return(
            <main>Field group loading...</main>
        )
    }

    return(
        <main>
            <form>
                <div>
                    {fieldGroup.fields_numeric.map( ( field, index ) =>
                        <div key={index} className="my-6">
                            <Field 
                                field={field} 
                                register={register}
                                errors={errors} 
                            />
                        </div>
                    )}
                </div>
            </form>
        </main>
    )

}

export default function OptionsPageRenderApp( {fieldGroupId} ) {

    console.log('OptionsPageRenderApp running...')


    useEffect(() => {
        
    }, []);

    const domainContextValue = domainContextValues(); 

    return(
        <DomainContext.Provider value={domainContextValue}>
            <Render fieldGroupId={fieldGroupId} />
        </DomainContext.Provider>
    )

}