import { Form } from 'mobx-react-form';
import validator from './Validator';

const fields = [
  'name',
  'email',
  'password'
];

const rules = {
  name: 'string|required',
  email: 'email|string|required',
  password: 'required|string|between:2,128'
};

const labels = {
  name: 'Name',
  email: 'Email',
  password: 'Password'
};

const values = {
  name: '',
  email: '',
  password: ''
};

export default function SignUpValidationForm() {
  class ValidationForm extends Form {
    plugins() {
      return { dvr: validator };
    }

    setup() {
      return { fields, rules, labels, values };
    }

    options() {
      return {
        showErrorsOnBlur: true,
        showErrorsOnChange: true,
        showErrorsOnSubmit: true,
        validateOnChange: true,
        validationDebounceWait: 150
      };
    }
  }

  return new ValidationForm()
}

