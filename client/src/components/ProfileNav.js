import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/current_user`, {
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
          }
        })
        .catch(error => {
          console.error("Error fetching current user:", error);
        });
    }
  }, []);

  function handleLogin() {
    if (isLoggedIn) {
      logout();
    } else {
      navigate("/login");
    }
  }

  function logout() {
    fetch(`${process.env.REACT_APP_API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setIsLoggedIn(false);
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          console.log("Something went wrong");
        }
      })
      .catch(error => {
        console.error("Error logging out:", error);
        console.log("Something went wrong");
      });
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-scroll custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to={"/"} className="link-color"><h2 className="brand m-0 main-text">SPACEFY</h2></Link>
   
        <button className="btn main-button navbtn me-0" onClick={handleLogin}>
          <span>{isLoggedIn ? "Logout" : "Login"}</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
