import React from 'react';
import "./Footer.css";
import { useTheme } from "../../../context/ThemeContext.jsx";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`footer ${isDarkMode ? 'dark' : 'light'}`}>
      <div>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
      <p>Mobile: +1234567890</p>
      <p>Email: example@email.com</p>
    </footer>
  );
};

export default Footer;