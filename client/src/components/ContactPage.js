import React, { useState, useEffect } from 'react';
import { useParams,  } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import "../styling/contact.css";

const ContactPage = () => {
  return (
    <div>
    <div className="contact-page">
        <Navbar/>
      <div className="contact-content">
        <h2>GET IN TOUCH</h2>
        <div className="contact-info">
        <p><i className="fas fa-phone"></i>   +254 456 7890</p>
        <p><i className="fab fa-whatsapp"></i>   +254 765 4321</p>
        </div>
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ContactPage;
