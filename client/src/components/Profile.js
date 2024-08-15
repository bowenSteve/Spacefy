import React, { useState, useEffect } from 'react';
import ProfileNav from "./ProfileNav";
import ProfileContent from "./ProfileContent";
import BookingsContent from "./BookingsContent";
import SpacesContent from "./SpaceContent";
import Footer from './Footer';
import Admin from './Admin';

function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Profile');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://spacefy.onrender.com/user_details", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No user is logged in");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        console.log(data);
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

  const renderContent = () => {
    switch (activeSection) {
      case 'Profile':
        return <ProfileContent user={user} />;
      case 'Bookings':
        return user.role ? <div>Access Denied</div> : <BookingsContent user={user} />;
      case 'Spaces':
        return (user.role || user.owner) ? <SpacesContent user={user} /> : <div>Access Denied</div>;
      case 'Admin':
        return user.owner ? <Admin user={user} /> : <div>Access Denied</div>;
      default:
        return <ProfileContent user={user} />;
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
            {!user.role && (
              <li style={{ marginBottom: '10px' }}>
                <button
                  className={`btn ${activeSection === 'Bookings' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveSection('Bookings')}
                >
                  Bookings
                </button>
              </li>
            )}
            {(user.role || user.owner) && (
              <li style={{ marginBottom: '10px' }}>
                <button
                  className={`btn ${activeSection === 'Spaces' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveSection('Spaces')}
                >
                  Spaces
                </button>
              </li>
            )}
            {user.owner && (
              <li style={{ marginBottom: '10px' }}>
                <button
                  className={`btn ${activeSection === 'Admin' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveSection('Admin')}
                >
                  Admin
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div
        className="container mt-5"
        style={{ flex: 1, marginLeft: isMenuOpen ? '250px' : '80px' }}
      >
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
