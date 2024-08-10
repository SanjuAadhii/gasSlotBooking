import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registration from './Registration';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import Bookings from './Bookings';
import ListOfBookings from './ListOfBookings';
import GasProvider from './GasProvider';
import axios from 'axios';
import GasBookingForm from './GasBookingForm';
import ViewBookedForm from './ViewBookedForm';
import EditableForm from './EditableForm';
import Navbar from './Navbar';
import Contact from './Contact';
import gas1 from "./assets/gas1.jpg";
import gas2 from "./assets/gas2.png";
import gas3 from "./assets/gas3.png";
import gas4 from "./assets/gas4.png";
import gas5 from "./assets/gas5.png";
import gas6 from "./assets/gas6.png";
function App() {
  // const [data, setData] = useState([]);
  
  const [userData, setUserData] = useState(null);
   const data=[
    {
        "id": 1,
        "gasProviderName": "ABC Gas Co.",
        "Price": "50",
        "description": "Premium gas provider with high efficiency and clean burning.",
        "Image":  gas1  
        },
    {
        "id": 2,
        "gasProviderName": "XYZ Gas Ltd.",
        "Price": "45",
        "description": "Affordable gas with consistent quality and widespread availability.",
        "Image": gas2
    },
    {
        "id": 3,
        "gasProviderName": "MegaGas",
        "Price": "60",
        "description": "High-performance gas for industrial and commercial use.",
        "Image": gas3
    },
    {
        "id": 4,
        "gasProviderName": "GreenGas Inc.",
        "Price": "55",
        "description": "Eco-friendly gas provider with a focus on renewable energy.",
        "Image": gas4
    },
    {
        "id": 5,
        "gasProviderName": "SpeedGas",
        "Price": "52",
        "description": "Fast and reliable gas service for residential areas.",
        "Image": gas5
    },
    {
        "id": 6,
        "gasProviderName": "UltraGas Solutions",
        "Price": "58",
        "description": "Comprehensive gas solutions for both small and large-scale needs.",
        "Image": gas6
    }
    ];
  // const getData = async () => {
  //   try {
  //     const response = await axios.get("https://66a66e2e23b29e17a1a2a2a1.mockapi.io/gasProviders/GasProviders");
  //     setData(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };
  const handleSignOut = () => {
    setUserData(null);
    alert('Signing out...');
  };
  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <>
      <BrowserRouter>  
        <Navbar userData={userData} onSignOut={handleSignOut}/>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<LoginForm setUserData={setUserData} />} />
          <Route path="/" element={<Dashboard data={data} />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path='/gasProvider/:id' element={<GasProvider data={data}  userData={userData}/>} />
          <Route path="/gasBookingForm" element={<GasBookingForm userData={userData}/>} />
          <Route path="/viewBookedForm/:id" element={<ViewBookedForm/>} />
          <Route path="/editBookingForm/:id" element={<EditableForm/>} />
          <Route path="/bookings" element={<Bookings data={data} />} >
            <Route path="booking-list" element={<ListOfBookings data={data}/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
