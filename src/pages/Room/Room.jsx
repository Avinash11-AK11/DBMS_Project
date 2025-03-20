import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import bedroomImage from "../../assets/Room/bed-room.jpg";
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
//   {
//     image: bedroomImage,
//     name: "Presidential Suite",
//     rating: 9.5,
//     description: "Ultimate luxury with top-tier amenities and services.",
//     price: "₹25,999/night",
//     type: "suite",
//   },
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
//   {
//     image: bedroomImage,
//     name: "Junior Suite",
//     rating: 8.9,
//     description: "Perfect balance of luxury and affordability.",
//     price: "₹9,999/night",
//     type: "suite",
//   },
  {
    image: bedroomImage,
    name: "Garden View Room",
    rating: 8.4,
    description: "Relax with a serene garden view and modern amenities.",
    price: "₹6,999/night",
    type: "double",
  },
//   {
//     image: bedroomImage,
//     name: "Ocean View Room",
//     rating: 9.0,
//     description: "Wake up to breathtaking views of the ocean.",
//     price: "₹11,999/night",
//     type: "double",
//   },
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
//   {
//     image: bedroomImage,
//     name: "Private Villa Room",
//     rating: 9.3,
//     description: "Enjoy privacy with luxury in a private villa setting.",
//     price: "₹18,999/night",
//     type: "suite",
//   },
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
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-center">
        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
          {room.rating}
        </span>
        <h3 className="text-lg font-semibold mt-2">{room.name}</h3>
        <p className="text-gray-600 mt-2">{room.description}</p>
        <p className="font-bold text-gray-700 mt-2">{room.price}</p>
        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Book Now
        </button>
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
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Room Selection Filter */}
        <div className="flex space-x-4 items-center">
          {/* Room Type Dropdown */}
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

          {/* Price Range Dropdown */}
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

          {/* Rating Dropdown (1 to 10) */}
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

          {/* Search Button */}
          <button
            className="search-button"
            onClick={handleSearch}
          >
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
    <div>
      <Navbar onSearch={handleSearch} /> {/* Add the Navbar here */}
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Discover Your Perfect Stay
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;