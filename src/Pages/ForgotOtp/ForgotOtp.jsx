
// import { useState,useRef,useEffect } from "react";
// import axios from "axios";
// import './ForgotOtp.css'
// const ForgotOtp = ({email}) => {
//   const [otp, setOtp] = useState(new Array(length).fill(""));
//   const [otpExpirationTime, setOtpExpirationTime] = useState(null); 
//   const [isExpired, setIsExpired] = useState(false); 
//   const [remainingTime, setRemainingTime] = useState(0); 
//   const inputRefs = useRef([]);
//   const [loading, setLoading] = useState(false);
  
//   useEffect(() => {
//     if (otpExpirationTime) {
//       const interval = setInterval(() => {
//         const timeLeft = otpExpirationTime - Date.now();
//         setRemainingTime(timeLeft); 

//         if (timeLeft <= 0) {
//           setIsExpired(true); 
//           clearInterval(interval); 
//         }
//       }, 1000); 
//       return () => clearInterval(interval); 
//     }
//   }, [otpExpirationTime]);

// //   verify Forgot password Otp start
//   const onOtpForgotOtp=(otp)=>{

//     let VerfyForgotOtp=`http://localhost:49814/Authentication/ForgetPasswordOtpValidate?Email=${localStorage.getItem('Email')}&Password=${localStorage.getItem('Password')}&Otp=${otp}`
//     axios
//     .get(VerfyForgotOtp)
//     .then((response) => {
//       if (response.data.Retval === "Success") {
//         console.log("Fogot password Success")

//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//     .finally(() => {
//       setLoading(false);
//     });

//   }

//   //   verify Forgot password Otp End

//   const handleOtpGenerate = ({onClick}) => {
//     const expirationTime = Date.now() + 3 * 60 * 1000; 
//     setOtpExpirationTime(expirationTime);
//     setIsExpired(false); 
//     setRemainingTime(3 * 60 * 1000); 
//     onClick(new Array(length).fill("")); 
//   };

//   const handleChange = (index, e) => {
//     if (isExpired) {
//       return;
//     }

//     const value = e.target.value;

   
//     if (/[^0-9]/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value.substring(value.length - 1); 
//     setOtp(newOtp);

//     const combinedOtp = newOtp.join('');
//     if (combinedOtp.length === length) {
//       onOtpForgotOtp(combinedOtp); 
//     }

   
//     if (value && index < length - 1 && inputRefs.current[index + 1]) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && otp[index] === "") {
     
//       if (index > 0) {
//         inputRefs.current[index - 1].focus();
//       }
//     }
//   };

//   const handleClick = (index) => {
//     inputRefs.current[index].setSelectionRange(0, 1); 
//   };


//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 1000 / 60);
//     const seconds = Math.floor((time / 1000) % 60);
//     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
//   };
//   console.log(formatTime)

//   return (
//     <div className="maindiv">
//       {otp.map((value, index) => (
//         <input
//           key={index}
//           id={`otp-input-${index}`}
//           ref={(input) => inputRefs.current[index] = input}
//           type="text"
//           value={value}
//           onChange={(e) => handleChange(index, e)}
//           onKeyDown={(e) => handleKeyDown(index, e)}
//           onClick={() => handleClick(index)}
//           maxLength={1}
//           className="otpInput"
//           disabled={isExpired} 
//         />
//       ))}
      
//       {isExpired && <p>OTP has expired!</p>}

//       {/* Countdown timer */}
//       <div>
//         {!isExpired && remainingTime > 0 && (
//           <p>Time remaining: {formatTime(remainingTime)}</p>
//         )}
//       </div>

//       {/* Button to generate OTP */}
//       <button onClick={handleOtpGenerate} disabled={isExpired}>
//         Generate OTP (Valid for 3 minutes)
//       </button>

//       {/* Resend OTP Button */}
//       {isExpired && (
//         <button onClick={handleOtpGenerate}>
//           Resend OTP
//         </button>
//       )}
//     </div>
//   );
// }

// export default ForgotOtp
import { useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import './ForgotOtp.css';

const ForgotOtp = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  const [otp, setOtp] = useState(new Array(4).fill("")); // Assuming OTP length is 4
  const [otpExpirationTime, setOtpExpirationTime] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);

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

  const onOtpForgotOtp = (otp) => {
    let VerfyForgotOtp = `http://localhost:49814/Authentication/ForgetPasswordOtpValidate?Email=${email}&Otp=${otp}`;
    axios
      .get(VerfyForgotOtp)
      .then((response) => {
        if (response.data.Retval === "Success") {
          console.log("Forgot password success");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOtpGenerate = () => {
    const expirationTime = Date.now() + 3 * 60 * 1000; // OTP valid for 3 minutes
    setOtpExpirationTime(expirationTime);
    setIsExpired(false);
    setRemainingTime(3 * 60 * 1000);
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

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === otp.length) {
      onOtpForgotOtp(combinedOtp);
    }

    if (value && index < otp.length - 1 && inputRefs.current[index + 1]) {
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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 1000 / 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="maindiv">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={(input) => inputRefs.current[index] = input}
          type="text"
          value={value}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          maxLength={1}
          className="otpInput"
          disabled={isExpired}
        />
      ))}

      {isExpired && <p>OTP has expired!</p>}
      {!isExpired && remainingTime > 0 && (
        <p>Time remaining: {formatTime(remainingTime)}</p>
      )}

      <button onClick={handleOtpGenerate} disabled={isExpired}>
        Generate OTP (Valid for 3 minutes)
      </button>

      {isExpired && (
        <button onClick={handleOtpGenerate}>
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default ForgotOtp;
