/**
 * Will extend validator
 */
import validator from 'validatorjs';

const CLIENT_CONTACT_COUNT = 1;
const SUBINDUSTRY_COUNT = 1;
const TAG_COUNT = 3;

const rules = {
    tags: {
        function: values => {
            const isValid = values.length >= TAG_COUNT;
            return isValid;
        },
        message: `There need to be at least ${TAG_COUNT} tags selected.`
    },
    subIndustry: {
        function: values => values.length >= SUBINDUSTRY_COUNT,
        message: `There need to be at least ${SUBINDUSTRY_COUNT} subindustry selected.`
    },
    clientContact: {
      function: values => {
          const isValid = values.length >= CLIENT_CONTACT_COUNT;
          return isValid;
      },
      message: `Enter / select at least one client contact for the project.`
    },
    clientOffice: {
      function: values => {
          const isValid = values.id;
          return isValid;
      },
      message: 'Enter / select client office associated with the project.'
    }
};

var messages = validator.getMessages('en');
messages.required = ':attribute field is required.';
messages.required_if = ':attribute field is required.';
validator.setMessages('en', messages);

const enhancedValidator = {
    package: validator,
    extend: $validator => {
        Object.keys(rules).forEach(key => $validator.register(key, rules[key].function, rules[key].message));
    }
};

export default enhancedValidator;
