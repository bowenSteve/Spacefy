
import { Link } from "react-router-dom";

function Navbar(){

    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to={"/"} className="link-color"><h2 className="brand m-0 main-text">SPACEFY</h2></Link>
        <div className="collapse navbar-collapse justify-content-center" id="navbarExample01">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item active">
              <Link to={"/"} className="nav-link main-text link-color" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to={"/aboutus"} className="nav-link main-text link-color" aria-current="page">About Us</Link>
            </li>
            <li className="nav-item">
              <Link to={"/services"} className="nav-link main-text link-color" aria-current="page">Services</Link>
            </li>
            <li className="nav-item">
              <Link to={"/contact"} className="nav-link main-text link-color" aria-current="page">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

      );
}
export default Navbar