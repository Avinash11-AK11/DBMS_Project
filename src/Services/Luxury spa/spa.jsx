import React from 'react';
import { useTheme } from "../../context/ThemeContext.jsx";
import './spa.css';

const LuxurySpa = () => {
  const { isDarkMode } = useTheme();
  
  const services = [
    {
      title: 'Full Body Massage',
      image: './src/assets/images/img/home-1.jpg',
      alt: 'Massage Therapy',
      description: 'Relax and rejuvenate with a soothing full-body massage.',
    },
    {
      title: 'Aromatherapy',
      image: './src/assets/images/img/home-1.jpg',
      alt: 'Aromatherapy',
      description: 'Experience the healing power of essential oils.',
    },
    {
      title: 'Facial Treatments',
      image: './src/assets/images/img/home-1.jpg',
      alt: 'Facial Treatment',
      description: 'Glow with our luxurious facial treatments tailored to your skin.',
    },
    {
      title: 'Hot Stone Therapy',
      image: './src/assets/images/img/home-1.jpg',
      alt: 'Hot Stone Therapy',
      description: 'Melt away tension with warm stones and expert techniques.',
    },
    {
      title: 'Manicure & Pedicure',
      image: './src/assets/images/img/home-1.jpg',
      alt: 'Manicure and Pedicure',
      description: 'Pamper your hands and feet with our premium nail care.',
    },
    {
      title: 'Deep Tissue Massage',
      image: './src/assets/images/img/home-1.jpg',
      alt: 'Deep Tissue Massage',
      description: 'Target deep muscle layers for ultimate relief.',
    },
  ];

  return (
    <div className={`Spa_luxury-spa-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="Spa_spa-header">
        <h1>Luxury Spa</h1>
        <p>Indulge in a world of relaxation and wellness.</p>
      </header>
      <section className="Spa_services-section">
        <h2>Our Services</h2>
        <div className="Spa_services-grid">
          {services.map((service, index) => (
            <div className="Spa_service" key={index}>
              <img src={service.image} alt={service.alt} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LuxurySpa;