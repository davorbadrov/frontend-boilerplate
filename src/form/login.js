import { Form } from 'mobx-react-form';
import validator from './Validator';

const fields = [
  'email',
  'password'
];

const rules = {
  email: 'email|string|required',
  password: 'required|string|between:2,128'
};

const labels = {
  email: 'Email',
  password: 'Password'
};

const values = {
  email: '',
  password: ''
};

// leave it as a function so options/overloads can be passed in
export default function LoginValidationForm() {
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

