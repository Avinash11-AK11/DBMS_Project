import React, { useState } from "react";
import "./movie.css";
import { useTheme } from "../../context/ThemeContext.jsx";
import theaterImage1 from "../../assets/images/img/home-1.jpg";
import theaterImage2 from "../../assets/images/img/home-1.jpg";
import theaterImage3 from "../../assets/images/img/home-1.jpg";
import moviePoster1 from "../../assets/images/img/home-1.jpg";
import moviePoster2 from "../../assets/images/img/home-1.jpg";
import moviePoster3 from "../../assets/images/img/home-1.jpg";

const MovieTheater = () => {
  const { isDarkMode } = useTheme();

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const liveMovies = [
    {
      title: "The Galactic Adventure",
      time: "7:00 PM",
      rating: "PG-13",
      poster: moviePoster1,
    },
    {
      title: "Mystery of the Lost City",
      time: "8:30 PM",
      rating: "R",
      poster: moviePoster2,
    },
    {
      title: "Love in the Stars",
      time: "9:15 PM",
      rating: "PG",
      poster: moviePoster3,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter subscription requested for:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="Theater_movie-theater-container">
      <header className="Theater_theater-header">
        <h1>Premiere Movie Theater</h1>
        <p>Experience cinema like never before</p>
      </header>

      <section className="Theater_live-movies">
        <h2>Now Showing</h2>
        <div className="Theater_movies-list">
          {liveMovies.map((movie, index) => (
            <div key={index} className="Theater_movie-card">
              <img
                src={movie.poster}
                alt={`${movie.title} poster`}
                className="Theater_movie-poster"
              />
              <div className="Theater_movie-details">
                <h3>{movie.title}</h3>
                <p>Showtime: {movie.time}</p>
                <p>Rating: {movie.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="Theater_theater-gallery">
        <h2>Our Theater</h2>
        <div className="Theater_image-gallery">
          <img
            src={theaterImage1}
            alt="Luxury theater seats"
            className="Theater_gallery-image"
          />
          <img
            src={theaterImage2}
            alt="Wide cinema screen"
            className="Theater_gallery-image"
          />
          <img
            src={theaterImage3}
            alt="Modern lobby"
            className="Theater_gallery-image"
          />
        </div>
      </section>

      <section className="Theater_theater-benefits">
        <h2>Why Choose Us</h2>
        <ul>
          <li>State-of-the-art sound systems</li>
          <li>Premium reclining seats</li>
          <li>Exclusive screenings</li>
          <li>Gourmet concessions</li>
        </ul>
      </section>

      {/* <section className="Theater_theater-form">
        <h3>Stay Updated</h3>
        <p>Get the latest movie schedules and offers</p>
      </section> */}

      <footer className="Theater_theater-footer">
        <p>
          Showtimes subject to change. All ages welcome with appropriate
          tickets.
        </p>
      </footer>
    </div>
  );
};

export default MovieTheater;
