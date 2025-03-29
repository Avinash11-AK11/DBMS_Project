import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";
import "./Book.css";

const RoomBookingPage = () => {
  const { isDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;

  // Services data
  const services = {
    spa: [
      { name: "Full Body Massage", price: 2000 },
      { name: "Aromatherapy", price: 1500 },
      { name: "Facial Treatment", price: 2500 },
    ],
    swimmingPool: [
      { name: "Pool Pass", price: 0 },
      { name: "Swimming Pool Costume", price: 200 },
    ],
    movieTheater: [
      { name: "Standard Ticket", price: 300 },
      { name: "Premium Ticket", price: 500 },
    ],
    fitnessCenter: [
      { name: "Day Pass", price: 0 },
    ],
  };

  // Constants for calculations
  const PER_ADULT_CHARGE = 0;
  const PER_CHILD_CHARGE = 0;
  const HOTEL_CHARGES_PERCENTAGE = 0.03;
  const GST_RATE = 0.08;

  // State initialization with proper room check
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    arrivalFrom: "",
    roomType: room?.type || "",
    roomNo: room?.name || "",
    adults: room?.type === "double" ? 2 : 1,
    children: 0,
    mobileNo: "",
    title: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    gender: "",
    dob: "",
    identityType: "",
    identityNumber: "",
    paymentMethod: "",
    upiId: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    totalAmount: 0,
    selectedServices: [],
  });

  const [showUpiField, setShowUpiField] = useState(false);
  const [showCardFields, setShowCardFields] = useState(false);
  const [showBankFields, setShowBankFields] = useState(false);
  const [showCashInfo, setShowCashInfo] = useState(false);

  // Handle missing room data
  if (!room) {
    return (
      <div className="Book-Now_room-booking-container" data-theme={isDarkMode ? "dark" : "light"}>
        <div className="Book-Now_no-room-selected">
          <h2>No Room Selected</h2>
          <p>Please go back and select a room to book.</p>
          <button 
            className="Book-Now_back-button"
            onClick={() => navigate('/room')}
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  // Calculate total amount whenever dependencies change
  useEffect(() => {
    const calculateTotalAmount = () => {
      const roomPrice = parseInt(room.price.replace(/[^0-9]/g, ""), 10);
      const servicePrice = formData.selectedServices.reduce((total, service) => {
        const serviceType = Object.keys(services).find(type => 
          services[type].some(s => s.name === service)
        );
        const selectedService = services[serviceType]?.find(s => s.name === service);
        return total + (selectedService ? selectedService.price : 0);
      }, 0);

      const baseAdults = room.type === "double" ? 2 : 1;
      const extraAdults = Math.max(0, formData.adults - baseAdults);
      const adultsCharge = extraAdults * PER_ADULT_CHARGE;
      const childrenCharge = formData.children * PER_CHILD_CHARGE;
      const subtotal = roomPrice + adultsCharge + childrenCharge + servicePrice;
      const hotelChargesAndGST = subtotal * (HOTEL_CHARGES_PERCENTAGE + GST_RATE);
      const totalAmount = subtotal + hotelChargesAndGST;

      setFormData(prev => ({ ...prev, totalAmount }));
    };

    calculateTotalAmount();
  }, [formData.selectedServices, formData.adults, formData.children, room]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "paymentMethod") {
      handlePaymentMethodChange(value);
    } else if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        selectedServices: checked
          ? [...prev.selectedServices, value]
          : prev.selectedServices.filter(service => service !== value),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (method) => {
    setShowUpiField(method === "upi");
    setShowCardFields(method === "credit_card" || method === "debit_card");
    setShowBankFields(method === "bank_payment");
    setShowCashInfo(method === "cash");

    setFormData(prev => ({
      ...prev,
      paymentMethod: method,
      upiId: method !== "upi" ? "" : prev.upiId,
      cardNumber: method !== "credit_card" && method !== "debit_card" ? "" : prev.cardNumber,
      expiryDate: method !== "credit_card" && method !== "debit_card" ? "" : prev.expiryDate,
      cvv: method !== "credit_card" && method !== "debit_card" ? "" : prev.cvv,
      bankName: method !== "bank_payment" ? "" : prev.bankName,
      accountNumber: method !== "bank_payment" ? "" : prev.accountNumber,
      ifscCode: method !== "bank_payment" ? "" : prev.ifscCode,
    }));
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    alert("Booking submitted successfully!");
    navigate('/confirmation', { state: { booking: formData, room } });
  };

  // Handle payment
  const handleMakePayment = (e) => {
    e.preventDefault();
    if (formData.totalAmount <= 0) {
      alert("Please enter a valid total amount.");
      return;
    }

    let paymentMessage = "";
    switch (formData.paymentMethod) {
      case "upi":
        if (formData.upiId) {
          paymentMessage = `Payment of ₹${formData.totalAmount} initiated to UPI ID: ${formData.upiId}`;
        }
        break;
      case "credit_card":
      case "debit_card":
        if (formData.cardNumber && formData.expiryDate && formData.cvv) {
          paymentMessage = `Payment of ₹${formData.totalAmount} initiated via ${formData.paymentMethod === "credit_card" ? "Credit" : "Debit"} Card ending in ${formData.cardNumber.slice(-4)}`;
        }
        break;
      case "bank_payment":
        if (formData.bankName && formData.accountNumber && formData.ifscCode) {
          paymentMessage = `Payment of ₹${formData.totalAmount} initiated via Bank Transfer to Account: ${formData.accountNumber}`;
        }
        break;
      case "cash":
        paymentMessage = `Please pay ₹${formData.totalAmount} in cash at the reception.`;
        break;
      default:
        paymentMessage = "Please select a valid payment method and fill in all required details.";
    }

    if (!paymentMessage.includes("Please select")) {
      alert(paymentMessage);
      handleSubmit(e);
    } else {
      alert(paymentMessage);
    }
  };

  // Handle guest counter changes
  const incrementAdults = () => setFormData(prev => ({ ...prev, adults: prev.adults + 1 }));
  const decrementAdults = () => {
    if (formData.adults > (room.type === "double" ? 2 : 1)) {
      setFormData(prev => ({ ...prev, adults: prev.adults - 1 }));
    }
  };
  const incrementChildren = () => setFormData(prev => ({ ...prev, children: prev.children + 1 }));
  const decrementChildren = () => {
    if (formData.children > 0) {
      setFormData(prev => ({ ...prev, children: prev.children - 1 }));
    }
  };

  // Calculate amount details
  const amountDetails = {
    roomPrice: parseInt(room.price.replace(/[^0-9]/g, ""), 10),
    adultsCharge: Math.max(0, formData.adults - (room.type === "double" ? 2 : 1)) * PER_ADULT_CHARGE,
    childrenCharge: formData.children * PER_CHILD_CHARGE,
    servicePrice: formData.selectedServices.reduce((total, service) => {
      const serviceType = Object.keys(services).find(type => 
        services[type].some(s => s.name === service)
      );
      const selectedService = services[serviceType]?.find(s => s.name === service);
      return total + (selectedService?.price || 0);
    }, 0),
    get hotelChargesAndGST() {
      return (this.roomPrice + this.adultsCharge + this.childrenCharge + this.servicePrice) * 
             (HOTEL_CHARGES_PERCENTAGE + GST_RATE);
    },
    get totalAmount() {
      return this.roomPrice + this.adultsCharge + this.childrenCharge + 
             this.servicePrice + this.hotelChargesAndGST;
    }
  };

  return (
    <div className="Book-Now_room-booking-container" data-theme={isDarkMode ? "dark" : "light"}>
      <div className="Book-Now_room-booking-wrapper">
        {/* Room Details Section */}
        <div className="Book-Now_room-details-section">
          <div className="Book-Now_room-image-container">
            <img src={room.image} alt={room.name} className="Book-Now_room-image" />
          </div>
          <div className="Book-Now_room-info">
            <h2>{room.name}</h2>
            <div className="Book-Now_room-rating">Rating: {room.rating}/10</div>
            <p className="Book-Now_room-description">{room.description}</p>
            <div className="Book-Now_room-price">{room.price}</div>
            <div className="Book-Now_room-type">
              Type: {room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room
            </div>
          </div>
        </div>

        {/* Booking Form Section */}
        <form onSubmit={handleSubmit} className="Book-Now_booking-form">
          <h2>Booking Details</h2>
          
          {/* Reservation Details */}
          <section className="Book-Now_reservation-details">
            <h3>Reservation Details</h3>
            <div className="Book-Now_form-row">
              <div className="Book-Now_form-group">
                <label>Check In *</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="Book-Now_form-group">
                <label>Check Out *</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  required
                  min={formData.checkIn || new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="Book-Now_form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="arrivalFrom"
                  value={formData.arrivalFrom}
                  onChange={handleChange}
                  placeholder="Your address"
                />
              </div>
            </div>
          </section>

          {/* Guest Details */}
          <section className="Book-Now_guest-details">
            <h3>Guest Details</h3>
            <div className="Book-Now_form-row">
              <div className="Book-Now_form-group">
                <label>Adults</label>
                <div className="Book-Now_counter">
                  <button
                    type="button"
                    className="Book-Now_counter-button"
                    onClick={decrementAdults}
                    disabled={formData.adults <= (room.type === "double" ? 2 : 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="adults"
                    value={formData.adults}
                    readOnly
                    min={room.type === "double" ? 2 : 1}
                  />
                  <button
                    type="button"
                    className="Book-Now_counter-button"
                    onClick={incrementAdults}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="Book-Now_form-group">
                <label>Children</label>
                <div className="Book-Now_counter">
                  <button
                    type="button"
                    className="Book-Now_counter-button"
                    onClick={decrementChildren}
                    disabled={formData.children <= 0}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="children"
                    value={formData.children}
                    readOnly
                    min="0"
                  />
                  <button
                    type="button"
                    className="Book-Now_counter-button"
                    onClick={incrementChildren}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Services */}
          <section className="Book-Now_services">
            <h3>Additional Services</h3>
            <div className="Book-Now_services-grid">
              {Object.entries(services).map(([type, serviceList]) => (
                <div key={type} className="Book-Now_service-category">
                  <h4>
                    {type === "spa" && "Spa Services"}
                    {type === "swimmingPool" && "Swimming Pool Services"}
                    {type === "movieTheater" && "Movie Theater Services"}
                    {type === "fitnessCenter" && "Fitness Center Services"}
                  </h4>
                  <div className="Book-Now_service-options">
                    {serviceList.map((service) => (
                      <label key={service.name} className="Book-Now_service-item">
                        <input
                          type="checkbox"
                          name="service"
                          value={service.name}
                          checked={formData.selectedServices.includes(service.name)}
                          onChange={handleChange}
                        />
                        {service.name} (₹{service.price})
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Customer Details */}
          <section className="Book-Now_customer-details">
            <h3>Customer Details</h3>
            <div className="Book-Now_form-row">
              <div className="Book-Now_form-group">
                <label>Title *</label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Title</option>
                  <option value="mr">Mr.</option>
                  <option value="mrs">Mrs.</option>
                  <option value="ms">Ms.</option>
                  <option value="dr">Dr.</option>
                </select>
              </div>
              <div className="Book-Now_form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Your first name"
                />
              </div>
              <div className="Book-Now_form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Your last name"
                />
              </div>
            </div>
            <div className="Book-Now_form-row">
              <div className="Book-Now_form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              <div className="Book-Now_form-group">
                <label>Mobile No. *</label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                  placeholder="Your mobile number"
                  pattern="[0-9]{10}"
                />
              </div>
              <div className="Book-Now_form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </section>

          {/* Identity Details */}
          <section className="Book-Now_identity-details">
            <h3>Identity Details</h3>
            <div className="Book-Now_form-row">
              <div className="Book-Now_form-group">
                <label>Identity Type *</label>
                <select
                  name="identityType"
                  value={formData.identityType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Identity Type</option>
                  <option value="passport">Passport</option>
                  <option value="driving_license">Driving License</option>
                  <option value="national_id">Aadhar Card</option>
                  <option value="voter_id">Voter ID</option>
                </select>
              </div>
              <div className="Book-Now_form-group">
                <label>ID Number *</label>
                <input
                  type="text"
                  name="identityNumber"
                  value={formData.identityNumber}
                  onChange={handleChange}
                  required
                  placeholder="Your ID number"
                />
              </div>
            </div>
          </section>

          {/* Payment Details */}
          <section className="Book-Now_payment-details">
            <h3>Payment Details</h3>
            <div className="Book-Now_form-row">
              <div className="Book-Now_form-group">
                <label>Payment Method *</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="debit_card">Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="bank_payment">Bank Transfer</option>
                  <option value="cash">Cash at Property</option>
                </select>
              </div>
              <div className="Book-Now_form-group">
                <label>Amount Details</label>
                <div className="Book-Now_amount-details">
                  <div className="Book-Now_amount-row">
                    <span>Room Price:</span>
                    <span>₹{amountDetails.roomPrice.toLocaleString("en-IN")}</span>
                  </div>
                  {amountDetails.adultsCharge > 0 && (
                    <div className="Book-Now_amount-row">
                      <span>Extra Adults:</span>
                      <span>₹{amountDetails.adultsCharge.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  {amountDetails.childrenCharge > 0 && (
                    <div className="Book-Now_amount-row">
                      <span>Children:</span>
                      <span>₹{amountDetails.childrenCharge.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  {amountDetails.servicePrice > 0 && (
                    <div className="Book-Now_amount-row">
                      <span>Services:</span>
                      <span>₹{amountDetails.servicePrice.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="Book-Now_amount-row">
                    <span>Taxes & Charges (11%):</span>
                    <span>₹{amountDetails.hotelChargesAndGST.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="Book-Now_amount-total">
                    <span>Total Amount:</span>
                    <span>₹{amountDetails.totalAmount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Specific Fields */}
            {showUpiField && (
              <div className="Book-Now_form-row">
                <div className="Book-Now_form-group full-width">
                  <label>UPI ID *</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    required={formData.paymentMethod === "upi"}
                    placeholder="username@upi"
                  />
                </div>
              </div>
            )}

            {showCardFields && (
              <div className="Book-Now_form-row">
                <div className="Book-Now_form-group">
                  <label>Card Number *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required={formData.paymentMethod === "credit_card" || formData.paymentMethod === "debit_card"}
                    placeholder="1234 5678 9012 3456"
                    pattern="[0-9\s]{16,19}"
                  />
                </div>
                <div className="Book-Now_form-group">
                  <label>Expiry Date *</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required={formData.paymentMethod === "credit_card" || formData.paymentMethod === "debit_card"}
                    placeholder="MM/YY"
                    pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                  />
                </div>
                <div className="Book-Now_form-group">
                  <label>CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    required={formData.paymentMethod === "credit_card" || formData.paymentMethod === "debit_card"}
                    placeholder="123"
                    pattern="[0-9]{3,4}"
                  />
                </div>
              </div>
            )}

            {showBankFields && (
              <div className="Book-Now_form-row">
                <div className="Book-Now_form-group">
                  <label>Bank Name *</label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    required={formData.paymentMethod === "bank_payment"}
                    placeholder="Bank name"
                  />
                </div>
                <div className="Book-Now_form-group">
                  <label>Account Number *</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    required={formData.paymentMethod === "bank_payment"}
                    placeholder="Account number"
                  />
                </div>
                <div className="Book-Now_form-group">
                  <label>IFSC Code *</label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    required={formData.paymentMethod === "bank_payment"}
                    placeholder="IFSC code"
                  />
                </div>
              </div>
            )}

            {showCashInfo && (
              <div className="Book-Now_cash-info">
                <h4>Cash Payment Instructions</h4>
                <p>
                  Please pay <strong>₹{formData.totalAmount.toLocaleString("en-IN")}</strong> in cash when you arrive.
                </p>
                <p>
                  <strong>Note:</strong> Reception hours are 9:00 AM to 6:00 PM.
                </p>
              </div>
            )}

            <div className="Book-Now_form-buttons">
              <button
                type="submit"
                className="Book-Now_submit-button"
                onClick={handleMakePayment}
              >
                Confirm & Pay
              </button>
              <button
                type="button"
                className="Book-Now_cancel-button"
                onClick={() => navigate('/room')}
              >
                Cancel
              </button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default RoomBookingPage;