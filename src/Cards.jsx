import React from 'react'
import { Link } from 'react-router-dom';
function Cards({data}) {
  console.log(data)
  return (
    <div className='col-md-4 mt-4'>
    <div className="card " style={{width: "22rem"}}>
  <img src={data.Image} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{data.gasProviderName}</h5>
    <p className="card-text">{data.description}</p>
    <Link to={`/gasProvider/${data.id}`} className="btn btn-primary">Book Gas</Link>
  </div>
</div>

    </div>
  )
}

export default Cards