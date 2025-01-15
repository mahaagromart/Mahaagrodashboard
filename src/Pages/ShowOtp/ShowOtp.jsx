import { useEffect, useState } from "react";
import { useRef } from "react";
import './ShowOtp.css';


const ShowOtp = ({ length = 4, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [otpExpirationTime, setOtpExpirationTime] = useState(null); 
  const [isExpired, setIsExpired] = useState(false); 
  const [remainingTime, setRemainingTime] = useState(0); 
  const inputRefs = useRef([]);

  useEffect(() => {
    if (otpExpirationTime) {
      const interval = setInterval(() => {
        const timeLeft = otpExpirationTime - Date.now();
        setRemainingTime(timeLeft); 

        if (timeLeft <= 0) {
          setIsExpired(true); 
          clearInterval(interval); 
        }
      }, 1000); 
      return () => clearInterval(interval); 
    }
  }, [otpExpirationTime]);

  const handleOtpGenerate = ({onClick}) => {
    const expirationTime = Date.now() + 3 * 60 * 1000; 
    setOtpExpirationTime(expirationTime);
    setIsExpired(false); 
    setRemainingTime(3 * 60 * 1000); 
    onClick(new Array(length).fill("")); 
  };

  const handleChange = (index, e) => {
    if (isExpired) {
      return;
    }

    const value = e.target.value;

   
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); 
    setOtp(newOtp);

    const combinedOtp = newOtp.join('');
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp); 
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
  console.log(formatTime)

  return (
    <div className="maindiv">
      {otp.map((value, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          ref={(input) => inputRefs.current[index] = input}
          type="text"
          value={value}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onClick={() => handleClick(index)}
          maxLength={1}
          className="otpInput"
          disabled={isExpired} 
        />
      ))}
      
      {isExpired && <p>OTP has expired!</p>}

      {/* Countdown timer */}
      <div>
        {!isExpired && remainingTime > 0 && (
          <p>Time remaining: {formatTime(remainingTime)}</p>
        )}
      </div>

      {/* Button to generate OTP */}
      <button onClick={handleOtpGenerate} disabled={isExpired}>
        Generate OTP (Valid for 3 minutes)
      </button>

      {/* Resend OTP Button */}
      {isExpired && (
        <button onClick={handleOtpGenerate}>
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default ShowOtp;
