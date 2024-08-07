
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

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

    fetch('http://127.0.0.1:5000/logout', {
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
    <nav className="navbar navbar-expand-lg fixed-top navbar-scroll custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        <h2 className="brand m-0 main-text">SPACEFY</h2 >
=======
        <Link to={"/"} className="link-color"><h2 className="brand m-0 main-text">SPACEFY</h2></Link>
        <div className="collapse navbar-collapse justify-content-center" id="navbarExample01">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item active">
            <Link to={"/"} className="link-color"> <a className="nav-link main-text" aria-current="page" href="#home">Home</a></Link>
            </li>
            <li className="nav-item">
              <a className="nav-link main-text" aria-current="page" href="#about">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link main-text" aria-current="page" href="#services">Services</a>
            </li>
            <li className="nav-item">
             <Link to = {"/contact"}> <a className="nav-link main-text" aria-current="page" >Contact</a ></Link>
            </li>
          </ul>
        </div>
        {isLoggedIn && (
          <span className="navbar-text me-3 main-text">
            {firstName}
          </span>
        )}
        <button className="btn main-button navbtn me-0" onClick={handleLogin}>
          <span>{isLoggedIn ? "Logout" : "Login"}</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
