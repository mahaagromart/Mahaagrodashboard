



import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Forgot.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ForgotOtp from '../ForgotOtp/ForgotOtp';
// import ResetPassword from '../ResetPassword/ResetPassword'; 

const Forgot = () => {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [otp, setOtp] = useState(''); // State to store OTP
  const navigate = useNavigate(); // Hook to navigate to ResetPassword

  const ForgotSchema = Yup.object().shape({
    Email: Yup.string().email('Invalid email').required('Required'),
  });

  const sendOtpForgot = () => {
    const email = localStorage.getItem('Email');
    if (!email) {
      return;
    }

    let url = "http://localhost:49814/Authentication/SendOtpEmail";
    let data = { Email: email };

    axios
      .post(url, data)
      .then((response) => {
        if (response.data.Retval === "Success") {
          setEmailSent(true);
        } else {
          console.log("SendOtp Error");
        }
      })
      .catch((error) => {
        console.error("Error sending OTP", error);
      });
  };

  const handleOtpSubmit = (otp) => {
    setOtp(otp); 
 
    navigate('/ResetPassword', { state: { otp: otp } }); 
  };

  return (
    <div className='container'>
      {!showOtpForm ? (
        <div>
          <h1>Enter Your Email</h1>
          <Formik
            initialValues={{ Email: '' }}
            validationSchema={ForgotSchema}
            onSubmit={(values) => {
              localStorage.setItem('Email', values.Email);
              let SendEmail = 'http://localhost:49814/Authentication/ForgetPasswordOtpTrigger';

              axios
                .post(SendEmail, values)
                .then((res) => {
                  if (res.data.Retval === 'Success') {
                    setShowOtpForm(true);
                    sendOtpForgot();
                  } else {
                    console.log('Something went wrong!');
                  }
                })
                .catch((err) => {
                  console.log('Error Occurred', err);
                });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field name="Email" type="email" />
                {errors.Email && touched.Email ? <div>{errors.Email}</div> : null}
                <button type="submit">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      ) : showOtpForm ? (
        <div style={{ position: 'relative' }}>
          <div>
            <p>Please Enter Your OTP</p>
            <ForgotOtp length={4} onOtpSubmit={handleOtpSubmit} style={{ width: "500px", height: "200px", margin: "auto" }} />
            <button className='resendBtn' onClick={sendOtpForgot}>Resend OTP</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Forgot;
