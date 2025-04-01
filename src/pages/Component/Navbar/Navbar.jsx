// src/Navbar.jsx
import React, { useState } from "react";
import { FaUser, FaTag, FaHistory, FaSignOutAlt, FaBars, FaSun, FaMoon, FaEdit, FaSignInAlt } from "react-icons/fa";
import { useTheme } from "../../../context/ThemeContext";
import "./Navbar.css";

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [username, setUsername] = useState(""); // Empty initial username
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status
  const { isDarkMode, toggleDarkMode } = useTheme();

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleRenameClick = (e) => {
    e.preventDefault(); // Prevent navigation
    setIsEditingUsername(true); // Enter editing mode
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value); // Update username as user types
  };

  const handleUsernameSubmit = (e) => {
    if (e.key === "Enter" || e.type === "blur") { // Save on Enter key or when input loses focus
      setIsEditingUsername(false); // Exit editing mode
      // Here you could add API call to save the new username if needed
    }
  };

  const handleUpdateClick = () => {
    setIsEditingUsername(false); // Exit editing mode on update button click
    // Here you could add API call to save the new username if needed
  };

  const handleSignIn = () => {
    // Here you would typically handle the sign-in logic
    // For now, we'll just set isLoggedIn to true
    setIsLoggedIn(true);
    setUsername("johndoe123"); // Set a default username after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setShowProfileMenu(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} id="nav">
        <div className="container d-flex align-items-center">
          <a href="#" className="navbar-brand d-flex align-items-center">
            <img
              src="/src/assets/images/logo/Hotel_logo.webp" // Adjusted path for Vite
              alt="home-logo"
              className="logo"
            />
          </a>

          {/* Hamburger Menu Button for Mobile */}
          <button className="hamburger" onClick={toggleMobileMenu}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>

          {/* Navigation Links */}
          <div className={`navbar-nav ms-3 ${showMobileMenu ? 'show' : ''}`}>
            <a href="/" className="nav-item nav-link active">
              Home
            </a>
            <a href="/about" className="nav-item nav-link">
              About Us
            </a>
            <a href="/room" className="nav-item nav-link">
              Rooms
            </a>
            <a href="/contact" className="nav-item nav-link">
              Contact
            </a>
            {/* <a href="/help" className="nav-item nav-link">
              Help
            </a> */}
          </div>

          <div className="navbar-nav ms-auto left-link d-flex align-items-center">
            <a href="/book1" className="nav-link book" id="bk">
              Book Now
            </a>
            <a href="/cancel-booking" className="nav-link cancel" id="cncl">
              Cancel Booking
            </a>
            {/* Dark/Light Mode Toggle Button */}
            <button 
              className="nav-link btn btn-outline-secondary mx-2" 
              id="mode-toggle"
              onClick={toggleDarkMode}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            
            {/* Conditional rendering based on login status */}
            {isLoggedIn ? (
              <div className="profile-container">
                <img
                  src="/src/assets/images/logo/logo.webp"
                  alt="user-profile"
                  className="profile-logo"
                  onClick={toggleProfileMenu}
                />
                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <div className="profile-item">
                      <FaUser /> Name: John Doe
                    </div>
                    <div className="profile-item">
                      <FaTag /> 
                      {isEditingUsername ? (
                        <div className="username-edit-container">
                          <input
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            onKeyPress={handleUsernameSubmit}
                            onBlur={handleUsernameSubmit}
                            className="username-input"
                            autoFocus
                          />
                          <button
                            className="update-btn"
                            onClick={handleUpdateClick}
                          >
                            Update
                          </button>
                        </div>
                      ) : (
                        <>
                          Username: {username}
                          <a href="#" className="profile-link ms-2" onClick={handleRenameClick}>
                            <FaEdit />
                          </a>
                        </>
                      )}
                    </div>
                    <a href="/history" className="profile-item profile-link">
                      <FaHistory /> History
                    </a>
                    <a href="#" className="profile-item profile-link logout" onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className="nav-link btn btn-outline-primary"
                onClick={handleSignIn}
              >
                <FaSignInAlt /> Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;