import React, { useState, useEffect } from "react";

function BookingsContent() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/user_bookings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then((res) => res.json())
        .then((data) =>{
            console.log(data.space_id)
         setBookings(data)})  // Assuming the data has a 'bookings' field
        .catch((error) => console.error('Error fetching bookings:', error));
    }, []);
   
    return (
        <div className="container mt-5">
            <h2 className="mb-4">My Bookings</h2>
            <div className="row">
                {bookings.map((booking) => (
                    <div className="col-md-4 mb-4" key={booking.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Space: {booking.space_id}</h5>
                                <p className="card-text">Booking Date: {new Date(booking.start_time).toLocaleDateString()}</p>
                                <p className="card-text">Amount: ${booking.total_amount}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookingsContent;
