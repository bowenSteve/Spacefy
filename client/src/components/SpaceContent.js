import React, { useState, useEffect } from 'react';
import EditSpace from "./EditSpace";
import AddSpace from './AddSpace';

function SpaceContent() {
    const [spaces, setSpaces] = useState([]);
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://127.0.0.1:5000/user_spaces", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setSpaces(data)})
            .catch((error) => console.error('Error fetching spaces:', error));
    }, []);

    const handleAddSpace = () => {
        setShowAddModal(true);
    };

    const handleEditSpace = (space) => {
        setSelectedSpace(space);
        setShowEditModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedSpace(null);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Spaces Management</h2>

            <button className="btn btn-primary mb-4" onClick={handleAddSpace}>
                Add New Space
            </button>

            <div className="row">
                {spaces.map((space) => (
                    <div className="col-md-4 mb-4" key={space.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{space.name}</h5>
                                <p className="card-text">{space.description}</p>
                                <button
                                    className="btn btn-info"
                                    onClick={() => handleEditSpace(space)}
                                >
                                    Edit Space
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Space Modal */}
            {showAddModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Space</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={handleCloseAddModal}
                                >
                                    <span>&times;</span>
                                </button>
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
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Space</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={handleCloseEditModal}
                                >
                                    <span>&times;</span>
                                </button>
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
        </div>
    );
}

export default SpaceContent;
