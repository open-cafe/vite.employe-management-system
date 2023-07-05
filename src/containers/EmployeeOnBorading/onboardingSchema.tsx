import * as yup from 'yup';

const schema = yup.object({
  employeeName: yup.string().required('Employee name is required'),
  phoneNumber: yup
    .string()
    .required('Please enter phone number')
    .matches(/^\+97798\d{8}$/, 'Please enter valid phone number')
    .min(14),
});

export default schema;
