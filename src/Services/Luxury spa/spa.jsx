import React from 'react';
import './spa.css';
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600&display=swap" rel="stylesheet"></link>


const LuxurySpa = () => {
  const services = [
    {
      title: 'Full Body Massage',
      image: './src/assets/bed-room.jpg',
      alt: 'Massage Therapy',
      description: 'Relax and rejuvenate with a soothing full-body massage.',
    },
    {
      title: 'Aromatherapy',
      image: './src/assets/bed-room.jpg',
      alt: 'Aromatherapy',
      description: 'Experience the healing power of essential oils.',
    },
    {
      title: 'Facial Treatments',
      image: './src/assets/bed-room.jpg',
      alt: 'Facial Treatment',
      description: 'Glow with our luxurious facial treatments tailored to your skin.',
    },
    {
      title: 'Hot Stone Therapy',
      image: './src/assets/bed-room.jpg',
      alt: 'Hot Stone Therapy',
      description: 'Melt away tension with warm stones and expert techniques.',
    },
    {
      title: 'Manicure & Pedicure',
      image: './src/assets/bed-room.jpg',
      alt: 'Manicure and Pedicure',
      description: 'Pamper your hands and feet with our premium nail care.',
    },
    {
      title: 'Deep Tissue Massage',
      image: './src/assets/bed-room.jpg',
      alt: 'Deep Tissue Massage',
      description: 'Target deep muscle layers for ultimate relief.',
    },
  ];

  return (
    <div className="luxury-spa-wrapper">
      <header className="spa-header">
        <h1>Luxury Spa</h1>
        <p>Indulge in a world of relaxation and wellness.</p>
      </header>
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service" key={index}>
              <img src={service.image} alt={service.alt} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        <button className="book-now-btn">Book Now</button>
      </section>
    </div>
  );
};

export default LuxurySpa;