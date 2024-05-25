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

function Render( {fieldGroupId, postId} ) {

    const [complete, setComplete] = useState(false);
    const { fieldGroup, isLoaded } = useFieldGroup( fieldGroupId, postId );
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

            window.wp.data.subscribe(function () {
                var isSavingPost = window.wp.data.select('core/editor').isSavingPost();
                var isAutosavingPost = window.wp.data.select('core/editor').isAutosavingPost();
                
                if (isSavingPost && !isAutosavingPost) {

                    let postId;
                    try {
                        if (window.wp !== 'undefined') {
                            const { select } = window.wp.data;
                            postId = select('core/editor').getCurrentPostId();
                        } else {
                            console.error('wp is undefined. Check if it is properly loaded in your environment.');
                        }
                    } catch (error) {
                        console.error('An error occurred while accessing wp:', error);
                    }

                    if (!postId) {
                        console.error('Error: Post ID not found.');
                        return;
                    }

                    const preparedData = {
                        post_id: postId,
                        values: getValues()
                    }

                    postData(`${domain.api}/f3/v1/field-group/values/${fieldGroupId}`, preparedData).then((data) => {
                        
                    });
                
                }
            });
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

export default function FieldGroupRenderApp( {fieldGroupId} ) {

    const [postId, setPostId] = useState(null);
    
    useEffect(() => {
        const interval = setInterval(() => {

            if( ! window.wp ) {
                return;
            }
            const id = window.wp.data.select('core/editor').getCurrentPostId();

            if (id) {
                clearInterval(interval); // Stop the interval
                setPostId(id);
            }
        }, 1000); // Check every second

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const domainContextValue = domainContextValues(); 

    if (!postId) {
        return (
            <main>Waiting for postId...</main>
        );
    }

    return(
        <DomainContext.Provider value={domainContextValue}>
            <Render fieldGroupId={fieldGroupId} postId={postId} />
        </DomainContext.Provider>
    )

}