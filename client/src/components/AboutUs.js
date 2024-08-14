import React from "react";
import aboutImage from "../images/spaces.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AboutUs() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <img src={aboutImage} alt="Spaces" className="img-fluid rounded mb-4" />
                    <h2>About Us</h2>
                    <p className="lead mt-4">
                        Welcome to Spacefy! We are a dedicated platform that connects people with unique spaces for all kinds of events, projects, and experiences. Whether you need a studio for a photo shoot, a cozy space for a meeting, or an expansive venue for a special occasion, Spacefy has you covered.
                    </p>
                    <p>
                        Our mission is to make it easy for you to discover and rent the perfect space that fits your needs. We work closely with space owners to ensure that our listings are diverse, high-quality, and tailored to a wide range of purposes. Thank you for choosing Spacefy to find your next creative or event space!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
