import { Form } from 'mobx-react-form';
import validator from './Validator';

const fields = [
  'name',
  'email',
  'password',
  'avatar'
];

const rules = {
  name: 'string|required',
  email: 'email|string|required',
  password: 'required|string|between:2,128',
  avatar: 'string'
};

const labels = {
  name: 'Name',
  email: 'Email',
  password: 'Password',
  avatar: 'Avatar'
};

const values = {
  name: '',
  email: '',
  password: '',
  avatar: '',
};

const types = {
  avatar: 'file'
}

export default function SignUpValidationForm() {
  class ValidationForm extends Form {
    plugins() {
      return { dvr: validator };
    }

    setup() {
      return { fields, rules, labels, values, types };
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

