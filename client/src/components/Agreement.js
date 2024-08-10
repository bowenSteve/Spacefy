import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Agreement = () => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAcceptance = () => {
    setIsAccepted(!isAccepted);
  };

  return (
    <div>
      <h2>Agreement and Terms</h2>
      <div>
        <p>
          By using this service, you agree to the following terms and
          conditions:
        </p>
        <ul>
          <li>All bookings are subject to availability and confirmation by Spacefy.
            A booking is considered confirmed only when you receive an email from us.
          </li>
          <li>
            Full payment is required at the time of booking.
            <li>
                All payments are made online. No cash payment is taken!
            </li>
          </li>
          <li>
            Cancellations made more than 48hrs before the booking date will receive a full refund
            Cancellations made within 48hrs of the booking date will result to a Cancellation fee.
          </li>
          <li>
            You acknowledge that the application may collect certain information
            about you, as described in our privacy policy.
          </li>
        </ul>
        
      </div>
    </div>
  );
};

export default Agreement;