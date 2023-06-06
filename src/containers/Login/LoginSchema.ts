import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .email('invalid email format')
    .required('email is required'),
  password: yup
    .string()
    .required('Please enter password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ),
});

export default schema;
