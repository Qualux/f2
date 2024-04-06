class ZeroSaveForm {

    constructor() {
        console.log(444444)
        this.form = document.getElementById('zero-form');
        console.log(this.form)
        this.saveButton = document.getElementById('zero-save-button');

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('saving form....')

            console.log('doc forms test:')
            const formData = new FormData( this.form );
            const values = {}
            for (var [key, value] of formData.entries()) { 
                console.log(key, value);
                const fieldName = key.replace('z-', '');
                values[fieldName] = value;
            }
            console.log(values)

        })
    }

}

const zeroSaveForm = new ZeroSaveForm();