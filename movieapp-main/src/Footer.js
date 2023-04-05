import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="footer">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="icons">
        <a href="https://www.instagram.com">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://www.facebook.com">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="tel:555-555-5555">
          <i className="fas fa-phone"></i>
        </a>
        <a href="mailto:example@example.com">
          <i className="fas fa-envelope"></i>
        </a>
      </div>
      <div className="nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
      <div className="search-bar">
        <form>
          <div className="search-container">
            <input type="text" placeholder="Search" />
            {/* <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for movies..."
            /> */}
            <button type="submit">
              <i className="fas fa-search search-icon"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="copyright">
        <p>All rights reserved. &copy; 2023.</p>
      </div>
      <div className="owner">
        <p>Alex Ramirez</p>
      </div>
    </div>
  );
};

export default Footer;
