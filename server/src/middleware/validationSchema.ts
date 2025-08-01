import * as yup from 'yup';

export const registerSchema = yup.object({
  name: yup.string().min(2).max(50).required('Name is required'),
  email: yup.string().email('Incorrect email').required('Email is required'),
  password: yup.string().min(1).required('Password is required'),
});