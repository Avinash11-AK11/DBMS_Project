import React, { useState } from "react";
import "./contact.css";

// Placeholder images (replace with actual paths or URLs in your project)
import avinashImg from "../../assets/images/logo/logo.webp"; // Example path
import devkrishnaImg from "../../assets/images/logo/logo.webp";
import bhagyImg from "../../assets/images/logo/logo.webp";
import rudraImg from "../../assets/images/logo/logo.webp";
import harshilImg from "../../assets/images/logo/logo.webp";
import parinImg from "../../assets/images/logo/logo.webp";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
    rating: 0,
    experienceDetails: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setStatus({ type: "", message: "" });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
    setStatus({ type: "", message: "" });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name) return "Name is required.";
    if (!formData.email || !emailRegex.test(formData.email))
      return "A valid email is required.";
    if (!formData.subject) return "Subject is required.";
    if (!formData.message) return "Message is required.";
    if (formData.category === "feedback" && formData.rating === 0)
      return "Please provide a rating.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setStatus({ type: "error", message: validationError });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Contact Form Submitted:", formData);
      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        subject: "",
        message: "",
        rating: 0,
        experienceDetails: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      subject: "",
      message: "",
      rating: 0,
      experienceDetails: "",
    });
    setStatus({ type: "", message: "" });
  };

  const categoryDetails = {
    inquiry: {
      title: "Inquiry Details",
      description:
        "For general questions or information requests, please provide as much detail as possible about what you’d like to know. Our team will respond within 24-48 hours.",
      contact: "Contact: avinashchavda11@gmail.com | +91 9313720047",
    },
    complaint: {
      title: "Complaint Details",
      description:
        "We’re sorry to hear about your issue. Please include details such as dates, room numbers, or specific incidents so we can address your complaint promptly.",
      contact: "Contact: bhagytholiya@gmail.com | +91 6357289613",
    },
    feedback: {
      title: "Feedback Details",
      description:
        "We value your input! Let us know about your experience—good or bad—so we can improve our services. Please provide a rating and additional details below.",
      contact: "Contact: feedback@hotel.com | +91-555-123-4567",
    },
    support: {
      title: "Support Details",
      description:
        "Need technical or booking assistance? Describe your issue, and our support team will assist you as soon as possible.",
      contact: "Contact: support@hotel.com | +91-444-555-6666",
    },
  };

  const selectedCategory = formData.category
    ? categoryDetails[formData.category]
    : null;

  // Function to parse the contact string and make the phone number open WhatsApp
  const renderContactInfo = (contact) => {
    const [emailPart, phonePart] = contact.split(" | ");
    const email = emailPart.replace("Contact: ", "");
    const phone = phonePart.trim();

    return (
      <p>
        <strong>
          Contact:{" "}
          <a
            href={`mailto:${email}`}
            className="email-link"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {email}
          </a>{" "}
          |{" "}
          <a
            href={`tel:${phone}`}
            className="phone-link"
            onClick={(e) => e.stopPropagation()}
          >
            {phone}
          </a>
        </strong>
      </p>
    );
  };

  return (
    <div className="Contact_us_contact-us-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <section>
          <h3>Get in Touch</h3>
          <div className="Contact_us_form-row">
            <div className="Contact_us_form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="Contact_us_form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="Contact_us_form-row">
            <div className="Contact_us_form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="Contact_us_form-group">
              <label>Message Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="inquiry">Inquiry</option>
                <option value="complaint">Complaint</option>
                <option value="feedback">Feedback</option>
                <option value="support">Support</option>
              </select>
            </div>
          </div>
          {selectedCategory && (
            <div className="Contact_us_form-row">
              <div className="Contact_us_form-group full-width">
                <div className="Contact_us_category-details">
                  <h4>{selectedCategory.title}</h4>
                  <p>{selectedCategory.description}</p>
                  {renderContactInfo(selectedCategory.contact)}
                </div>
              </div>
            </div>
          )}
          {formData.category === "feedback" && (
            <>
              <div className="Contact_us_form-row">
                <div className="Contact_us_form-group full-width">
                  <label>Rate Your Experience * (1-5)</label>
                  <div className="Contact_us_rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          formData.rating >= star ? "star filled" : "star"
                        }
                        onClick={() => handleRatingChange(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="Contact_us_form-row">
                <div className="Contact_us_form-group full-width">
                  <label>Experience Details</label>
                  <textarea
                    name="experienceDetails"
                    value={formData.experienceDetails}
                    onChange={handleChange}
                    placeholder="Tell us more about your experience (e.g., staff, service, facilities)"
                  />
                </div>
              </div>
            </>
          )}
          <div className="Contact_us_form-row">
            <div className="Contact_us_form-group full-width">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter the subject"
                required
              />
            </div>
          </div>
          <div className="Contact_us_form-row">
            <div className="Contact_us_form-group full-width">
              <label>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here"
                required
              />
            </div>
          </div>
          {status.message && (
            <div className="Contact_us_form-row">
              <div className="Contact_us_form-group full-width">
                <div className={`status-message ${status.type}`}>
                  {status.message}
                </div>
              </div>
            </div>
          )}
          <div className="Contact_us_form-buttons">
            <button
              type="submit"
              className="Contact_us_submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            <button
              type="button"
              className="Contact_us_reset-button"
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Reset Form
            </button>
          </div>
        </section>
      </form>

      {/* Our Team Section */}
      <div className="Contact_us_footer-container">
        <h3>Our Team</h3>
        <div className="Contact_us_team-members">
          <div className="team-row">
            <div className="Contact_us_team-member">
              <img src={avinashImg} alt="Avinash" className="team-member-img" />
              <h4>Avinash</h4>
              <p>
                📞 <a href="tel:+919876543210">+91 98765 43210</a>
              </p>
            </div>
            <div className="Contact_us_team-member">
              <img
                src={devkrishnaImg}
                alt="Devkrishna"
                className="team-member-img"
              />
              <h4>Devkrishna</h4>
              <p>
                📞 <a href="tel:+918765432109">+91 87654 32109</a>
              </p>
            </div>
            <div className="Contact_us_team-member">
              <img src={bhagyImg} alt="Bhagy" className="team-member-img" />
              <h4>Bhagy</h4>
              <p>
                📞 <a href="tel:+917654321098">+91 76543 21098</a>
              </p>
            </div>
          </div>
          <div className="team-row">
            <div className="Contact_us_team-member">
              <img src={rudraImg} alt="Rudra" className="team-member-img" />
              <h4>Rudra</h4>
              <p>
                📞 <a href="tel:+917654321098">+91 76543 21098</a>
              </p>
            </div>
            <div className="Contact_us_team-member">
              <img src={harshilImg} alt="Harshil" className="team-member-img" />
              <h4>Harshil</h4>
              <p>
                📞 <a href="tel:+917654321098">+91 76543 21098</a>
              </p>
            </div>
            <div className="Contact_us_team-member">
              <img src={parinImg} alt="Parin" className="team-member-img" />
              <h4>Parin</h4>
              <p>
                📞 <a href="tel:+917654321098">+91 76543 21098</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
