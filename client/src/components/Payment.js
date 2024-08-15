import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import Navbar from './Navbar';
import Footer from './Footer';

// Function to check if a date is highlighted
const isHighlighted = (date, bookings) => {
  return bookings.some(booking => {
    const bookingStart = new Date(booking.start_time);
    const bookingEnd = new Date(booking.end_time);
    return date >= bookingStart && date <= bookingEnd;
  });
};

function Payment() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tax, setTax] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState([null, null]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://spacefy.onrender.com/spaces/${id}`)
      .then(res => res.json())
      .then(data => {
        setSpace(data);
        setRate(data.hourly_price);
        setIsAvailable(data.availability);
      })
      .catch(error => {
        console.error('Error fetching space:', error);
      });
  }, [id]);

  useEffect(() => {
    fetch(`https://spacefy.onrender.com/get_bookings/${id}`)
      .then(res => res.json())
      .then(data => {
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
      fetch("https://spacefy.onrender.com/current_user", {
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
            console.log(data)
          }
        })
        .catch(error => {
          console.error("Error fetching current user:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      calculateTaxAndTotal();
    }
  }, [startDate, endDate]);

  const calculateTaxAndTotal = () => {
    const taxRate = 0.13;
    const duration = calculateDuration(startDate, endDate);
    const calculatedTax = Math.round(rate * duration * taxRate);
    const calculatedAmount = Math.round(rate * duration);
    setTax(calculatedTax);
    setTotalAmount(calculatedAmount + calculatedTax);
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return 0;
    const startDateTime = new Date(start);
    const endDateTime = new Date(end);
    const durationInHours = Math.round((endDateTime - startDateTime) / (1000 * 60 * 60));
    return durationInHours > 0 ? durationInHours : 0;
  };

  const handleDateChange = (dates) => {
    if (dates.length === 2) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    } else {
      setSelectedDate(dates);
    }
  };

  const handlePayButtonClick = () => {
    if (!isLoggedin) {
      navigate("/login");
      return;
    }
    if (!startDate || !endDate) {
      console.log('Start date or end date is not set, please select dates');
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

  // Disable highlighted dates
  const tileDisabled = ({ date }) => {
    return isHighlighted(date, bookings);
  };

  if (!space) {
    return <div>Space not found</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 pt-5 flex-grow-1">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4">
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
          </div>
          <div className="col-lg-6 col-md-12 mb-4">
            <img src={space.image_url} alt={space.name} className="img-fluid" />
          </div>
        </div>
        <div className="d-flex flex-column align-items-center mt-4">
          <h3>Book This Space</h3>
          {!isAvailable && <span className='booking-text mb-3'>Highlighted dates have already been booked!</span>}
          <div className="calendar-container mb-4">
            <Calendar
              selectRange
              onChange={handleDateChange}
              value={[startDate, endDate]}
              tileClassName={({ date }) => isHighlighted(date, bookings) ? 'highlighted-date' : null}
              tileDisabled={tileDisabled}
              minDate={new Date()}
            />
            <style>
              {`
                .highlighted-date {
                  background: #ffcc00 !important; /* Highlight color */
                  color: #000 !important;
                }
                .react-calendar__tile--active {
                  background: #00f !important;
                  color: white !important;
                }
              `}
            </style>
          </div>
          {startDate && endDate && (
            <div className="text-center mb-4">
              <p className="mb-2"><strong>Start Date:</strong> {formatDateTime(startDate.toISOString())}</p>
              <p className="mb-2"><strong>End Date:</strong> {formatDateTime(endDate.toISOString())}</p>
              <p className="mb-2"><strong>Tax:</strong> ${Math.round(tax)}</p>
              <p className="mb-2"><strong>Total Amount:</strong> ${Math.round(totalAmount)}</p>
            </div>
          )}
          <div className="d-flex justify-content-center mb-4">
            <button
              type="button"
              className="btn book-btn2"
              onClick={handlePayButtonClick}
              disabled={!startDate || !endDate || !isLoggedin}
            >
              <span>{isLoggedin ? "Proceed to Payment" : "Login to continue"}</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
