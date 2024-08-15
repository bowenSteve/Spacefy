import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

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
                <a className="nav-link main-text" aria-current="page" href="#home">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/aboutus"} className="link-color">
                <a className="nav-link main-text" aria-current="page" href="#about">About Us</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/services"} className="link-color">
                <a className="nav-link main-text" aria-current="page">Services</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/contact"} className="link-color">
                <a className="nav-link main-text" aria-current="page">Contact</a>
              </Link>
            </li>
          </ul>
        </div>
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
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='black' stroke-width='2' d='M1 4h14M1 8h14M1 12h14'/%3e%3c/svg%3e"); /* Custom hamburger icon */
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
