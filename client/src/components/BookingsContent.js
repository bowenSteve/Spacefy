import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function BookingsContent() {
    const [bookings, setBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/user_bookings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setBookings(data);
        })
        .catch((error) => console.error('Error fetching bookings:', error));
    }, []);

    const handleInvoiceClick = (booking) => {
        setSelectedBooking(booking);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const calculateDuration = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const durationMs = end - start;
        const durationHours = Math.round(durationMs / (1000 * 60 * 60)); // Convert milliseconds to hours
        return durationHours;
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">My Bookings</h2>
            <div className="row">
                {bookings.map((booking) => (
                    <div className="col-md-4 mb-4" key={booking.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Space: {booking.space_name}</h5>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => handleInvoiceClick(booking)}
                                >
                                    Invoice
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedBooking && (
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Invoice</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5><strong>Spacefy Ltd</strong></h5>
                        <p><strong>Item:</strong> {selectedBooking.space_name}</p>
                        <p><strong>Booking Date:</strong> {new Date(selectedBooking.booking_date).toLocaleDateString()}</p>
                        <p><strong>Booked for:</strong> {calculateDuration(selectedBooking.start_time, selectedBooking.end_time)} hours</p>
                        <p><strong>Total:</strong> ${selectedBooking.total_amount}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default BookingsContent;
