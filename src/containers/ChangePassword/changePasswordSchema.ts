import * as yup from 'yup';

const changePasswordSchema = yup.object({
  oldPassword: yup.string().when('newPassword', {
    is: (one: string) => one.length > 0,
    then: () => yup.string().required('Please enter old password'),
    otherwise: () => yup.string().optional(),
  }),
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
    .when('newPassword', {
      is: (password: string) => password.length > 0,
      then: () => yup.string().required('Please confirm your password'),
      otherwise: () => yup.string().optional(),
    }),
});

export default changePasswordSchema;
