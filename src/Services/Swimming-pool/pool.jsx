import React from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
import "./pool.css";

const SwimmingPool = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="Pool_swimming-pool-wrapper">
      <div className="Pool_swimming-pool-container">
        {/* Heading */}
        <h1 className="Pool_swimming-pool-heading">Swimming Pool</h1>

        {/* Pool Image */}
        <div className="Pool_pool-image">
          <img
            src="./src/assets/images/img/home-1.jpg" // Replace with your pool image path
            alt="Swimming Pool"
            className="Pool_pool-img"
          />
        </div>

        {/* Pool Details */}
        <div className="Pool_pool-details">
          <h2 className="Pool_pool-subheading">About Our Swimming Pool</h2>
          <p className="Pool_pool-description">
            Dive into luxury with our state-of-the-art swimming pool. Whether
            you're looking to relax or get some exercise, our pool offers the
            perfect environment. Enjoy the crystal-clear water, comfortable
            loungers, and stunning views.
          </p>

          {/* Amenities Section */}
          <div className="Pool_amenities-section">
            <h3 className="Pool_amenities-heading">Amenities</h3>
            <ul className="Pool_amenities-list">
              <li>Heated Pool</li>
              <li>Jacuzzi</li>
              <li>Poolside Bar</li>
              <li>Sun Loungers</li>
              <li>Towels Provided</li>
              <li>Lifeguard on Duty</li>
            </ul>
          </div>

          {/* Timings Section */}
          <div className="Pool_timings-section">
            <h3 className="Pool_timings-heading">Opening Hours</h3>
            <p className="Pool_timings-description">
              Monday to Sunday: 6:00 AM - 10:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwimmingPool;
