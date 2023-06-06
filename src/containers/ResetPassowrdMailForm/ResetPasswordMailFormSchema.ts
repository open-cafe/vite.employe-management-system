import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .email('invalid email format')
    .required('Email field is required'),
});

export default schema;
