import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ResetPassword.css'

const ResetPassword = () => {
  const location = useLocation();
  const otp = location.state?.otp;  

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [resetStatus, setResetStatus] = useState('');

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const email = localStorage.getItem('Email');
    if (!email) return;


    let url = 'http://localhost:49814/Authentication/ForgetPasswordOtpValidate';
    let data = { Email: email, Password: newPassword, OTP: otp };
    console.log(data)

    axios
      .post(url, data)
      .then((res) => {
        if (res.data.Retval === 'Success') {
          setResetStatus('Password reset successful');
          alert('Password reset successful');
        } else {
          setErrorMessage('Error resetting password. Please try again.');
        }
      })
      .catch((err) => {
        console.log('Error occurred during password reset:', err);
        setErrorMessage('Error resetting password. Please try again.');
      });
  };

  useEffect(() => {
    if (!otp) {
      setErrorMessage('OTP not found.');
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
