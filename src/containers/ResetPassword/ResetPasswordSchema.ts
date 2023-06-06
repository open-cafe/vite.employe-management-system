import * as yup from 'yup';

const schema = yup.object({
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().required('Please confirm your password'),
});

export default schema;
