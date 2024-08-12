import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditableForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // New state to track update status

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`https://serverdb-047b.onrender.com/gasBookingForm/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
        navigate('/bookings/booking-list');
      }
    };

    fetchFormData();
  }, [id, navigate]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    name: formData.name || '',
    email: formData.email || '',
    phone: formData.phone || '',
    date: formData.date || '',
    timeSlot: formData.timeSlot || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    phone: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    timeSlot: Yup.string().required('Required'),
  });

  const onSubmit = async (values) => {
    setIsUpdating(true); // Set updating to true when update starts
    try {
      const response = await axios.put(`https://serverdb-047b.onrender.com/gasBookingForm/${id}`, values);
      console.log('Response data:', response.data);
      setTimeout(() => {
        navigate('/bookings/booking-list');
      }, 2000); // Delay the navigation by 2 seconds to show the acknowledgment message
    } catch (error) {
      console.error('Error during form update:', error);
      setIsUpdating(false); // Reset updating state if there's an error
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Edit Your Booking Slot</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
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

          <button type="submit" className="btn btn-primary">Update Slot</button>
        </Form>
      </Formik>

      {isUpdating && (
        <div className="alert alert-success mt-3">
          Your booking slot has been updated successfully. Redirecting to the booking list...
        </div>
      )}
    </div>
  );
};

export default EditableForm;
