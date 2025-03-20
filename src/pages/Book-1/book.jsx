import React, { useState, useEffect } from "react";
import "./book.css";
import { useTheme } from "../../context/ThemeContext.jsx";

const RoomBooking = () => {
  const { isDarkMode } = useTheme();

  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    bookingType: "",
    arrivalFrom: "",
    bookingReferenceNo: "",
    purposeOfVisit: "",
    remarks: "",
    roomType: "",
    roomNo: "",
    adults: 0,
    children: 0,
    mobileNo: "",
    title: "",
    firstName: "",
    lastName: "",
    fatherName: "",
    gender: "",
    occupation: "",
    dob: "",
    nationality: "",
    identityType: "",
    identityNumber: "",
    identityFront: null,
    identityBack: null,
    guestImage: null,
    paymentMethod: "",
    upiId: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    totalAmount: 0,
  });

  const [showUpiField, setShowUpiField] = useState(false);
  const [showCardFields, setShowCardFields] = useState(false);
  const [showBankFields, setShowBankFields] = useState(false);
  const [showCashInfo, setShowCashInfo] = useState(false);

  const PER_ADULT_CHARGE = 1000; // ₹1,000 per adult
  const PER_CHILD_CHARGE = 500; // ₹500 per child
  const HOTEL_CHARGES_PERCENTAGE = 0.03; // 3% of room price
  const GST_RATE = 0.08; // 8% GST

  const rooms = [
    {
      name: "Deluxe Room",
      rating: 8.5,
      description: "Spacious room with premium amenities and a stunning view.",
      price: "₹5,999/night",
      type: "single",
    },
    {
      name: "Executive Suite",
      rating: 9.0,
      description:
        "Elegant and comfortable with extra space and luxury features.",
      price: "₹8,499/night",
      type: "suite",
    },
    {
      name: "Family Suite",
      rating: 8.8,
      description:
        "Ideal for families with separate living and sleeping areas.",
      price: "₹10,999/night",
      type: "suite",
    },
    {
      name: "Honeymoon Suite",
      rating: 9.2,
      description: "Romantic and luxurious, perfect for couples.",
      price: "₹12,999/night",
      type: "suite",
    },
    {
      name: "Budget Room",
      rating: 7.5,
      description: "Affordable and comfortable for budget travelers.",
      price: "₹3,499/night",
      type: "single",
    },
    {
      name: "Superior Room",
      rating: 8.7,
      description: "Modern decor and advanced facilities for extra comfort.",
      price: "₹6,499/night",
      type: "double",
    },
    {
      name: "Single Room",
      rating: 7.8,
      description: "Compact and cozy, perfect for solo travelers.",
      price: "₹2,999/night",
      type: "single",
    },
    {
      name: "Twin Room",
      rating: 8.3,
      description: "Comfortable room with two single beds for sharing.",
      price: "₹4,799/night",
      type: "double",
    },
    {
      name: "Garden View Room",
      rating: 8.4,
      description: "Relax with a serene garden view and modern amenities.",
      price: "₹6,999/night",
      type: "double",
    },
    {
      name: "Royal Suite",
      rating: 9.8,
      description: "Unparalleled luxury with royal treatment and facilities.",
      price: "₹30,999/night",
      type: "suite",
    },
    {
      name: "Business Room",
      rating: 8.6,
      description: "Tailored for business travelers with workspace and Wi-Fi.",
      price: "₹7,499/night",
      type: "single",
    },
    {
      name: "Premium Suite",
      rating: 8.9,
      description:
        "A luxurious suite with top-tier amenities and a private balcony.",
      price: "₹12,999/night",
      type: "suite",
    },
  ];

  useEffect(() => {
    if (!formData.roomNo) return;

    const selectedRoom = rooms.find((room) => room.name === formData.roomNo);
    const roomPrice = selectedRoom
      ? parseInt(selectedRoom.price.replace(/[^0-9]/g, ""), 10)
      : 0;

    const baseAdults = formData.roomType === "double" ? 2 : 1;
    const extraAdults = Math.max(0, formData.adults - baseAdults);
    const adultsCharge = extraAdults * PER_ADULT_CHARGE;
    const childrenCharge = formData.children * PER_CHILD_CHARGE;
    const subtotal = roomPrice + adultsCharge + childrenCharge;
    const hotelChargesAndGST = subtotal * (HOTEL_CHARGES_PERCENTAGE + GST_RATE);
    const totalAmount = subtotal + hotelChargesAndGST;

    setFormData((prev) => ({
      ...prev,
      totalAmount: totalAmount,
    }));
  }, [formData.roomNo, formData.adults, formData.children]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "roomType") {
      let adults = 0;
      let children = 0;

      if (value === "single" || value === "suite") {
        adults = 1;
      } else if (value === "double") {
        adults = 2;
      }

      setFormData((prev) => ({
        ...prev,
        roomType: value,
        roomNo: "",
        adults,
        children,
      }));
    } else if (name === "paymentMethod") {
      if (value === "upi") {
        setShowUpiField(true);
        setShowCardFields(false);
        setShowBankFields(false);
        setShowCashInfo(false);
        setFormData({
          ...formData,
          paymentMethod: value,
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          bankName: "",
          accountNumber: "",
          ifscCode: "",
        });
      } else if (value === "credit_card" || value === "debit_card") {
        setShowCardFields(true);
        setShowUpiField(false);
        setShowBankFields(false);
        setShowCashInfo(false);
        setFormData({
          ...formData,
          paymentMethod: value,
          upiId: "",
          bankName: "",
          accountNumber: "",
          ifscCode: "",
        });
      } else if (value === "bank_payment") {
        setShowBankFields(true);
        setShowUpiField(false);
        setShowCardFields(false);
        setShowCashInfo(false);
        setFormData({
          ...formData,
          paymentMethod: value,
          upiId: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        });
      } else if (value === "cash") {
        setShowCashInfo(true);
        setShowUpiField(false);
        setShowCardFields(false);
        setShowBankFields(false);
        setFormData({
          ...formData,
          paymentMethod: value,
          upiId: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          bankName: "",
          accountNumber: "",
          ifscCode: "",
        });
      } else {
        setShowUpiField(false);
        setShowCardFields(false);
        setShowBankFields(false);
        setShowCashInfo(false);
        setFormData({
          ...formData,
          paymentMethod: value,
          upiId: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          bankName: "",
          accountNumber: "",
          ifscCode: "",
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleRemoveFile = (fieldName) => {
    setFormData({ ...formData, [fieldName]: null });
    // Reset the file input value
    const input = document.querySelector(`input[name="${fieldName}"]`);
    if (input) input.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleMakePayment = (e) => {
    e.preventDefault();
    if (formData.totalAmount <= 0) {
      alert("Please enter a valid total amount.");
      return;
    }

    if (formData.paymentMethod === "upi" && formData.upiId) {
      const paymentRequest = {
        upiId: formData.upiId,
        amount: formData.totalAmount,
        date: new Date().toISOString(),
      };
      console.log("UPI Payment Request Sent:", paymentRequest);
      alert(
        `Payment of ₹${formData.totalAmount} initiated to UPI ID: ${formData.upiId}`
      );
    } else if (
      (formData.paymentMethod === "credit_card" ||
        formData.paymentMethod === "debit_card") &&
      formData.cardNumber &&
      formData.expiryDate &&
      formData.cvv
    ) {
      const paymentRequest = {
        paymentMethod: formData.paymentMethod,
        cardNumber: formData.cardNumber,
        expiryDate: formData.expiryDate,
        cvv: formData.cvv,
        amount: formData.totalAmount,
        date: new Date().toISOString(),
      };
      console.log("Card Payment Request Sent:", paymentRequest);
      alert(
        `Payment of ₹${formData.totalAmount} initiated via ${
          formData.paymentMethod === "credit_card"
            ? "Credit Card"
            : "Debit Card"
        } ending in ${formData.cardNumber.slice(-4)}`
      );
    } else if (
      formData.paymentMethod === "bank_payment" &&
      formData.bankName &&
      formData.accountNumber &&
      formData.ifscCode
    ) {
      const paymentRequest = {
        paymentMethod: formData.paymentMethod,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        amount: formData.totalAmount,
        date: new Date().toISOString(),
      };
      console.log("Bank Payment Request Sent:", paymentRequest);
      alert(
        `Payment of ₹${formData.totalAmount} initiated via Bank Transfer to Account: ${formData.accountNumber}`
      );
    } else if (formData.paymentMethod === "cash") {
      alert(`Please pay ₹${formData.totalAmount} in cash at the reception.`);
    } else {
      alert(
        "Please select a valid payment method and fill in all required details."
      );
    }
  };

  const handleCancelBooking = () => {
    setFormData({
      checkIn: "",
      checkOut: "",
      bookingType: "",
      arrivalFrom: "",
      bookingReferenceNo: "",
      purposeOfVisit: "",
      remarks: "",
      roomType: "",
      roomNo: "",
      adults: 0,
      children: 0,
      mobileNo: "",
      title: "",
      firstName: "",
      lastName: "",
      fatherName: "",
      gender: "",
      occupation: "",
      dob: "",
      nationality: "",
      identityType: "",
      identityNumber: "",
      identityFront: null,
      identityBack: null,
      guestImage: null,
      paymentMethod: "",
      upiId: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      totalAmount: 0,
    });
    setShowCashInfo(false);
    window.history.back();
  };

  const incrementAdults = () => {
    setFormData({ ...formData, adults: formData.adults + 1 });
  };

  const decrementAdults = () => {
    if (formData.adults > (formData.roomType === "double" ? 2 : 1)) {
      setFormData({ ...formData, adults: formData.adults - 1 });
    }
  };

  const incrementChildren = () => {
    setFormData({ ...formData, children: formData.children + 1 });
  };

  const decrementChildren = () => {
    if (formData.children > 0) {
      setFormData({ ...formData, children: formData.children - 1 });
    }
  };

  const countries = [
    { code: "IN", name: "India" },
    { code: "US", name: "United States" },
    { code: "GB", name: "United Kingdom" },
    { code: "CA", name: "Canada" },
    { code: "AU", name: "Australia" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "JP", name: "Japan" },
  ];

  const calculateAmountDetails = () => {
    if (!formData.roomNo) {
      return {
        roomPrice: 0,
        adultsCharge: 0,
        childrenCharge: 0,
        hotelChargesAndGST: 0,
        totalAmount: 0,
      };
    }

    const selectedRoom = rooms.find((room) => room.name === formData.roomNo);
    const roomPrice = selectedRoom
      ? parseInt(selectedRoom.price.replace(/[^0-9]/g, ""), 10)
      : 0;

    const baseAdults = formData.roomType === "double" ? 2 : 1;
    const extraAdults = Math.max(0, formData.adults - baseAdults);
    const adultsCharge = extraAdults * PER_ADULT_CHARGE;
    const childrenCharge = formData.children * PER_CHILD_CHARGE;
    const subtotal = roomPrice + adultsCharge + childrenCharge;
    const hotelChargesAndGST = subtotal * (HOTEL_CHARGES_PERCENTAGE + GST_RATE);
    const totalAmount = subtotal + hotelChargesAndGST;

    return {
      roomPrice,
      adultsCharge,
      childrenCharge,
      hotelChargesAndGST,
      totalAmount,
    };
  };

  const amountDetails = calculateAmountDetails();

  return (
    <div className="Book_room-booking-container">
      <h2>Fill Out Booking Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Reservation Details */}
        <section className="Book_reservation-details">
          <h3>Reservation Details</h3>
          <div className="Book_form-row">
            <div className="Book_form-group">
              <label>Check In *</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Book_form-group">
              <label>Check Out *</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Book_form-group">
              <label>Arrival From</label>
              <input
                type="text"
                name="arrivalFrom"
                value={formData.arrivalFrom}
                onChange={handleChange}
                placeholder="Arrival From"
              />
            </div>
          </div>
          {/* <div className="form-row">
            <div className="form-group">
              <label>Booking Type</label>
              <select
                name="bookingType"
                value={formData.bookingType}
                onChange={handleChange}
              >
                <option value="">Choose Booking Type</option>
                <option value="online">Online</option>
                <option value="walk-in">Walk-in</option>
                <option value="agent">Agent</option>
              </select>
            </div>
            <div className="form-group">
              <label>Booking Reference No.</label>
              <input
                type="text"
                name="bookingReferenceNo"
                value={formData.bookingReferenceNo}
                onChange={handleChange}
                placeholder="Booking Reference No."
              />
            </div>
            <div className="form-group">
              <label>Purpose of Visit</label>
              <input
                type="text"
                name="purposeOfVisit"
                value={formData.purposeOfVisit}
                onChange={handleChange}
                placeholder="Purpose of Visit"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group full-width">
              <label>Remarks</label>
              <input
                type="text"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Remarks"
              />
            </div>
          </div> */}
        </section>
        
        {/* Room Details */}
        <section className="Book_room-details">
          <h3>Room Details</h3>
          <div className="Book_form-row">
            <div className="Book_form-group">
              <label>Room Type *</label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                required
              >
                <option value="">Choose Room Type</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </select>
            </div>
            <div className="Book_form-group">
              <label>Room Name *</label>
              <select
                name="roomNo"
                value={formData.roomNo}
                onChange={handleChange}
                required
                disabled={!formData.roomType}
              >
                <option value="">Choose Room Name</option>
                {formData.roomType &&
                  rooms
                    .filter((room) => room.type === formData.roomType)
                    .map((room) => (
                      <option key={room.name} value={room.name}>
                        {room.name} ({room.price})
                      </option>
                    ))}
              </select>
            </div>
            <div className="Book_form-group"></div> 
          </div>
          <div className="Book_form-row">
            <div className="Book_form-group">
              <label>Adults</label>
              <div className="Book_counter">
                <button
                  type="button"
                  className="Book_counter-button"
                  onClick={decrementAdults}
                  disabled={
                    !formData.roomType ||
                    formData.adults <= (formData.roomType === "double" ? 2 : 1)
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  name="adults"
                  value={formData.adults}
                  onChange={handleChange}
                  min="1"
                  readOnly
                />
                <button
                  type="button"
                  className="Book_counter-button"
                  onClick={incrementAdults}
                  disabled={!formData.roomType}
                >
                  +
                </button>
              </div>
            </div>
            <div className="Book_form-group">
              <label>Children</label>
              <div className="Book_counter">
                <button
                  type="button"
                  className="Book_counter-button"
                  onClick={decrementChildren}
                  disabled={!formData.roomType || formData.children <= 0}
                >
                  -
                </button>
                <input
                  type="number"
                  name="children"
                  value={formData.children}
                  onChange={handleChange}
                  min="0"
                  readOnly
                />
                <button
                  type="button"
                  className="Book_counter-button"
                  onClick={incrementChildren}
                  disabled={!formData.roomType}
                >
                  +
                </button>
              </div>
            </div>
            <div className="Book_form-group"></div> 
          </div>
        </section>

        {/* Customer Details */}
        <section className="Book_customer-details">
          <h3>Customer Details</h3>
          <div className="Book_form-row">
            <div className="Book_form-group">
              <label>Mobile No.</label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
              />
            </div>
            <div className="Book_form-group">
              <label>Title</label>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
              >
                <option value="">Select Title</option>
                <option value="mr">Mr.</option>
                <option value="mrs">Mrs.</option>
                <option value="ms">Ms.</option>
              </select>
            </div>
            <div className="Book_form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="Book_form-row">
            <div className="Book_form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            {/* <div className="form-group">
              <label>Father Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </div> */}
            <div className="Book_form-group">
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
              </select>
            </div>
          </div>
          <div className="Book_form-row">
            {/* <div className="form-group">
              <label>Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              />
            </div> */}
            <div className="Book_form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            {/* <div className="form-group">
              <label>Nationality</label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              >
                <option value="">Select Nationality</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
        </section>

        {/* Identity Details */}
        <section className="Book_identity-details">
          <h3>Identity Details</h3>
          <div className="Book_form-row">
            <div className="Book_form-group">
              <label>Identity Type</label>
              <select
                name="identityType"
                value={formData.identityType}
                onChange={handleChange}
              >
                <option value="">Select Identity Type</option>
                <option value="passport">Passport</option>
                <option value="driving_license">Driving License</option>
                <option value="national_id">Adhar Card</option>
              </select>
            </div>
            <div className="Book_form-group">
              <label>ID # *</label>
              <input
                type="text"
                name="identityNumber"
                value={formData.identityNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="Book_form-group"></div> {/* Empty for alignment */}
          </div>
          {/* <div className="form-row">
            <div className="form-group">
              <label>Identity Upload (Front Side)</label>
              <input
                type="file"
                name="identityFront"
                onChange={handleFileChange}
                accept="image/*,.pdf"
                disabled={formData.identityFront !== null}
              />
              {formData.identityFront && (
                <div className="file-preview">
                  <span>{formData.identityFront.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile("identityFront")}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Identity Upload (Back Side)</label>
              <input
                type="file"
                name="identityBack"
                onChange={handleFileChange}
                accept="image/*,.pdf"
                disabled={formData.identityBack !== null}
              />
              {formData.identityBack && (
                <div className="file-preview">
                  <span>{formData.identityBack.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile("identityBack")}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Guest Image</label>
              <input
                type="file"
                name="guestImage"
                onChange={handleFileChange}
                accept="image/*"
                disabled={formData.guestImage !== null}
              />
              {formData.guestImage && (
                <div className="file-preview">
                  <span>{formData.guestImage.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile("guestImage")}
                    className="remove-button"
                    >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div> */}
        </section>

        {/* Payment Details */}
        <section className="Book_payment-details">
          <h3>Payment Details</h3>
          <div className="Book_form-row">
            <div className="Book_form-group">
              <label>Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="">Select Payment Method</option>
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
                <option value="upi">UPI</option>
                <option value="bank_payment">Bank Payment</option>
                {/* <option value="cash">Cash</option> */}
              </select>
            </div>
            <div className="Book_form-group">
              <label>Amount Details</label>
              <div className="Book_amount-details">
                {formData.roomNo ? (
                  <>
                    <p>
                      Room Price: ₹
                      {amountDetails.roomPrice.toLocaleString("en-IN")}
                    </p>
                    {amountDetails.adultsCharge > 0 && (
                      <p>
                        Extra Adults Charge (
                        {formData.adults -
                          (formData.roomType === "double" ? 2 : 1)}{" "}
                        x ₹{PER_ADULT_CHARGE.toLocaleString("en-IN")}): ₹
                        {amountDetails.adultsCharge.toLocaleString("en-IN")}
                      </p>
                    )}
                    {amountDetails.childrenCharge > 0 && (
                      <p>
                        Children Charge ({formData.children} x ₹
                        {PER_CHILD_CHARGE.toLocaleString("en-IN")}): ₹
                        {amountDetails.childrenCharge.toLocaleString("en-IN")}
                      </p>
                    )}
                    <p>
                      Hotel Charges + GST (11%): ₹
                      {amountDetails.hotelChargesAndGST.toLocaleString(
                        "en-IN",
                        { maximumFractionDigits: 2 }
                      )}
                    </p>
                    <hr />
                    <p>
                      <strong>
                        Total Amount: ₹
                        {amountDetails.totalAmount.toLocaleString("en-IN", {
                          maximumFractionDigits: 2,
                        })}
                      </strong>
                    </p>
                  </>
                ) : (
                  <p>Please select a room to view amount details.</p>
                )}
              </div>
            </div>
            <div className="Book_form-group"></div> {/* Empty for alignment */}
          </div>

          {showUpiField && (
            <div className="Book_form-row">
              <div className="Book_form-group full-width">
                <label>UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleChange}
                  placeholder="Enter UPI ID (e.g., user@bank)"
                />
              </div>
            </div>
          )}
          {showCardFields && (
            <div className="Book_form-row">
              <div className="Book_form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
              </div>
              <div className="Book_form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              <div className="Book_form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>
          )}
          {showBankFields && (
            <div className="Book_form-row">
              <div className="Book_form-group">
                <label>Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Enter Bank Name"
                />
              </div>
              <div className="Book_form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter Account Number"
                />
              </div>
              <div className="Book_form-group">
                <label>IFSC Code</label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  placeholder="Enter IFSC Code"
                />
              </div>
            </div>
          )}
          {showCashInfo && (
            <div className="Book_form-row">
              <div className="Book_form-group full-width">
                <div className="Book_cash-info">
                  <h4>Cash Payment Instructions</h4>
                  <p>
                    Please proceed to the reception desk to complete your
                    payment of <strong>₹{formData.totalAmount}</strong> in cash.
                    Ensure you bring the exact amount or be prepared to receive
                    change. A receipt will be provided upon payment.
                  </p>
                  <p>
                    <strong>Note:</strong> Cash payments are accepted only
                    during reception hours (9 AM - 6 PM).
                  </p>
                </div>
              </div>
            </div>
          )}

          {(formData.paymentMethod === "upi" ||
            formData.paymentMethod === "credit_card" ||
            formData.paymentMethod === "debit_card" ||
            formData.paymentMethod === "bank_payment" ||
            formData.paymentMethod === "cash") && (
            <div className="form-row">
              <div className="form-group full-width">
                <button
                  type="button"
                  className="Book_payment-button"
                  onClick={handleMakePayment}
                >
                  Make Payment
                </button>
              </div>
            </div>
          )}
        </section>

        <div className="Book_form-buttons">
          <button type="submit" className="Book_submit-button">
            Submit Booking
          </button>
          <button
            type="button"
            className="Book_cancel-button"
            onClick={handleCancelBooking}
          >
            Cancel Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomBooking;