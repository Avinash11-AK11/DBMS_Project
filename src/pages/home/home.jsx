import React, { useEffect } from "react";
// import { useTheme } from "../../context/ThemeContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; 
import * as bootstrap from "bootstrap"; 
import "./home.css";

// Import images (adjusted paths based on your structure)
import home1 from "../../assets/images/img/home-1.jpg";    // First image
import home2 from "../../assets/images/img/home-2.jpeg";   // Second image
import home3 from "../../assets/images/img/home-3.webp";   // Third image
import home4 from "../../assets/images/img/home-4.0.webp";    // Fourth image (assuming this exists)
import home5 from "../../assets/images/img/home-4.webp";    // Fifth image (assuming this exists)

const Home = () => {
  // const { isDarkMode } = useTheme();

  // Manually initialize the carousel to ensure sliding works
  useEffect(() => {
    const carouselElement = document.querySelector("#carouselExampleIndicators");
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        ride: "carousel", 
        interval: 3000,   // Slide every 3 seconds
        pause: false,     // Don’t pause on hover
      });
    }
  }, []);

  return (
    <>
      {/* Hero Carousel */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide Home_carousel"
        data-bs-ride="carousel"
        data-bs-interval="3000"
        data-bs-pause="false"
      >
        <div className="carousel-indicators Home_carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
        </div>

        <div className="carousel-inner Home_carousel-inner">
          <div className="carousel-item Home_carousel-item active">
            <img
              src={home1}
              className="d-block w-100 Home_d-block"
              alt="First Slide"
            />
            <div className="carousel-caption Home_carousel-caption">
              <h5>ENJOY YOUR STAY WITH US</h5>
              <p>Quality & reliable services to our guests and customers</p>
            </div>
          </div>
          <div className="carousel-item Home_carousel-item">
            <img
              src={home2}
              className="d-block w-100 Home_d-block"
              alt="Second Slide"
            />
            <div className="carousel-caption Home_carousel-caption">
              <h5>EXPERIENCE LUXURY LIKE NEVER BEFORE</h5>
              <p>Book your perfect holiday with us today!</p>
            </div>
          </div>
          <div className="carousel-item Home_carousel-item">
            <img
              src={home3}
              className="d-block w-100 Home_d-block"
              alt="Third Slide"
            />
            <div className="carousel-caption Home_carousel-caption">
              <h5>EXPERIENCE LUXURY FOOD LIKE NEVER BEFORE</h5>
              <p>Your perfect holiday with us today!</p>
            </div>
          </div>
          <div className="carousel-item Home_carousel-item">
            <img
              src={home4}
              className="d-block w-100 Home_d-block"
              alt="Fourth Slide"
            />
            <div className="carousel-caption Home_carousel-caption">
              <h5>UNWIND IN STYLE</h5>
              <p>Relax with our world-class amenities and services</p>
            </div>
          </div>
          <div className="carousel-item Home_carousel-item">
            <img
              src={home5}
              className="d-block w-100 Home_d-block"
              alt="Fifth Slide"
            />
            <div className="carousel-caption Home_carousel-caption">
              <h5>DISCOVER PARADISE</h5>
              <p>Create unforgettable memories at our stunning location</p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="carousel-control-prev Home_carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon Home_carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next Home_carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon Home_carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Hotel Info Section */}
      <div className="Home_hotel-info">
        <h2>Hotel Information</h2>
        <div className="Home_info-details">
          <a href="/info">
            <div className="Home_info-item">
              <h4>Hotel Information</h4>
              <p>Hotel Transylvania</p>
            </div>
          </a>
          <a href="/rules">
            <div className="Home_info-item">
              <h4>Hotel Rules:</h4>
              <p>Rules for Hotel</p>
            </div>
          </a>
          <a href="#">
            <div className="Home_info-item">
              <h4>Special Amenities:</h4>
              <p>Spa, Gym, Swimming Pool</p>
            </div>
          </a>
        </div>
      </div>

      {/* Services Section */}
      <div className="Home_services-section">
        <h2>🌟 Our Premium Services</h2>
        <p>
          We offer top-notch facilities to make your stay comfortable and
          memorable.
        </p>

        <div className="Home_services-grid">
          <div className="Home_service-item">
            <i className="fas fa-concierge-bell"></i>
            <h4>24/7 Room Service</h4>
            <p>Enjoy round-the-clock room service with just a call.</p>
          </div>

          <a href="/free-wifi">
            <div className="Home_service-item">
              <i className="fas fa-wifi"></i>
              <h4>Free High-Speed Wi-Fi</h4>
              <p>
                Stay connected with complimentary high-speed internet
                throughout the hotel.
              </p>
            </div>
          </a>

          <a href="/spa">
            <div className="Home_service-item">
              <i className="fas fa-spa"></i>
              <h4>Luxury Spa</h4>
              <p>Relax and rejuvenate with our premium spa services.</p>
            </div>
          </a>

          <a href="/pool">
            <div className="Home_service-item">
              <i className="fas fa-swimming-pool"></i>
              <h4>Swimming Pool</h4>
              <p>Take a refreshing dip in our outdoor swimming pool.</p>
            </div>
          </a>

          <a href="/bar">
            <div className="Home_service-item">
              <i className="fas fa-car"></i>
              <h4>Exclusive Access to Nightclub and Bar</h4>
              <p>Dance the Night Away – VIP Access to Trendy Bar.</p>
            </div>
          </a>

          <a href="#">
            <div className="Home_service-item">
              <i className="fas fa-utensils"></i>
              <h4>Multi-Cuisine Restaurant</h4>
              <p>
                Experience fine dining with delicious international cuisines.
              </p>
            </div>
          </a>

          <a href="/fitness">
            <div className="Home_service-item">
              <i className="fas fa-dumbbell"></i>
              <h4>Fitness Center</h4>
              <p>Stay fit during your stay with our fully equipped gym.</p>
            </div>
          </a>

          <a href="/movie">
            <div className="Home_service-item">
              <i className="fas fa-film"></i>
              <h4>Movie Theater</h4>
              <p>Enjoy the latest movies in our private in-house theater.</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Home;