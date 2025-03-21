import React, { useState } from "react";
import bedroomImage from "../../assets/Room/bed-room.jpg";
import { useTheme } from "../../context/ThemeContext.jsx";
import "./Room.css";

const roomsData = [
  {
    image: bedroomImage,
    name: "Deluxe Room",
    rating: 8.5,
    description: "Spacious room with premium amenities and a stunning view.",
    price: "₹5,999/night",
    type: "single",
  },
  {
    image: bedroomImage,
    name: "Executive Suite",
    rating: 9.0,
    description: "Elegant and comfortable with extra space and luxury features.",
    price: "₹8,499/night",
    type: "suite",
  },
  {
    image: bedroomImage,
    name: "Family Suite",
    rating: 8.8,
    description: "Ideal for families with separate living and sleeping areas.",
    price: "₹10,999/night",
    type: "suite",
  },
  {
    image: bedroomImage,
    name: "Honeymoon Suite",
    rating: 9.2,
    description: "Romantic and luxurious, perfect for couples.",
    price: "₹12,999/night",
    type: "suite",
  },
  {
    image: bedroomImage,
    name: "Budget Room",
    rating: 7.5,
    description: "Affordable and comfortable for budget travelers.",
    price: "₹3,499/night",
    type: "single",
  },
  {
    image: bedroomImage,
    name: "Superior Room",
    rating: 8.7,
    description: "Modern decor and advanced facilities for extra comfort.",
    price: "₹6,499/night",
    type: "double",
  },
  {
    image: bedroomImage,
    name: "Single Room",
    rating: 7.8,
    description: "Compact and cozy, perfect for solo travelers.",
    price: "₹2,999/night",
    type: "single",
  },
  {
    image: bedroomImage,
    name: "Twin Room",
    rating: 8.3,
    description: "Comfortable room with two single beds for sharing.",
    price: "₹4,799/night",
    type: "double",
  },
  {
    image: bedroomImage,
    name: "Garden View Room",
    rating: 8.4,
    description: "Relax with a serene garden view and modern amenities.",
    price: "₹6,999/night",
    type: "double",
  },
  {
    image: bedroomImage,
    name: "Royal Suite",
    rating: 9.8,
    description: "Unparalleled luxury with royal treatment and facilities.",
    price: "₹30,999/night",
    type: "suite",
  },
  {
    image: bedroomImage,
    name: "Business Room",
    rating: 8.6,
    description: "Tailored for business travelers with workspace and Wi-Fi.",
    price: "₹7,499/night",
    type: "single",
  },
  {
    image: bedroomImage,
    name: "Premium Suite",
    rating: 8.9,
    description: "A luxurious suite with top-tier amenities and a private balcony.",
    price: "₹12,999/night",
    type: "suite",
  },
];

const RoomCard = ({ room }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="room-card">
      <img src={room.image} alt={room.name} className="room-image" />
      <div className="room-content">
        <span className="room-rating">{room.rating}</span>
        <h3 className="room-name">{room.name}</h3>
        <p className="room-description">{room.description}</p>
        <p className="room-price">{room.price}</p>
        <button className="room-book-button">Book Now</button>
      </div>
    </div>
  );
};

const Navbar = ({ onSearch }) => {
  const [roomType, setRoomType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");

  const handleSearch = () => {
    onSearch({ roomType, priceRange, rating });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="filters">
          <select
            className="filter-select"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="">Select Room Type</option>
            <option value="single">Single Room</option>
            <option value="double">Double Room</option>
            <option value="suite">Suite</option>
          </select>

          <select
            className="filter-select"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Select Price Range</option>
            <option value="0-5000">₹0 - ₹5,000</option>
            <option value="5000-10000">₹5,000 - ₹10,000</option>
            <option value="10000+">₹10,000+</option>
          </select>

          <select
            className="filter-select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Select Rating</option>
            {[...Array(10).keys()].map((rating) => (
              <option key={rating + 1} value={rating + 1}>
                {rating + 1} Star{rating + 1 !== 1 ? "s" : ""}
              </option>
            ))}
          </select>

          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

const RoomsPage = () => {
  const [filteredRooms, setFilteredRooms] = useState(roomsData);

  const handleSearch = ({ roomType, priceRange, rating }) => {
    const results = roomsData.filter((room) => {
      return (
        (!roomType || room.type === roomType) &&
        (!priceRange || checkPriceRange(room.price, priceRange)) &&
        (!rating || room.rating >= parseFloat(rating))
      );
    });
    setFilteredRooms(results);
  };

  const checkPriceRange = (price, range) => {
    const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
    switch (range) {
      case "0-5000":
        return numericPrice <= 5000;
      case "5000-10000":
        return numericPrice > 5000 && numericPrice <= 10000;
      case "10000+":
        return numericPrice > 10000;
      default:
        return true;
    }
  };

  return (
    <div className="rooms-page">
      <Navbar onSearch={handleSearch} />
      <div className="rooms-container">
        <h2 className="page-title">Discover Your Perfect Stay</h2>
        <div className="rooms-grid">
          {filteredRooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;