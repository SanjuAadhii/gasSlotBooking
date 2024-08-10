// GasBookingForm.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addForm } from './formSlice';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const GasBookingForm = ({ userData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to track submission status
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    phone: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    timeSlot: Yup.string().required('Required'),
  });

  const onSubmit = async (values) => {
    if (!userData) {
      alert('You need to log in to submit this form.');
      navigate('/login');
      return;
    }

    setIsSubmitting(true); // Set submitting to true when submission starts
    const formWithId = { id: uuidv4(), ...values };
    dispatch(addForm(formWithId));
    console.log('Form data', formWithId);
    
    try {
      const response = await axios.post('http://localhost:3000/gasBookingForm', formWithId);
      console.log('Response data:', response.data);
      setTimeout(() => {
        navigate(`/viewBookedForm/${formWithId.id}`);
      }, 2000); // Delay the navigation by 2 seconds to show the acknowledgment message
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Fill the form to Book your slot</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <Field type="text" id="name" name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <Field type="email" id="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <Field type="text" id="phone" name="phone" className="form-control" />
            <ErrorMessage name="phone" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <Field type="date" id="date" name="date" className="form-control" />
            <ErrorMessage name="date" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="timeSlot" className="form-label">Time Slot</label>
            <Field as="select" id="timeSlot" name="timeSlot" className="form-select">
              <option value="">Select a time slot</option>
              <option value="morning">Morning (8 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
              <option value="evening">Evening (4 PM - 8 PM)</option>
            </Field>
            <ErrorMessage name="timeSlot" component="div" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary">Book Slot</button>
        </Form>
      </Formik>

      {isSubmitting && (
        <div className="alert alert-success mt-3">
          Thank you! Your form has been submitted. Redirecting to the next page...
        </div>
      )}
    </div>
  );
};

export default GasBookingForm;
