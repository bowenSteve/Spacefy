
import { Link,useNavigate } from "react-router-dom";

function Navbar(){
  const navigate = useNavigate()
  function handleServices(){
    navigate("/services")
  }
  function handleContact (){
    navigate("/contact")


    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll custom-navbar">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to={"/"} className="link-color"><h2 className="brand m-0 main-text">SPACEFY</h2></Link>
        <div className="collapse navbar-collapse justify-content-center" id="navbarExample01">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item active">
              <Link to={"/"} className="link-color" ><a className="nav-link main-text" aria-current="page" href="#home">Home</a></Link>
            </li>
            <li className="nav-item">
              <a className="nav-link main-text" aria-current="page" href="#about">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link main-text" aria-current="page" onClick={handleServices}>Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link main-text" aria-current="page" onClick={handleContact}>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

      );
}
export default Navbar