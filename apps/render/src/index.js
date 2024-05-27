const { render } = wp.element;
import { useFormManager, Field } from 'shared';
import { interceptTaxonomyFormSubmission } from './utils/interceptTaxonomyFormSubmission';

const formData = {
  form: {
      field_groups: [
          {
              name: 'fg1',
              fields: [
                  {
                      field_name: 'test_field_1',
                      field_type: 'text',
                      field_placeholder: 'Test field 1...',
                      field_default_value: 'Ten 10',
                      field_required: true,
                  },
                  {
                      field_name: 'test_field_2',
                      field_type: 'text',
                      field_placeholder: 'Test field 2...',
                      field_default_value: 'Seven 7',
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

  const { FormProvider, Form, Fields, SubmitButton, FormComplete } = useFormManager();

  const validateFormData = () => {
        // Implement your validation logic here
        // Return true if validation passes, false otherwise
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