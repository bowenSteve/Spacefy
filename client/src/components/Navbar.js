import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For local authentication
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const { logout: auth0Logout, isAuthenticated, user: auth0User, getIdTokenClaims } = useAuth0(); // Auth0 hook

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch("http://127.0.0.1:5000/current_user", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch current user");
          }
        })
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
      setFirstName(auth0User?.given_name || "User"); // Use Auth0 user details if available
    } else {
      setIsLoggedIn(false);
      setFirstName("");
    }
  }, [isAuthenticated, auth0User]);

  // Send user data to google_login endpoint when authenticated
  useEffect(() => {
    const sendGoogleLoginData = async () => {
      if (isAuthenticated && auth0User) {
        try {
          const idToken = await getIdTokenClaims(); // Get the ID token
          const response = await fetch("http://127.0.0.1:5000/google_login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${idToken.__raw}` // Use ID token as Bearer token
            },
            body: JSON.stringify({ email: auth0User.email }),
          });
  
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.access_token); // Store the JWT token in localStorage
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

    // If using Auth0, logout from Auth0
    if (isAuthenticated) {
      auth0Logout({ returnTo: window.location.origin }); // Redirect to home page or login page
    }

    // Clear local authentication
    fetch('http://127.0.0.1:5000/logout', {
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
        <Link to={"/"} className="link-color"><h2 className="brand m-0 main-text">SPACEFY</h2></Link>
        <div className="collapse navbar-collapse justify-content-center" id="navbarExample01">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item active">
              <Link to={"/"} className="link-color">
                <span className="nav-link main-text" aria-current="page">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link main-text" aria-current="page" href="#about">About Us</span>
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
    </nav>
  );
}

export default Navbar;
