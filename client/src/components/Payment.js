import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function SpaceCard() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tax, setTax] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/spaces/${id}`)
      .then(res => res.json())
      .then(data => {
        setSpace(data);
        setRate(data.hourly_price);
        calculateTaxAndTotal(data);
        setIsAvailable(data.availability);
      })
      .catch(error => {
        console.error('Error fetching space:', error);
      });
  }, [id, startDate, endDate]);
  
  useEffect(() => {
    fetch(`http://localhost:5000/get_bookings/${id}`)
      .then(res => res.json())
      .then(data => {
        // Ensure data.bookings is an array
        if (Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else {
          console.error('Bookings data is not an array:', data.bookings);
        }
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch("http://127.0.0.1:5000/current_user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch current user");
          }
        })
        .then(data => {
          if (data.id) {
            setIsLoggedin(true);
          }
        })
        .catch(error => {
          console.error("Error fetching current user:", error);
        });
    }
  }, []);

  const calculateTaxAndTotal = (space) => {
    const taxRate = 0.13;
    const baseRate = Math.round(space.hourly_price || 0);
    const duration = Math.round(calculateDuration(startDate, endDate));
    const calculatedTax = Math.round(baseRate * duration * taxRate);
    const calculatedAmount = Math.round(baseRate * duration);
    setTax(calculatedTax);
    setTotalAmount(calculatedAmount + calculatedTax);
  };

  const calculateDuration = (start, end) => {
    const startDateTime = new Date(start);
    const endDateTime = new Date(end);
    const durationInHours = Math.round((endDateTime - startDateTime) / (1000 * 60 * 60));
    return durationInHours > 0 ? durationInHours : 0;
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handlePayButtonClick = () => {
    if (!isAvailable) {
      // Navigate to the main page when the space is not available
      navigate('/');
      return;
    }

    if (!isLoggedin) {
      navigate("/login");
      return;
    }

    navigate('/simulate', {
      state: {
        itemName: space.name,
        rate: rate,
        totalAmount: totalAmount,
        tax: tax,
        startDate: startDate,
        endDate: endDate,
        id: id
      }
    });
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  if (!space) {
    return <div>Space not found</div>;
  }

  // Extract end times from bookings
  const endTimes = bookings.map(booking => {

    return formatDateTime(booking.end_time); // Adjust to correct property
  });

  console.log('Bookings:', bookings);
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 pt-5 flex-grow-1 d-flex flex-column">
        <div className="row">
          <div className="col-md-6">
            <h1>{space.name}</h1>
       
            <p className="mb-4"><strong>Special Features:</strong></p>
            <ul className="mb-4">
              {space.special_features.map((feature, index) => (
                <li className="no-list-style" key={index}>
                  <i className="bi bi-check2"></i> {feature}
                </li>
              ))}
            </ul>
            <p className="mb-4"><strong>Capacity:</strong> {space.capacity}</p>
            <p className="mb-4"><strong>Location:</strong> {space.location}</p>
            <p className="mb-4"><strong>Rate:</strong> ${space.hourly_price}</p>
            <h3>Not Available until: {endTimes.length ? endTimes[endTimes.length - 1] : 'N/A'}</h3>
          </div>
          <div className="col-md-6">
            <img src={space.image_url} alt={space.name} className="img-fluid" />
          </div>
        </div>
        <div className="mt-auto">
          <h3>Book This Space</h3>
          <form>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">Start Date/Time</label>
              <input
                type="datetime-local"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endDate" className="form-label">End Date/Time</label>
              <input
                type="datetime-local"
                className="form-control"
                id="endDate"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
            <p className="mb-4"><strong>Tax:</strong> ${Math.round(tax)}</p>
            <p className="mb-4"><strong>Total Amount:</strong> ${Math.round(totalAmount)}</p>
            
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn book-btn2"
                onClick={handlePayButtonClick}
               
              >
                <span>{isAvailable ? (isLoggedin ? "Proceed to Payment" : "Login to continue") : "Back to Main Page"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SpaceCard;
