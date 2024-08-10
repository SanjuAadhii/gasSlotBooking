import React from 'react'
import ListOfBookings from './ListOfBookings';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function Bookings() {
    return (
        <>
        <div className='row'>
         <div className="col-3"><Sidebar/></div>
        
        <div className="col-9"><Outlet/></div>
       
        </div>
        
        </>
      );
}

export default Bookings