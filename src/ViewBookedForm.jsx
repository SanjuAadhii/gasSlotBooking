import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewBookedForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(`https://serverdb-047b.onrender.com/gasBookingForm/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError(err);
        console.error('Error fetching form data:', err);
      }
    };

    fetchFormData();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://serverdb-047b.onrender.com/gasBookingForm/${id}`);
      navigate('/bookings/booking-list');  // Redirect to booking list after deletion
    } catch (err) {
      setError(err);
      console.error('Error deleting booking:', err);
    }
  };

  if (error) {
    return <p>Error fetching form data: {error.message}</p>;
  }

  if (!formData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Gas Booking Form Data</h2>
      <div key={formData.id} className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{formData.name}</h5>
          <p className="card-text"><strong>Email:</strong> {formData.email}</p>
          <p className="card-text"><strong>Phone:</strong> {formData.phone}</p>
          <p className="card-text"><strong>Date:</strong> {formData.date}</p>
          <p className="card-text"><strong>Time Slot:</strong> {formData.timeSlot}</p>
          <Link to={`/editBookingForm/${formData.id}`} className="btn btn-warning me-2">Edit</Link>
          <button onClick={() => handleDelete(formData.id)} className="btn btn-danger">Delete</button>
        </div>
      </div>
      <div>
        <Link to="/bookings/booking-list"><button>Return to My Bookings</button></Link>
      </div>
    </div>
  );
};

export default ViewBookedForm;
