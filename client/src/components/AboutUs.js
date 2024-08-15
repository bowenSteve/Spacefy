import React from "react";
import aboutImage from "../images/spaces.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styling/aboutus.css";
import image from "../images/about.jpg"
import main from "../images/new/meeting.jpg"

function AboutUs() {
    return (
        <div>
            <Navbar />
            <header>
        <img
          src={main}
          alt="Full Width"
          className="img-fluid w-100"
          style={{ width: '100%', height: '500px', objectFit: 'cover' }}
        />
      </header>
            <div className="container mt-5 pt-5">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <h1>We Help Businesses Find the Right Way to Work</h1>
                        <p>We are a dedicated platform that connects people with unique spaces for all kinds of events, projects, and experiences. Whether you need a studio for a photo shoot, a cozy space for a meeting, or an expansive venue for a special occasion, Spacefy has you covered.</p>
                    </div>
                    <div className="col-md-6 text-center">
                        <img src={aboutImage} alt="Spaces" className="img-fluid rounded mb-4" />
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-6">
                    <img src={image} alt="Spaces" className="img-fluid rounded mb-4" />
                    </div>
                    <div className="col-md-6 text-center">
                        <h1>Discover Diverse Rental Spaces</h1>
                        <p>
                            Our mission is to make it easy for you to discover and rent the perfect space that fits your needs. We work closely with space owners to ensure that our listings are diverse, high-quality, and tailored to a wide range of purposes. Thank you for choosing Spacefy to find your next creative or event space!
                        </p>
                    </div>
                </div>
       
            </div>
            <Footer />
        </div>
    );
}

export default AboutUs;
