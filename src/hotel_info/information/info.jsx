import React from 'react';
import { useTheme } from "../../context/ThemeContext.jsx";
import './info.css';

const HotelInfo = () => {
  const { isDarkMode } = useTheme();

  const googleMapsUrl = "https://www.google.com/maps?q=123+Sunshine+Boulevard,+Miami,+FL+33101,+USA";

  const handlePreviousClick = () => {
    console.log("Previous button clicked! Add your slide navigation logic here.");
  };

  return (
    <div className={`Info_hotel-info ${isDarkMode ? 'dark' : 'light'}`}>
      
      <h1>Grand Horizon Hotel</h1>
      <p>
        <strong>Address:</strong> 123 Sunshine Boulevard, Miami, FL 33101, USA
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="Info_location-button"
        >
          📍 Location
        </a>
      </p>
      <p><strong>Total Rooms:</strong> 250</p>
      <p><strong>Total Area:</strong> 50,000 sq. ft.</p>
      <p><strong>Rating:</strong> ⭐⭐⭐⭐ (4.5/5)</p>
      <p><strong>Contact:</strong> +1 (305) 123-4567</p>
      <p><strong>Email:</strong> info@grandhorizonhotel.com</p>
      <p>
        <strong>Website:</strong>{" "}
        <a
          href="https://www.grandhorizonhotel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.grandhorizonhotel.com
        </a>
      </p>

      <h2>Amenities</h2>
      <ul>
        {[
          "Free Wi-Fi",
          "Swimming Pool",
          "Fitness Center",
          "Spa & Wellness Center",
          "Restaurant & Bar",
          "24/7 Room Service",
          "Conference Rooms",
          "Parking Facilities",
          "Rooftop Lounge",
          "Kids' Play Area",
          "Business Center",
          "Laundry Service",
        ].map((item, index) => (
          <li key={index} style={{ '--i': index }}>{item}</li>
        ))}
      </ul>

      <h2>Room Types</h2>
      <ul>
        {[
          { title: "Standard Room", desc: "Cozy and comfortable, perfect for solo travelers or couples." },
          { title: "Deluxe Room", desc: "Spacious with a city or ocean view." },
          { title: "Executive Suite", desc: "Luxurious suite with a separate living area and premium amenities." },
          { title: "Presidential Suite", desc: "Ultimate luxury with a private balcony, Jacuzzi, and personalized services." },
        ].map((room, index) => (
          <li key={index} style={{ '--i': index }}>
            <strong>{room.title}:</strong> {room.desc}
          </li>
        ))}
      </ul>

      <h2>Dining Options</h2>
      <ul>
        {[
          { title: "Horizon Restaurant", desc: "A fine-dining experience with international cuisine." },
          { title: "Sky Lounge", desc: "Rooftop bar offering cocktails and light snacks with a panoramic view." },
          { title: "Café Breeze", desc: "Casual café serving breakfast, coffee, and pastries." },
          { title: "Poolside Grill", desc: "Enjoy grilled specialties by the pool." },
        ].map((dining, index) => (
          <li key={index} style={{ '--i': index }}>
            <strong>{dining.title}:</strong> {dining.desc}
          </li>
        ))}
      </ul>

      <h2>Nearby Attractions</h2>
      <ul>
        {[
          { title: "Miami Beach", desc: "Just 10 minutes away." },
          { title: "Downtown Miami", desc: "15-minute drive." },
          { title: "Art Deco Historic District", desc: "12 minutes away." },
          { title: "Bayside Marketplace", desc: "20 minutes by car." },
          { title: "Everglades National Park", desc: "1-hour drive." },
        ].map((attraction, index) => (
          <li key={index} style={{ '--i': index }}>
            <strong>{attraction.title}:</strong> {attraction.desc}
          </li>
        ))}
      </ul>

      <h2>About Us</h2>
      <p>
        Grand Horizon Hotel offers a luxurious stay with breathtaking views of the city and the ocean. 
        Our hotel is designed to provide the utmost comfort and convenience to our guests. 
        Whether you're here for business or leisure, we ensure a memorable experience with our top-notch services and amenities. 
        From our world-class dining options to our state-of-the-art facilities, every detail is crafted to make your stay unforgettable.
      </p>

      <h2>Why Choose Us?</h2>
      <ul>
        {[
          "Prime location in the heart of Miami.",
          "Exceptional customer service.",
          "Eco-friendly practices and sustainability initiatives.",
          "Pet-friendly policies (upon request).",
          "24/7 concierge service.",
        ].map((reason, index) => (
          <li key={index} style={{ '--i': index }}>{reason}</li>
        ))}
      </ul>
    </div>
  );
};

export default HotelInfo;