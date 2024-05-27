const { render } = wp.element;
import { useFormManager } from 'shared';
import { interceptTaxonomyFormSubmission } from './utils/interceptTaxonomyFormSubmission';

const formData = {
  form: {
      field_groups: [
          {
              name: 'fg1',
              fields: [
                  {
                      name: 'test_field_1',
                      type: 'text',
                      placeholder: 'Test field 1...',
                      default_value: 'Ten 10',
                      required: true,
                  },
                  {
                      name: 'test_field_2',
                      type: 'text',
                      placeholder: 'Test field 2...',
                      default_value: 'Seven 7',
                  }
              ],
              repeat: true,
          }
      ]
  },
  record: {
      id: 0,
      type: 'PostRecord',
      test_field_1: 'Thirteen 13',
      test_field_2: 'Fiver 55555',
  },
  api: {
    get: () => { console.log('API get() called.') },
    create: () => { console.log('API create() called.') },
  },
}

const FormRender = () => {

    const { 
        FormProvider, 
        Form, 
        Fields, 
        SubmitButton, 
        FormComplete 
    } = useFormManager();

    const validateFormData = () => {
        return false;
    };

    interceptTaxonomyFormSubmission(validateFormData);

    return(
        <FormProvider formData={formData}>
            <Form>
                <Fields />
                <SubmitButton />
            </Form>
            <FormComplete />
        </FormProvider>
    );

};

document.querySelectorAll('.f3-form').forEach(element => {
    render(<FormRender />, element);
});