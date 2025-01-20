import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ResetPassword.css'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const location = useLocation();
  const otp = location.state?.otp;  

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL; 
  const Navigate=useNavigate()

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    const email = localStorage.getItem('Email');
    if (!email) return;
  
    let url = `${apiUrl}Authentication/ForgetPasswordOtpValidate`;
    let data = { Email: email, Password: newPassword, OTP: otp };
  
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.Retval === 'Success') {
          setResetStatus('Password reset successful');
          Swal.fire({
            title: "Password Reset Success",
            text: "Your password has been successfully reset.",
            icon: "success",
          });
          Navigate('/Login')
        } else {
          Swal.fire({
            title: "Failed To Reset Password",
            text: "There was an error resetting your password. Please try again later.",
            icon: "error", 
          });
          
        }
      })
      .catch((err) => {
       
        setErrorMessage('Error resetting password. Please try again.');
        Swal.fire({
          title: "Error Occured",
          text: `Internal Server Error ${err}`,
          icon: "error", 
        });
      });
  };
  
  useEffect(() => {
    if (!otp) {
      setErrorMessage('OTP not found.');
      Swal.fire({
        title: "OTP Not Found",
        text: `Internal Server Error`,
        icon: "error", 
      });
    }
  }, [otp]);

  return (
    <div className='container'>
      <h2>Reset Your Password</h2>


    

 <div className='inputDiv'>
Enter Password:<input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
       </div>
    
 <div className='inputDivTwo'>
  
 Confirm Password:<input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
 </div>
  



   

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {resetStatus && <p style={{ color: 'green' }}>{resetStatus}</p>}

   
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
