import { useNavigate, Link } from "react-router-dom";


function Navbar(){
  const navigate = useNavigate();

  function handleLogin(id){
    navigate("/login");
  }
 

    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h2 className="brand m-0 main-text">SPACEFY</h2 >
        <div className="collapse navbar-collapse justify-content-center" id="navbarExample01">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item active">
              <a className="nav-link main-text" aria-current="page" href="#home">Home</a>
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
        <button className="btn main-button navbtn me-0" onClick={() => handleLogin()}>
          <span>Login</span>
        </button>
      </div>
    </nav>

      );
}
export default Navbar