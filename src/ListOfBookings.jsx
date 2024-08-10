import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListOfBookings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/gasBookingForm');
        setFormData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (booking) => {
    navigate(`/editBookingForm/${booking.id}`, { state: { booking } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/gasBookingForm/${id}`);
      setFormData(formData.filter((booking) => booking.id !== id));
    } catch (err) {
      console.error('Error deleting booking:', err);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  if (!formData || formData.length === 0) {
    return <p>No bookings available</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between">
          <h1>Booking List</h1>
        </div>
      </div>
      <div className="row">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Provider Name</th>
              <th scope="col">Booked On</th>
              <th scope="col">View</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((booking, index) => (
              <tr key={booking._id}>
                <th scope="row">{index + 1}</th>
                <td>{booking.name}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>
                  <Link to={`/viewBookedForm/${booking.id}`}>
                    <button className="btn btn-info">View</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(booking)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListOfBookings;
