



import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Forgot.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ForgotOtp from '../ForgotOtp/ForgotOtp';
import Swal from "sweetalert2";


const apiUrl = import.meta.env.VITE_API_URL; 
const Forgot = () => {
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate(); 

  const ForgotSchema = Yup.object().shape({
    
    Email: Yup.string().email('Invalid email').required('Required'),
  });

  const sendOtpForgot = () => {
    const email = localStorage.getItem('Email');
    if (!email) {
      return;
    }

    let url = `${apiUrl}Authentication/SendOtpEmail`;
    let data = { Email: email };

    axios
      .post(url, data)
      .then((response) => {
        if (response.data.Retval === "Success") {
          setEmailSent(true);
          Swal.fire({
            title: "OTP Send To Your Email Please Verify",
            text: `Internal Server Error`,
            icon: "success", 
          });
        } else if(response.data.Retval==="Failed") {
            Swal.fire({
                  title: "Please Enter Valid Email",
                  text: `Email iS Not Found In Database`,
                  icon: "error", 
                });
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
              let SendEmail = `${apiUrl}Authentication/ForgetPasswordOtpTrigger`;

              axios.post(SendEmail, values)
                .then((res) => {
                  if (res.data.Retval === 'Success') {
                    setShowOtpForm(true);
                    sendOtpForgot();
                  } else if(res.data.Retval==="Failed"){
                    Swal.fire({
                      title: "Please Enter Valid Email",
                      text: `Email Was Not Found In Our Database Please Enter Valid One.`,
                      icon: "error", 
                    });
                  }
                })
                .catch((err) => {
                  console.log('Error Occurred', err);
                });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field name="Email" type="email" style={{border:"2px solid grey",height:"35px",width:"250px"}} />
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
       
          </div>
        </div>
      ) : null}
    </div>
  );
};




export default Forgot;
