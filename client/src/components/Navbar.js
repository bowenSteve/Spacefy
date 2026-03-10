import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (user) {
      logout().then(() => navigate('/login'));
    } else {
      navigate("/login");
    }
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
              <Link to={"/aboutus"} className="link-color">
                <span className="nav-link main-text">About Us</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/services"} className="link-color">
                <span className="nav-link main-text">Services</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/contact"} className="link-color">
                <span className="nav-link main-text">Contact</span>
              </Link>
            </li>
          </ul>
        </div>
        {user && (
          <Link to={"/profile"}>
            <span className="navbar-text me-3 main-text link-color profile-btn">
              <FontAwesomeIcon icon={faUserCircle} size="lg" className="me-2 main-text" id="svg"/>
              <span>{user.first_name}</span>
            </span>
          </Link>
        )}
        {!loading && (
          <button className="btn btn-outline-light navbtn me-0" onClick={handleLogin}>
            <span>{user ? "Logout" : "Login"}</span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
