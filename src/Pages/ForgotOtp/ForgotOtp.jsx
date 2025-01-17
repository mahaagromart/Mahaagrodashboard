



import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import './ForgotOtp.css';

const ForgotOtp = ({ length = 4, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [otpExpirationTime, setOtpExpirationTime] = useState(null); 
  const [isExpired, setIsExpired] = useState(false); 
  const [remainingTime, setRemainingTime] = useState(0); 
  const inputRefs = useRef([]);


  const navigate = useNavigate();

  useEffect(() => {
    const expirationTime = Date.now() + 1 * 60 * 1000;
    setOtpExpirationTime(expirationTime);
    setIsExpired(false);
    setRemainingTime(1 * 60 * 1000); 

    const interval = setInterval(() => {
      const timeLeft = expirationTime - Date.now();
      setRemainingTime(timeLeft);

      if (timeLeft <= 0) {
        setIsExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  const handleGenerateOtp = ({ onClick }) => {
    const expirationTime = Date.now() + 1 * 60 * 1000; 
    setOtpExpirationTime(expirationTime);
    setIsExpired(false);
    setRemainingTime(1 * 60 * 1000);
    onClick(new Array(length).fill("")); 
  };

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
        inputRefs.current[index - 1].focus();
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
            disabled={isExpired}
          />
        ))}
      </div>

      <div>
        {isExpired && <p className="otp-expired">OTP has expired!</p>}
      </div>

      <div className="timer">
        {!isExpired && remainingTime > 0 && (
          <p>Time remaining: {formatTime(remainingTime)}</p>
        )}
      </div>

      <div className="buttonContainer">
        <button onClick={() => handleGenerateOtp({ onClick: handleGenerateOtp })} disabled={isExpired}>
          Resend OTP
        </button> 
     </div>
    </div>
  );
};

export default ForgotOtp;
