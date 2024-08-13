import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Simulate() {
  const location = useLocation();
  const { totalAmount, itemName, rate, tax, startDate, endDate, id } = location.state || {
    totalAmount: 0,
    itemName: '',
    rate: 0,
    tax: 0,
    startDate: '',
    endDate: '',
    id: 0
  };
  const [paymentMethod, setPaymentMethod] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [user, setUser] = useState(null);

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
    setPaymentSuccess(false);
  };

  const handleAgreeToTermsChange = (event) => {
    setAgreeToTerms(event.target.checked);
    setPaymentSuccess(false);
  };

  const calculateDuration = (start, end) => {
    const startDateTime = new Date(start);
    const endDateTime = new Date(end);
    const durationInHours = Math.round((endDateTime - startDateTime) / (1000 * 60 * 60));
    return durationInHours > 0 ? durationInHours : 0;
  };

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
            setUser(data.id);
          }
        })
        .catch(error => {
          console.error("Error fetching current user:", error);
        });
    }
  }, []);

  const handleSubmit = () => {
    fetch(`http://localhost:5000/spaces/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            availability: false  // directly setting the availability to false
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            console.log("Space updated successfully!");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred while updating the space.");
    });
  };

  const createBooking = () => {
    const token = localStorage.getItem('token');

    fetch("http://127.0.0.1:5000/create_booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            user_id: user,
            space_id: parseInt(id),
            start_time: startDate,
            end_time: endDate,
            total_amount: totalAmount
        }),
    })
    .then(res => {
        console.log('Response status:', res.status);
        return res.json();
    })
    .then(data => {
        if (data.message) {
            createPayment(); // Call createPayment here to handle payment
        } else {
            console.error('Error creating booking:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  const createPayment = () => {
    const token = localStorage.getItem('token');

    fetch("http://127.0.0.1:5000/create_payment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            tax: tax,
            amount: totalAmount,
            booking_id: id
        }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
        if (data.payment) {

            setPaymentSuccess(true);
            handleSubmit(); // Call handleSubmit here to update space availability
        } else {
            console.error('Error creating payment:', data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };

  const handlePayButtonClick = () => {
    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }
    if (!agreeToTerms) {
        alert("You must agree to the terms and conditions.");
        return;
    }
    
    alert(`Proceeding to payment with ${paymentMethod}...`);
    createBooking(); 
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container mt-5 pt-5 flex-grow-1">
        <div className="row">
          <div className="col-md-6">
            <h2>Invoice</h2>
            <div className="invoice">
              <p><strong>Item:</strong> {itemName}</p>
              <p><strong>Rate:</strong> ${rate}/hour</p>
              <p><strong>Duration:</strong> {Math.round(calculateDuration(startDate, endDate))} Hours</p>
              <p><strong>Tax:</strong> ${Math.round(tax)}</p>
              <p><strong>Total:</strong> ${Math.round(totalAmount)}</p>
            </div>
          </div>
          <div className="col-md-6">
            <h2>Payment Methods</h2>
            <div className="payment-options d-flex justify-content-between mb-4">
              <button className="btn btn-outline-primary" onClick={() => handlePaymentChange('Credit Card')}>
                Credit Card
              </button>
              <button className="btn btn-outline-primary" onClick={() => handlePaymentChange('Mpesa')}>
                Mpesa
              </button>
              <button className="btn btn-outline-primary" onClick={() => handlePaymentChange('Airtel-Money')}>
                Airtel-Money
              </button>
            </div>

            {paymentMethod === 'Credit Card' && (
              <div className="payment-form">
                <h3>Credit Card Information</h3>
                <form>
                  <div className="mb-3">
                    <label htmlFor="cc-number" className="form-label">Card Number</label>
                    <input type="text" className="form-control" id="cc-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cc-expiry" className="form-label">Expiry Date</label>
                    <input type="text" className="form-control" id="cc-expiry" placeholder="MM/YY" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cc-cvc" className="form-label">CVC</label>
                    <input type="text" className="form-control" id="cc-cvc" placeholder="123" />
                  </div>
                </form>
              </div>
            )}

            {paymentMethod === 'Mpesa' && (
              <div className="payment-form">
                <h3>Mpesa Information</h3>
                <form>
                  <div className="mb-3">
                    <label htmlFor="mpesa-number" className="form-label">Mpesa Number</label>
                    <input type="text" className="form-control" id="mpesa-number" placeholder="07XX XXX XXX" />
                  </div>
                </form>
              </div>
            )}

{paymentMethod === 'Airtel-Money' && (
              <div className="payment-form">
                <h3>Airtel-Money Information</h3>
                <form>
                  <div className="mb-3">
                    <label htmlFor="airtel-number" className="form-label">Airtel-Money Number</label>
                    <input type="text" className="form-control" id="mpesa-number" placeholder="07XX XXX XXX" />
                  </div>
                </form>
              </div>
            )}

            <div className="mb-3 form-check">
              <Link to={"/agreement"}><label className="all-links">Read our terms and conditions</label></Link>
              <input
                type="checkbox"
                className="form-check-input"
                id="agreeToTerms"
                checked={agreeToTerms}
                onChange={handleAgreeToTermsChange}
              />
              <label className="form-check-label" htmlFor="agreeToTerms">
                I agree to the terms and conditions
              </label>
            </div>
            <button
              type="button"
              className="btn book-btn"
              onClick={handlePayButtonClick}
            >
              Pay Now
            </button>
            {paymentSuccess && (
              <div className="alert alert-success mt-3" role="alert">
                Payment successful! Your payment of ${Math.round(totalAmount)} has been deposited to Spacefy ltd account no. 13375859.
                Thank you for your services!
                More information will be sent to your email.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Simulate;
