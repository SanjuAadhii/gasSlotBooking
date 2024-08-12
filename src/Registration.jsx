import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    phoneNo: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters long')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phoneNo: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log('Form data', values);
    try {
      const response = await axios.post('https://serverdb-047b.onrender.com/register', values); // Replace with your actual API endpoint
      console.log('Response data:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error during form submission:', error);
      
      if (error.response) {
        // Handle duplicate email error
        if (error.response.status === 400 && error.response.data.includes('duplicate key error')) {
          setErrors({ email: 'This email is already registered. Please use another one.' });
        } else {
          setErrors({ serverError: 'An unexpected error occurred. Please try again later.' });
        }
      }
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="container mt-5">
      <h1 className="text-center">Registration Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form className="border p-4 rounded shadow-sm">
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" className="form-control" autoComplete="username" />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" className="form-control" autoComplete="email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phoneNo">Phone Number</label>
              <Field type="text" id="phoneNo" name="phoneNo" className="form-control" autoComplete="tel" />
              <ErrorMessage name="phoneNo" component="div" className="text-danger" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" className="form-control" autoComplete="new-password" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" id="confirmPassword" name="confirmPassword" className="form-control" autoComplete="new-password" />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting || !formik.isValid}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
