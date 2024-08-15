import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function SpaceCard() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://spacefy.onrender.com/spaces/${id}`)
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

  const handleBookNow = () => {
    navigate(`/payment/${id}`);
  };

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
                <li className="no-list-style " key={index}>
                  <i className="bi bi-check2"> </i> {feature}
                </li>
              ))}
            </ul>
            <p className="mb-4"><strong>Capacity:</strong> {space.capacity}</p>
            <p className="mb-4"><strong>Location:</strong> {space.location}</p>
            <p><strong>Hourly Rates:</strong> ${space.hourly_price}</p>
            <p><strong>Daily Rates:</strong> ${space.daily_price}</p>
            <button className="btn book-btn" onClick={handleBookNow}>Book Now</button>
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
