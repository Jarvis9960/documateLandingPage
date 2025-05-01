import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [popupMessage, setPopupMessage] = useState(''); // For restricted message
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
      setError('');
    } else {
      setError('Please enter a valid 10-digit mobile number.');
    }
  };

  const handleLogin = () => {
    const result = login(mobile, otp);
    if (result.success) {
      navigate('/');
    } else {
      if (result.message === 'You are restricted to login, please contact support') {
        setPopupMessage(result.message); // Show popup for restricted admin
      } else {
        setError(result.message); // Show error for invalid OTP or admin not found
      }
    }
  };

  const closePopup = () => {
    setPopupMessage('');
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <div className="login-form">
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            disabled={otpSent}
          />
        </div>
        {otpSent && (
          <div className="form-group">
            <label>OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP (123456)"
            />
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        {!otpSent ? (
          <button onClick={handleSendOtp} className="send-otp-button">
            Send OTP
          </button>
        ) : (
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
        )}
      </div>

      {/* Popup for restricted message */}
      {popupMessage && (
        <div className="popup-overlay">
          <div className="popup">
            <p>{popupMessage}</p>
            <button onClick={closePopup} className="close-popup-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;