import React, { useState, useEffect } from 'react';
import ProfileNav from "./ProfileNav";
import ProfileContent from "./ProfileContent";
import BookingsContent from "./BookingsContent";
import SpacesContent from "./SpaceContent";
import { Link } from "react-router-dom";


function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

import ProfileContent from "./ProfileContent"; // Your Profile content component
import BookingsContent from "./BookingsContent"; // Your Bookings content component
import SpacesContent from "./SpaceContent"; // Your Spaces content component

function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Profile');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5000/user_details", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user details");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <ProfileNav />
      <div className="d-flex mt-5">
        {/* Sidebar */}
        <div className={`sidebar sidebar-bg p-3 ${isMenuOpen ? 'expanded' : ''}`} id="sidebar">
          <button className="btn btn-bg mb-3" id="menuButton" onClick={toggleMenu}>
            ☰
          </button>
          <div className={`canvas-menu ${isMenuOpen ? 'open' : ''}`}>
            <h3>
              <Link to="/scores" className="text-primary text-decoration-none">Profile</Link>
            </h3>
            {/* Add more menu items as needed */}
          </div>
        </div>

        {/* Main content */}
        <div className="container mt-5 ms-3" style={{ marginLeft: isMenuOpen ? '250px' : '80px' }}>
          <div id="quizContainer">
            {/* Content for the quiz will go here */}
          </div>
        </div>
      </div>
    </div>


  const renderContent = () => {
    switch (activeSection) {
      case 'Profile':
        return <ProfileContent user={user}/>;
      case 'Bookings':
        return <BookingsContent user={user}/>;
      case 'Spaces':
        return user.role ? <SpacesContent user={user}/> : <div>Access Denied</div>;
      default:
        return <ProfileContent user={user}/>;
    }
  };

  return (
    <div>
      <ProfileNav />
      <div className="sidebar sidebar-bg p-3" id="sidebar" style={{ width: isMenuOpen ? '250px' : '80px' }}>
        <button className="btn btn-bg mb-3" id="menuButton" onClick={toggleMenu}>
          ☰
        </button>
        <div className={`canvas-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <button
                className={`btn ${activeSection === 'Profile' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveSection('Profile')}
              >
                Profile
              </button>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <button
                className={`btn ${activeSection === 'Bookings' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveSection('Bookings')}
              >
                Bookings
              </button>
            </li>
            <li>
              <button
                className={`btn ${activeSection === 'Spaces' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveSection('Spaces')}
              >
                Spaces
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="container mt-5"
        style={{ flex: 1, marginLeft: isMenuOpen ? '250px' : '80px' }}
      > 
        <p>hello</p>
        {renderContent()}
      </div>
      <div className="page-container">
  <div className="content-wrap">
  </div>
  <Footer />
</div>
</div>
  );
}

export default Profile;
