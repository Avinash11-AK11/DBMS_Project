import React from 'react';
import { useTheme } from "../../context/ThemeContext.jsx";
import './rules.css'; 

const PropertyRules = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`Rules_property-rules ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>Property Rules</h1>

      {/* Guest Profile Section */}
      <section className="Rules_rules-section">
        <h2>Guest Profile</h2>
        <ul>
          <li>Guests below 18 years of age are allowed.</li>
          <li>Children are allowed.</li>
          <li>Unmarried couples are allowed.</li>
          <li>Bachelors are allowed.</li>
          <li>Guests must provide valid government-issued ID at check-in.</li>
        </ul>
      </section>

      {/* Food & Beverages Section */}
      <section className="Rules_rules-section">
        <h2>Food & Beverages</h2>
        <ul>
          <li>Alcohol consumption is allowed within the premises.</li>
          <li>Food from outside is NOT allowed within the premises.</li>
          <li>Non-vegetarian food is allowed within the premises.</li>
          <li>Room service is available from 7 AM to 10 PM.</li>
        </ul>
      </section>

      {/* Check-in & Check-out Policy Section */}
      <section className="Rules_rules-section">
        <h2>Check-in & Check-out Policy</h2>
        <ul>
          <li>Check-in time: 2:00 PM | Check-out time: 11:00 AM.</li>
          <li>Early check-in or late check-out is subject to availability and additional charges.</li>
          <li>
            Certain hotels may have mandatory gala dinner charges for Christmas and New Year’s Eve, payable directly at the property during check-in.
          </li>
        </ul>
      </section>

      {/* Restrictions Section */}
      <section className="Rules_rules-section">
        <h2>Restrictions</h2>
        <ul>
          <li>Pets are allowed within the premises.</li>
          <li className="Rules_restricted">Smoking is NOT allowed within the premises.</li>
          <li className="Rules_restricted">Loud music or parties are prohibited after 10 PM.</li>
          <li className="Rules_restricted">Illegal substances are strictly forbidden.</li>
        </ul>
      </section>

      {/* Payment Policy Section */}
      <section className="Rules_rules-section">
        <h2>Payment Policy</h2>
        <ul>
          <li>Guests can pay by Debit/Credit Card (VISA & Mastercard).</li>
          <li>Full payment is required at the time of booking.</li>
          <li>Cancellation fees apply as per the booking policy.</li>
        </ul>
      </section>

      {/* Safety & Security Section */}
      <section className="Rules_rules-section">
        <h2>Safety & Security</h2>
        <ul>
          <li>Property staff understands all hygiene guidelines.</li>
          <li>All common areas are fully sanitized regularly.</li>
          <li>All rooms are fully sanitized between two stays.</li>
          <li>Guests are required to have the Arogya Setu app installed.</li>
          <li>CCTV surveillance is active in all public areas.</li>
        </ul>
      </section>

      {/* Additional Rules Section */}
      <section className="Rules_rules-section">
        <h2>Additional Rules</h2>
        <ul>
          <li>Guests must not damage property; repair costs will be charged.</li>
          <li>Maximum of 2 guests per room unless specified otherwise.</li>
          <li>Swimming pool access (if available) is from 8 AM to 8 PM only.</li>
        </ul>
      </section>
    </div>
  );
};

export default PropertyRules;