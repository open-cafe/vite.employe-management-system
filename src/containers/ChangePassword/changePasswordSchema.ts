import * as yup from 'yup';

const changePasswordSchema = yup.object({
  oldPassword: yup.string().required('This field is required'),
  newPassword: yup
    .string()
    .required('Add your new password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password should have atleast 8 characters'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Your passwords do not match.')
    .required('Confirm your password'),
});

export default changePasswordSchema;
