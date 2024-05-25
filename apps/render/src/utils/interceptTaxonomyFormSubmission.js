export function interceptTaxonomyFormSubmission(validationFunction) {
    
    function setupFormInterception() {

        const form = document.getElementById('addtag');

        console.log(form)

        console.log(jQuery)

        window.ajaxEnabled = false;
        jQuery.ajaxSetup({
            beforeSend: function(){ 
                return window.ajaxEnabled; 
            }
        });

        form.addEventListener('submit', (e) => {
            console.log('form is submitting...')
        })
        
    }
    

    document.addEventListener('DOMContentLoaded', setupFormInterception);
}
