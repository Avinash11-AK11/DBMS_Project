// Services.jsx
import React from 'react';
import { FaWifi, FaSwimmingPool, FaUtensils, FaConciergeBell, FaParking, FaSpa, FaDumbbell, FaTshirt } from 'react-icons/fa';
import { MdRoomService, MdLocalLaundryService } from 'react-icons/md';
import { IoIosFitness } from 'react-icons/io';

const Services = () => {
  const hotelServices = [
    { id: 1, name: 'Free WiFi', icon: <FaWifi />, description: 'High-speed internet access throughout the hotel' },
    { id: 2, name: 'Swimming Pool', icon: <FaSwimmingPool />, description: 'Outdoor heated pool with sun loungers' },
    { id: 3, name: 'Restaurant', icon: <FaUtensils />, description: '24-hour dining with international cuisine' },
    { id: 4, name: 'Room Service', icon: <MdRoomService />, description: '24-hour in-room dining available' },
    { id: 5, name: 'Concierge', icon: <FaConciergeBell />, description: 'Personalized assistance with bookings and recommendations' },
    { id: 6, name: 'Parking', icon: <FaParking />, description: 'Secure on-site parking available (valet optional)' },
    { id: 7, name: 'Spa', icon: <FaSpa />, description: 'Full-service spa with massage and treatment rooms' },
    { id: 8, name: 'Fitness Center', icon: <IoIosFitness />, description: 'State-of-the-art gym equipment available 24/7' },
    { id: 9, name: 'Laundry', icon: <MdLocalLaundryService />, description: 'Same-day laundry and dry cleaning' },
    { id: 10, name: 'Business Center', icon: <FaDumbbell />, description: 'Meeting rooms and office facilities' },
    { id: 11, name: 'Luggage Storage', icon: <FaTshirt />, description: 'Secure storage before check-in or after check-out' },
  ];

  return (
    <div className="Service_services-container">
      <h2 className="Service_services-title">Our Hotel Services</h2>
      <p className="Service_services-subtitle">Enjoy our premium amenities during your stay</p>
      
      <div className="Service_services-grid">
        {hotelServices.map((service) => (
          <div key={service.id} className="Service_service-card">
            <div className="Service_service-icon">{service.icon}</div>
            <h3 className="Service_service-name">{service.name}</h3>
            <p className="Service_service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;