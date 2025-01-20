import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from 'axios';
import './ForgotOtp.css';

const ForgotOtp = ({ length = 4, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [isExpired, setIsExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  let interval;

  const startOtpTimer = () => {
    const expirationTime = Date.now() + 1 * 60 * 1000;  // 1 minute
    setRemainingTime(1 * 60 * 1000);  // Set initial time to 1 minute
    setIsExpired(false);  // Reset expired state to false

    interval = setInterval(() => {
      const timeLeft = expirationTime - Date.now();
      setRemainingTime(timeLeft);

      if (timeLeft <= 0) {
        setIsExpired(true);  // Mark as expired when time is up
        clearInterval(interval);  // Stop the interval once expired
      }
    }, 1000);
  };

  useEffect(() => {
    startOtpTimer();  // Start the OTP timer when the component mounts

    return () => {
      clearInterval(interval);  // Clean up the interval on unmount
    };
  }, []);

  const handleChange = (index, e) => {
    if (isExpired) return;

    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join('');
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
      handleRedirect(combinedOtp);
    }

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();  // Move focus to previous input on backspace
      }
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(0, 1);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 1000 / 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleRedirect = (combinedOtp) => {
    navigate('/ResetPassword', { state: { otp: combinedOtp } });
  };

  // Handle OTP expiration and resend OTP
  const handleResendOtp = () => {
    setIsExpired(false);  // Reset expired state
    sendOtpForgot();  // Call the function to resend OTP
    startOtpTimer();  // Restart the OTP timer
  };

  // The local function to send OTP
  const sendOtpForgot = () => {
    const email = localStorage.getItem('Email');
    if (!email) {
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    let url = `${apiUrl}Authentication/SendOtpEmail`;
    let data = { Email: email };

    axios
      .post(url, data)
      .then((response) => {
        if (response.data.Retval === "Success") {
          console.log("OTP sent successfully!");
        } else {
          console.log("SendOtp Error");
        }
      })
      .catch((error) => {
        console.error("Error sending OTP", error);
      });
  };

  return (
    <div className="forgotcontainer">
      <div className="forgototp-inputs">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={(input) => inputRefs.current[index] = input}
            type="text"
            value={value}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onClick={() => handleClick(index)}
            maxLength={1}
            className="otp-input"
            disabled={isExpired}  // Disable input when OTP is expired
          />
        ))}
      </div>

      <div>
        {isExpired ? (
          // Show the "Resend OTP" button and text only when OTP expires
          <div>
            <p className="otp-expired">
              OTP expired. Click to resend OTP.
            </p>
            <button className="resend-btn" onClick={handleResendOtp}>
              Resend OTP
            </button>
          </div>
        ) : (
          // Display remaining time if OTP has not expired
          <p>Time remaining: {formatTime(remainingTime)}</p>
        )}
      </div>
    </div>
  );
};

ForgotOtp.propTypes = {
  length: PropTypes.number,
  onOtpSubmit: PropTypes.func.isRequired, // Function to handle OTP submission
};

export default ForgotOtp;
                