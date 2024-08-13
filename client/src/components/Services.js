import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Services() {
    return (
        <div>
            <Navbar/>
        
        <div>
            <h1>FEATURES AND BENEFITS</h1>
            <p>Are you looking for an event space for yourself or your team? Look no further than Spacefy. Our packages provide a premium and productive environment, designed to meet the needs of modern events.</p>
            <p>Find professional and inspiring environments for your next business meeting, brainstorming session, or workshop.</p>
            <p>Use our intuitive search and filter options to find spaces that match your specific needs based on location, price, capacity, and amenities.</p>

            <h2>Our Spaces</h2>

            <div>
                <h3>Private Space</h3>
                <img src="" alt="Private Space" />
                <p>Our private spaces offer an exclusive environment perfect for focused work, intimate gatherings, or confidential meetings. Enjoy complete privacy and a serene atmosphere tailored to your specific needs.</p>
            </div>

            <div>
                <h3>Club Spaces</h3>
                <img src="" alt="Club Spaces" />
                <p>Club spaces provide a vibrant setting ideal for social events, networking, and entertainment. Experience a lively atmosphere with all the amenities needed for a memorable gathering.</p>
            </div>

            <div>
                <h3>Indoor Sports Package</h3>
                <img src="" alt="Indoor Sports Package" />
                <p>Stay active and engaged with our indoor sports package, featuring facilities for activities like basketball, badminton, and more. Perfect for team-building events or personal fitness, regardless of the weather.</p>
            </div>

            <div>
                <h3>Meeting Rooms</h3>
                <img src="" alt="Meeting Rooms" />
                <p>Our meeting rooms package provides professional and versatile spaces designed to accommodate business meetings, workshops, and seminars. Equipped with state-of-the-art technology, including high-speed internet, projectors, and audio-visual equipment, our rooms ensure a seamless and productive experience.</p>
            </div>

            <footer>
                <h3>Spacefy</h3>
                <ul>
                    <li><a href="#spaces">SPACES</a></li>
                    <li><a href="#menu">MENU</a></li>
                    <li><a href="tel:+2547000055">+2547000055</a></li>
                    <li><a href="#team-package">Team Package</a></li>
                    <li><a href="#home">Home</a></li>
                    <li><a href="tel:+25470100789">+25470100789</a></li>
                    <li><a href="#private-package">Private Package</a></li>
                    <li><a href="#about-us">About Us</a></li>
                    <li><a href="mailto:spacefy@hotmail.com">spacefy@hotmail.com</a></li>
                    <li><a href="#day-pass">Day Pass</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#custom-package">Custom Package</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <p>&copy; 2024 Spacefy. All rights reserved.</p>
            </footer>
        </div>
        <Footer/>
        </div>
    );
}

export default Services;