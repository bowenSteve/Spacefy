import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch("https://spacefy.onrender.com/current_user", {
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
    const token = localStorage.getItem('token');

    fetch('https://spacefy.onrender.com/logout', {
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
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <h2 className="brand m-0">SPACEFY</h2>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn main-button navbtn" onClick={handleLogin}>
                <span>{isLoggedIn ? "Logout" : "Login"}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
