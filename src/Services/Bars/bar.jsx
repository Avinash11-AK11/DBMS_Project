import React, { useState } from 'react';
import { useTheme } from "../../context/ThemeContext.jsx";
import './bar.css';
import barImage1 from './bar-1.jpg';
import barImage2 from './bar-2.jpg';
import barImage3 from './bar-3.jpg';

const ExclusiveAccess = () => {
  const { isDarkMode } = useTheme();

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Request submitted for:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="Bar_exclusive-access-container">
      <header className="Bar_access-header">
        <h1>Exclusive Nightlife Access</h1>
        <p>Experience the best bars and nightclubs in town</p>
      </header>

      <section className="Bar_access-gallery">
        <h2>Featured Venues</h2>
        <div className="Bar_image-gallery">
          <img src={barImage1} alt="Elegant bar interior" className="Bar_gallery-image" />
          <img src={barImage2} alt="Rooftop bar with city view" className="Bar_gallery-image" />
          <img src={barImage3} alt="Modern nightclub atmosphere" className="Bar_gallery-image" />
        </div>
      </section>

      <section className="Bar_access-benefits">
        <h2>Member Perks</h2>
        <ul>
          <li>Skip-the-line privileges</li>
          <li>Exclusive member-only events</li>
          <li>Special drink discounts</li>
          <li>Access to VIP areas</li>
        </ul>
      </section>
    </div>
  );
};

export default ExclusiveAccess;