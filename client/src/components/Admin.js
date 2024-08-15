import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';

function Admin() {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5000/admins", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch admins");
        }
        return res.json();
      })
      .then((data) => {
        setAdmins(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleVerifyClick = (admin) => {
    setSelectedAdmin(admin);
    setShowModal(true);
    setConfirmationMessage(""); // Reset confirmation message
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAdmin(null);
  };

  const handleConfirmVerification = () => {
    if (selectedAdmin) {
      // First, verify the admin
      fetch("http://localhost:5000/add_admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          first_name: selectedAdmin.first_name,
          second_name: selectedAdmin.second_name,
          email: selectedAdmin.email,
          password: selectedAdmin.password,
        }),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to verify admin");
        }
        return res.json();
      })
      .then(() => {
        // Then, update the closed status of the selected admin
        return fetch("http://localhost:5000/update_admin_status", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            id: selectedAdmin.id,
            closed: true,
          }),
        });
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update admin status");
        }
        return res.json();
      })
      .then(() => {
        // Finally, send the confirmation email
        return fetch("http://localhost:5000/sendmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: selectedAdmin.first_name,
            second_name: selectedAdmin.second_name,
            email: selectedAdmin.email,
          }),
        });
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to send confirmation email");
        }
        return res.json();
      })
      .then(() => {
        setConfirmationMessage(`Space Owner ${selectedAdmin.first_name} ${selectedAdmin.second_name} has been successfully added and notified by email.`);
        setTimeout(() => {
          setShowModal(false);
          setSelectedAdmin(null);
          // Refresh the list of admins
          fetch("http://127.0.0.1:5000/admins", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => res.json())
          .then((data) => setAdmins(data))
          .catch((err) => console.error(err));
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        setConfirmationMessage("An error occurred during the verification or email process.");
      });
    }
  };
  
  

  // Separate admins based on `admin.close`
  const activeAdmins = admins.filter(admin => !admin.closed);
  const closedAdmins = admins.filter(admin => admin.closed);
  console.log(admins)

  return (
    <div className="container mt-5">
      {error && <p className="text-danger">{error}</p>}
      {confirmationMessage && <p className="text-success">{confirmationMessage}</p>}

      {/* Active Admins */}
      <h2>Active Tickets</h2>
      {activeAdmins.length > 0 ? (
        <div className="row">
          {activeAdmins.map((admin) => (
            <div key={admin.id} className="col-md-3">
              <div className="card mb-4">
                <div className="card-body">
                  <p><strong>First Name:</strong> {admin.first_name}</p>
                  <p><strong>Second Name:</strong> {admin.second_name}</p>
                  <p><strong>Email:</strong> {admin.email}</p>
                  <p>
                    <strong>National ID:</strong>{" "}
                    <a href={`data:application/pdf;base64,${admin.national_id}`} download={`national_id_${admin.id}.pdf`}>
                      Download PDF
                    </a>
                  </p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleVerifyClick(admin)}
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No active admins found.</p>
      )}

      {/* Closed Admins */}
      <h2>Closed Tickets</h2>
      {closedAdmins.length > 0 ? (
        <div className="row">
          {closedAdmins.map((admin) => (
            <div key={admin.id} className="col-md-3">
              <div className="card mb-4">
                <div className="card-body">
                  <p><strong>First Name:</strong> {admin.first_name}</p>
                  <p><strong>Second Name:</strong> {admin.second_name}</p>
                  <p><strong>Email:</strong> {admin.email}</p>
                  <p>
                    <strong>National ID:</strong>{" "}
                    <a href={`data:application/pdf;base64,${admin.national_id}`} download={`national_id_${admin.id}.pdf`}>
                      Download PDF
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Open tickets not found.</p>
      )}

      {selectedAdmin && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>First Name:</strong> {selectedAdmin.first_name}</p>
            <p><strong>Second Name:</strong> {selectedAdmin.second_name}</p>
            <p><strong>Email:</strong> {selectedAdmin.email}</p>
            <p>
              <strong>National ID:</strong>{" "}
              <a href={`data:application/pdf;base64,${selectedAdmin.national_id}`} download={`national_id_${selectedAdmin.id}.pdf`}>
                Download PDF
              </a>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleConfirmVerification}>
              Confirm Verification
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Admin;
