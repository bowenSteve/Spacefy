
function Footer(){
    return(
        <footer className="text-center text-lg-start text-muted footer-body">
    
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
      
      </section>
       <section>
        <div className="container text-center text-md-start mt-5">
      
          <div className="row mt-3">
        
            <div className="col-md-4 mx-auto mb-4">
          
              <h6 className="fw-bold mb-4 custom-footer-1">Spacefy</h6>
              <p className="main-text"><i className="fas fa-home me-3"></i> Nairobi-Kenya</p>
              <p className="main-text">
                <i className="fas fa-envelope me-3 "></i>
                info@example.com
              </p>
              <p className="main-text"><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
              <p className="main-text"><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
            </div>
         
            <div className="col-md-4 mx-auto mb-4">
            
              <h6 className="text-uppercase fw-bold mb-4 custom-footer">Spaces</h6>
              <p className="main-text">
                <a href="#!" className="text-reset ">team package</a>
              </p>
              <p className="main-text">
                <a href="#!" className="text-reset ">private package</a>
              </p>
              <p className="main-text">
                <a href="#!" className="text-reset ">day pass</a>
              </p>
              <p className="main-text">
                <a href="#!" className="text-reset ">custom package</a>
              </p>
            </div>
      
            <div className="col-md-4 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4 custom-footer">Menu</h6>
              <p className="main-text">
                <a href="#home" className="text-reset ">Home</a>
              </p>
              <p className="main-text">
                <a href="#about" className="text-reset ">About Us</a>
              </p>
              <p className="main-text">
                <a href="#services" className="text-reset">Services</a>
              </p>
              <p className="main-text">
                <a href="#contact" className="text-reset ">Contact</a>
              </p>
            </div>
         
          </div>
       
        </div>
      </section>
     
      <div className="text-center p-4 main-text" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className="text-reset fw-bold main-text" href="#">Spacefy</a>
      </div>
     
    </footer>
       
    );

}
export default Footer;