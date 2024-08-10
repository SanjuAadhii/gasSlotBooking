import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar({userData,onSignOut}) {
  // State to track user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Book Your Gas</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            <Link className="nav-link" to="/bookings/booking-list">Bookings</Link>
            <Link className="nav-link" to="/contact">Contact</Link>
          </div>
          <div className="d-flex ms-auto">
            {userData ? (
              <button onClick={onSignOut} className="btn btn-outline-danger m-1">Sign Out</button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary m-1">Login</Link>
                <Link to="/register" className="btn btn-outline-success m-1">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
