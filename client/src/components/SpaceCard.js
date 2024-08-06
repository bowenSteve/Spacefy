import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function SpaceCard() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/spaces/${id}`)
      .then(res => res.json())
      .then(data => {
        setSpace(data);
      })
      .catch(error => {
        console.error('Error fetching space:', error);
      });
  }, [id]);

  if (!space) {
    return <div>Space not found</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 pt-5 flex-grow-1">
        <div className="row">
          <div className="col-md-6">
            <h1>{space.name}</h1>
            <p className="mb-4"><strong>Special Features:</strong></p>
            <ul className="mb-4">
              {space.special_features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p className="mb-4"><strong>Capacity:</strong> {space.capacity}</p>
            <p className="mb-4"><strong>Location:</strong> {space.location}</p>
            <button className="btn btn-primary">Book Now</button>
          </div>
          <div className="col-md-6">
            <img src={space.image_url} alt={space.name} className="img-fluid" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SpaceCard;
