import React, { useState, useEffect } from 'react';
import EditSpace from "./EditSpace";
import AddSpace from './AddSpace';

function SpaceContent({ user }) {
    const [spaces, setSpaces] = useState([]);
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showBookingsModal, setShowBookingsModal] = useState(false);
    const [bookings, setBookings] = useState([]);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        const endpoint = user.is_owner ? "https://spacefy.onrender.com/admin_spaces" : "https://spacefy.onrender.com/user_spaces";
        
        fetch(endpoint, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
                setSpaces(data);
            })
            .catch((error) => console.error('Error fetching spaces:', error));
    }, [user.is_owner]);
   
    const handleAddSpace = () => {
        setShowAddModal(true);
    };

    const handleEditSpace = (space) => {
        setSelectedSpace(space);
        setShowEditModal(true);
    };

    const handleViewBookings = (space) => {
        setSelectedSpace(space);
        fetch(`https://spacefy.onrender.com/spaces/${space.id}/bookings`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const formattedBookings = data.map((booking) => {
                    const date = new Date(booking.booking_date);
                    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                    return { ...booking, booking_date: formattedDate };
                });
                setBookings(formattedBookings);
                setShowBookingsModal(true);
            })
            .catch((error) => console.error('Error fetching bookings:', error));
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedSpace(null);
    };

    const handleCloseBookingsModal = () => {
        setShowBookingsModal(false);
        setSelectedSpace(null);
        setBookings([]);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Spaces Management</h2>

            <button className="btn btn-primary mb-4" onClick={handleAddSpace}>
                Add New Space
            </button>

            <div className="row">
                {spaces.map((space) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={space.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{space.name}</h5>
                                <p className="card-text">{space.description}</p>
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-info me-2"
                                        onClick={() => handleEditSpace(space)}
                                    >
                                        Edit Space
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleViewBookings(space)}
                                    >
                                        View Bookings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Space Modal */}
            {showAddModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Space</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseAddModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <AddSpace />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseAddModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Space Modal */}
            {showEditModal && selectedSpace && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Space</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseEditModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <EditSpace space={selectedSpace} />
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseEditModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* View Bookings Modal */}
            {showBookingsModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Bookings for {selectedSpace?.name}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseBookingsModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <table className="table table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Client Name</th>
                                            <th>Booking Date</th>
                                            <th>Amount Paid</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr key={booking.id}>
                                                <td>{booking.user.email}</td>
                                                <td>{booking.booking_date}</td>
                                                <td>${booking.total_amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseBookingsModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SpaceContent;
