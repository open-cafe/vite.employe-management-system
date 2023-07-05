import * as yup from 'yup';

const addUserSchema = yup.object().shape({
  enteredEmail: yup.string().required('Email Address is required'),
  role: yup.string().when('enteredEmail', {
    is: (email: string) => email.length > 0,
    then: () => yup.string().required('Enter role'),
    otherwise: () => yup.string().optional(),
  }),
});

export default addUserSchema;
