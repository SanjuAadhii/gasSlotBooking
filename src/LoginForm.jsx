import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUserData }) => {
  const navigate = useNavigate(); 

  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters long')
      .required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required')
  });

  const onSubmit = async (values) => {
    console.log('Form data', values);
    try {
      const response = await axios.post('http://localhost:3000/login', values);
      alert('Login successful');
      setUserData(response.data); // Set userData with the response data
      navigate("/"); 
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Login Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form className="border p-4 rounded shadow-sm">
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                className="form-control"
                autoComplete="username"
              />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="form-control"
                autoComplete="current-password"
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={!formik.isValid || formik.isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
