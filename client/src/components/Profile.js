import React, { useState } from 'react';
import ProfileNav from "./ProfileNav";
import { Link } from "react-router-dom";


function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  );
}

export default Profile;
