import * as yup from 'yup';

const schema = yup.object({
  newPassword: yup
    .string()
    .required('Password is required')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Please enter a valid password '
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Your passwords do not match.'),
});

export default schema;
