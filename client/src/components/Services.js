import React from "react";
import img1 from "../images/new/club.jpg";
import img2 from "../images/new/meeting.jpg";
import img3 from "../images/new/private.jpg";
import img4 from "../images/new/badminton.jpg";
import img5 from "../images/new/room1.jpg";
import main from "../images/new/main.jpg";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styling/aboutus.css";
import image from "../images/about.jpg";

function Services() {
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
            <div className="container mt-5 pt-3">
                <div className="row align-items-center mb-5">
                    <div className="col-md-6">
                        <h1>FEATURES AND BENEFITS</h1>
                        <p>
                            Are you looking for an event space for yourself or your team? Look no further 
                            than Spacefy. Our packages provide a premium and productive environment, designed to meet the needs of modern events.
                        </p>
                    </div>
                    <div className="col-md-6 text-center">
                        <img src={img2} alt="Spaces" className="img-fluid rounded mb-4" />
                    </div>
                </div>
                <div className="row align-items-center mb-5">
                    <div className="col-md-6 text-center">
                        <img src={image} alt="Spaces" className="img-fluid rounded mb-4" />
                    </div>
                    <div className="col-md-6">
                        <h1>Discover Ideal Meeting Spaces</h1>
                        <p>
                            Find professional and inspiring environments for your next business meeting, brainstorming session, or workshop.
                        </p>
                        <p>
                            Use our intuitive search and filter options to find spaces that match your specific needs based on location, price, capacity, and amenities.
                        </p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <h2>Our Spaces</h2>
                        <div className="row align-items-center mb-5">
                            <div className="col-md-6">
                                <h3>Private Space</h3>
                                <p>Our private spaces offer an exclusive environment perfect for focused work, intimate gatherings, or confidential meetings. 
                                    Enjoy complete privacy and a serene atmosphere tailored to your specific needs.</p>
                            </div>
                            <div className="col-md-6 text-center">
                                <img src={img1} alt="Spaces" className="img-fluid rounded mb-4" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <div className="row align-items-center mb-5">
                            <div className="col-md-6 text-center">
                                <img src={img3} alt="Spaces" className="img-fluid rounded mb-4" />
                            </div>
                            <div className="col-md-6">
                                <h1>Club Spaces</h1>
                                <p>Our club spaces offer a vibrant and energetic environment ideal for events, gatherings, and activities. Perfect for social or professional engagements, these spaces are equipped to handle diverse needs.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center mb-5">
                    <div className="col-md-6">
                        <h3>Indoor Sports Package</h3>
                        <p>Stay active and engaged with our indoor sports package, featuring facilities for activities like basketball, badminton, and more. Perfect for team-building events or personal fitness, regardless of the weather.</p>
                    </div>
                    <div className="col-md-6 text-center">
                        <img src={img4} alt="Spaces" className="img-fluid rounded mb-4" />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <div className="row align-items-center mb-5">
                            <div className="col-md-6 text-center">
                                <img src={img5} alt="Spaces" className="img-fluid rounded mb-4" />
                            </div>
                            <div className="col-md-6">
                                <h3>Meeting Rooms</h3>
                                <p>Our meeting rooms package provides professional and versatile spaces designed to accommodate business meetings, workshops, and seminars. Equipped with state-of-the-art technology, including high-speed internet, projectors, and audio-visual equipment,
                                     our rooms ensure a seamless and productive experience.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Services;
