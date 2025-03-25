import React from 'react';
// import { useTheme } from "../../context/ThemeContext.jsx";
import { Link } from 'react-router-dom';
import './About.css';

const AboutUs = () => {
    // const { isDarkMode } = useTheme();

    return (
        <div>

            {/* About Us Content */}
            <div className="About_us_about-container">
                <header>
                    <h1>About Us</h1>
                    <p>Learn more about our mission, vision, values, and the dedicated team behind our success.</p>
                </header>

                <section className="About_us_about-content">
                    <h2>✨ Our Mission</h2>
                    <p>Our mission is to provide users with seamless booking experiences and exceptional customer support. We strive to make booking simple, efficient, and stress-free for everyone.</p>

                    <h2>🚀 Our Vision</h2>
                    <p>We envision a world where technology bridges the gap between users and services, ensuring hassle-free access to bookings and accommodations anytime, anywhere.</p>

                    <h2>💡 What We Offer</h2>
                    <ul>
                        <li>User-friendly booking system</li>
                        <li>24/7 customer support</li>
                        <li>Secure payment options</li>
                        <li>Flexible cancellation policies</li>
                        <li>Personalized booking recommendations</li>
                        <li>Real-time availability updates</li>
                    </ul>

                    <h2>🤝 Our Values</h2>
                    <ul>
                        <li><strong>Customer First:</strong> Prioritizing user needs and satisfaction.</li>
                        <li><strong>Innovation:</strong> Embracing technology to deliver efficient solutions.</li>
                        <li><strong>Transparency:</strong> Maintaining honesty in all processes.</li>
                        <li><strong>Collaboration:</strong> Working together for continuous improvement.</li>
                        <li><strong>Sustainability:</strong> Promoting eco-friendly practices.</li>
                    </ul>

                    <h2>👥 Meet Our Team</h2>
                    <p>Our team comprises passionate professionals dedicated to delivering the best user experience. From developers and designers to customer support specialists, each member plays a vital role in our journey.</p>

                    {/* <h2>📞 Contact Us</h2>
                    <p>Need more details? <a href="mailto:support@roombooking.com">Email us</a> or <a href="tel:+1234567890">call us</a>. Our support team is available 24/7 to assist you.</p> */}
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
