import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const { logout: auth0Logout, isAuthenticated, user: auth0User, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch("https://spacefy.onrender.com/current_user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => response.ok ? response.json() : Promise.reject("Failed to fetch current user"))
        .then(data => {
          if (data.id) {
            setIsLoggedIn(true);
            setFirstName(data.first_name);
          }
        })
        .catch(error => {
          console.error("Error fetching current user:", error);
        });
    } else if (isAuthenticated) {
      setIsLoggedIn(true);
      setFirstName(auth0User?.given_name || "User");
    } else {
      setIsLoggedIn(false);
      setFirstName("");
    }
  }, [isAuthenticated, auth0User]);

  useEffect(() => {
    const sendGoogleLoginData = async () => {
      if (isAuthenticated && auth0User) {
        try {
          const idToken = await getIdTokenClaims();
          const response = await fetch("https://spacefy.onrender.com/google_login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${idToken.__raw}`
            },
            body: JSON.stringify({ email: auth0User.email }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.access_token);
          } else {
            const err = await response.json();
            console.error("Error:", err);
          }
        } catch (error) {
          console.error("Error sending Google login data:", error);
        }
      }
    };

    sendGoogleLoginData();
  }, [isAuthenticated, auth0User, getIdTokenClaims]);

  const handleLogin = () => {
    if (isLoggedIn) {
      logout();
    } else {
      navigate("/login");
    }
  };

  const logout = () => {
    const token = localStorage.getItem('token');

    if (isAuthenticated) {
      auth0Logout({ returnTo: window.location.origin });
    }

    fetch('https://spacefy.onrender.com/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setIsLoggedIn(false);
          setFirstName("");
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          alert("Something went wrong");
        }
      })
      .catch(error => {
        console.error("Error logging out:", error);
        alert("Something went wrong");
      });
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-scroll custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to={"/"} className="link-color">
          <h2 className="brand m-0 main-text">SPACEFY</h2>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarExample01" aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse justify-content-center" id="navbarExample01">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item active">
              <Link to={"/"} className="link-color">
                <span className="nav-link main-text" aria-current="page">Home</span>
              </Link>
            </li>
            
            <li className="nav-item">
              <Link to={"/aboutus"} className="link-color">
                <span className="nav-link main-text" aria-current="page">About Us</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/services"} className="link-color">
                <span className="nav-link main-text" aria-current="page">Services</span>  
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/contact"} className="link-color">
                <span className="nav-link main-text" aria-current="page">Contact</span>
              </Link>
            </li>
          </ul>
        </div>

        {isLoggedIn && (
          <Link to={"/profile"}>
            <span className="navbar-text me-3 main-text link-color profile-btn">
              <FontAwesomeIcon icon={faUserCircle} size="lg" className="me-2 main-text" id="svg"/>
              <span>{firstName}</span>
            </span>
          </Link>
        )}
        
        <button className="btn btn-outline-light navbtn me-0" onClick={handleLogin}>
          <span>{isLoggedIn ? "Logout" : "Login"}</span>
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          .navbar-nav .nav-link {
            background-color: rgba(0, 0, 0, 0.5); /* Translucent black background */
            color: #fff; /* White text color for better contrast */
          }
          .navbar-toggler {
            border: none; /* Remove default border */
            background-color: #fff; /* White background for the button */
          }
          .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='black' stroke-width='2' d='M1 4h14M1 8h14M1 12h14'/%3e%3c/svg%3e"); /* White hamburger icon */
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
