import React from "react";
import "./footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()}. All Rights Reserved by Vraj Chovatiya.</p>
      </div>
    </footer>
  );
};

export default Footer;