// FitnessCenter.jsx
import React, { useState } from 'react';
import { useTheme } from "../../context/ThemeContext.jsx";
import './fitness.css';
import gymImage1 from '../../assets/images/img/home-1.jpg'; 
import gymImage2 from '../../assets/images/img/home-1.jpg';
import gymImage3 from '../../assets/images/img/home-1.jpg';

const FitnessCenter = () => {
  const { isDarkMode } = useTheme();

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Membership request submitted for:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="Fitness_fitness-center-container">
      <header className="Fitness_fitness-header">
        <h1>Elite Fitness Center</h1>
        <p>Transform your body, elevate your mind</p>
      </header>

      <section className="Fitness_fitness-gallery">
        <h2>Our Facilities</h2>
        <div className="Fitness_image-gallery">
          <img src={gymImage1} alt="Modern gym equipment" className="Fitness_gallery-image" />
          <img src={gymImage2} alt="Group fitness class" className="Fitness_gallery-image" />
          <img src={gymImage3} alt="Luxury locker room" className="Fitness_gallery-image" />
        </div>
      </section>

      <section className="Fitness_fitness-benefits">
        <h2>Membership Benefits</h2>
        <ul>
          <li>24/7 gym access</li>
          <li>Personal training sessions</li>
          <li>Group fitness classes</li>
          <li>Sauna and spa facilities</li>
          <li>Nutrition counseling</li>
        </ul>
      </section>
    </div>
  );
};

export default FitnessCenter;