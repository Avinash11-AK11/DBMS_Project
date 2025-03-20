import { useState } from "react";
import './help.css'

const HelpCenter = () => {
  const faqs = [
    { question: "How do I book a room?", answer: "Go to the booking page, select your dates, and click 'Book Now.'" },
    { question: "Can I cancel my booking?", answer: "Yes, you can cancel up to 24 hours before check-in without any charges." },
    { question: "What payment methods are accepted?", answer: "We accept credit cards, debit cards, and UPI payments." },
    { question: "Is there a refund if I cancel?", answer: "Yes, a full refund is provided if canceled 24 hours before check-in." },
    { question: "How do I modify my booking?", answer: "Log in to your account, go to 'My Bookings,' and select 'Modify Booking.'" },
    { question: "Do you provide Wi-Fi in the rooms?", answer: "Yes, free high-speed Wi-Fi is available in all rooms and common areas." },
    { 
      question: "How do I troubleshoot Wi-Fi network issues?", 
      answer: (
        <ul className="list-disc ml-5">
          <li>Ensure your device's Wi-Fi is turned on.</li>
          <li>Restart your device and the Wi-Fi router.</li>
          <li>Make sure you are connected to the correct Wi-Fi network.</li>
          <li>Check you enter valid room ID.</li>
          <li>If the issue persists, contact the front desk for assistance.</li>
        </ul>
      )
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">📚 Help Center</h1>
        <p className="text-gray-600">Find answers to common questions and get support.</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="help-button border-b py-2">
            <button
              className="w-full text-left font-medium flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question} {openIndex === index ? "➖" : "➕"}
            </button>
            {openIndex === index && <div className="mt-2 text-gray-700">{faq.answer}</div>}
          </div>
        ))}
      </section>

      <section className="mt-8 text-center">
        <h2 className="text-2xl font-semibold">📞 Need More Help?</h2>
        <p className="text-gray-600">Contact our support team via email or phone.</p>
        <div className="mt-4">
          <a href="mailto:support@roombooking.com" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Email Us</a>
          <a href="tel:+1234567890" className="bg-green-500 text-white px-4 py-2 rounded">Call Us</a>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
