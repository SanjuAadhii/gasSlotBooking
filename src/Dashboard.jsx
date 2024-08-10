import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from "./Cards";

function Dashboard({data}) {
    return (
        <div className="container my-5">
        
      <div className="p-5 text-center bg-body-tertiary rounded-3">
       
        <h1 className="text-body-emphasis"> Book your Gas</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
        Gas Booking app: Explore diverse cuisines, place orders effortlessly, track deliveries, and enjoy personalized recommendations for a delightful dining experience.
        </p>
        <div className="d-inline-flex gap-2 mb-5">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{width:"30rem"}}/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </div>
      </div>
      <div className='row mt-5'>
      {data.map(item => (
          <Cards key={item.id} data={item} />
        ))}
       
      
      </div>
    </div>
      )
}

export default Dashboard