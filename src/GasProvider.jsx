import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import GasBookingForm from './GasBookingForm';
import { useSelector } from 'react-redux';

function GasProvider({ data, userData }) {
  const { id } = useParams();
  const gasProvider = data.find(provider => provider.id === Number(id));

  if (!gasProvider) {
    return <div className="container my-5"><h2>Gas Provider not found.</h2></div>;
  }

  const formData = useSelector((state) => state.form.formData);

  return (
    <>
      <div className="container my-5">
        <div className="row">
          {/* Image Section */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div 
              className="w-100 h-100"
              style={{ 
                backgroundImage: `url(${gasProvider.Image})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                borderRadius: '8px',
                height: '400px'
              }}
            />
          </div>

          {/* Text Section */}
          <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
            <h1>{gasProvider.gasProviderName}</h1>
            <h3>Price: ${gasProvider.Price}</h3>
            <p><strong>Description:</strong> {gasProvider.description}</p>
          </div>
        </div>
      </div>

      <div className='container'>
        <GasBookingForm userData={userData} />
      </div>
    </>
  );
}

export default GasProvider;
