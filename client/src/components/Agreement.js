import React, { useState } from 'react';


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
          By using this service, you agree to the following terms and conditions:
        </p>
        <ul>
          <li>
            All bookings are subject to availability and confirmation by Spacefy. A booking is considered confirmed only when you receive an email from us.
          </li>
          <li>
            Full payment is required at the time of booking.
          </li>
          <li>
            All payments are made online. No cash payment is accepted!
          </li>
          <li>
            Cancellations made more than 48 hours before the booking date will receive a full refund. Cancellations made within 48 hours of the booking date will result in a cancellation fee.
          </li>
          <li>
            You acknowledge that the application may collect certain information about you, as described in our privacy policy.
          </li>
        </ul>
      </div>
      <button onClick={handleAcceptance}>
        {isAccepted ? 'Accepted' : 'Accept Terms'}
      </button>
    </div>
  );
};

export default Agreement;
