import React from 'react';
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-dark text-white vh-100" style={{ width: "280px", position: "fixed", overflowY: "auto" }}>
      <div className="p-3">
        <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 text-white text-decoration-none">
          <svg className="bi me-2" width="40" height="32"></svg>
          <span className="fs-4">Gas Bookings</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/bookings/booking-list" className="nav-link active text-white" aria-current="page">
              <svg className="bi me-2" width="16" height="16"></svg>
              Manage Bookings
            </Link>
          </li>
        </ul>
        <hr />
       
        <div className="p-3 mb-3">  {/* Add mt-auto to push this section to the bottom */}
        <Link to="/" className="text-white text-decoration-none"><strong>Return to Home</strong></Link>
      </div>
      </div>
    </div>
  );
}

export default Sidebar;
