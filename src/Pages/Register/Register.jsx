import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ShowOtp from "../ShowOtp/ShowOtp";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/Features/LoadingSlice";
import { login } from "../../redux/Features/AuthSlice";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import "./Register.css";
const apiUrl = import.meta.env.VITE_API_URL;
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Credential, setCredential] = useState({ Email: "", Otp: "" });
  const [showOtpField, setShowOtpField] = useState(false);

  const Navigate = useNavigate();
  const dispatch = useDispatch();


  const initialValues = {
    Firstname: "",
    Lastname: "",
    Address: "",
    MobileNumber: "", 
    EmailId: "",
    Password: "",
    CountryId: "",
    StateId: "",
    CityId: "",
  };


  const validationSchema = Yup.object({
    Firstname: Yup.string().required("First Name is required"),
    Lastname: Yup.string().required("Last Name is required"),
    Address: Yup.string().required("Address is required"),
    MobileNumber: Yup.string() 
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile Number is required"),
    EmailId: Yup.string().email("Invalid email format").required("Email is required"),
    Password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    CountryId: Yup.string().required("Country is required"),
    StateId: Yup.string().required("State is required"),
    CityId: Yup.string().required("City is required"),
  });
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}FormHelper/GetAllCountry`)
      .then((response) => {
        setCountries(response.data.countryEntities.$values);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: `An error occurred while fetching the countries. Please try again later. ${error}`,
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCountryChange = (selectedCountry) => {
    setLoading(true);
    axios
      .post(`${apiUrl}FormHelper/GetStatesByCountry`, {
        countryId: selectedCountry,
      })
      .then((response) => {
        setStates(response.data.stateEntities.$values);
        setCities([]);
      })
      .catch((error) => {
        console.error("Error fetching states", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

   const handleStateChange = (stateId) => {
    setLoading(true);
    axios
      .post(`${apiUrl}FormHelper/GetCityByState`, {
        stateId: stateId,
      })
      .then((response) => {
        setCities(response.data.cityEntities.$values);
      })
      .catch((error) => {
        console.error("Error fetching cities", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onOtpSubmit = (otp) => {
    setCredential({ ...Credential, Otp: otp });
    axios
      .get(`${apiUrl}Authentication/VerifyEmail?Email=${Credential.Email}&Otp=${otp}`)
      .then((response) => {
        if (response.data.Retval === "Success") {
          LoginAfterLogin(Credential.Email, Credential.Otp);
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: `An error occurred while verifying the OTP. Please try again later. ${error}`,
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEmailChange = (e) => {
    setCredential({ ...Credential, Email: e.target.value });
  };

  const sendOtp = () => {
    let url = `${apiUrl}Authentication/SendOtpEmail`;
    let data = { Email: Credential.Email };

    axios
      .post(url, data)
      .then((response) => {
        if (response.data.Retval === "Success") {
          setShowOtpField(true);
        } else {
          console.log("SendOtp Error");
        }
      })
      .catch((error) => {
        console.error("Error sending OTP", error);
      });
  };

  const handleSubmitReg = (values) => {
    let registerUrl = `${apiUrl}Authentication/Register`;
    axios
      .post(registerUrl, values)
      .then((response) => {
        console.log(response)
        if (response.data.message === "UserRegistered") {
          Swal.fire({
            title: "OTP Is Sent to Your Email",
            text: "Please check your email to verify your account.",
            icon: "success",
          });

          localStorage.setItem("Password", values.Password);
          sendOtp();
        } else if (response.data.retval === "Email Exists") {
          Swal.fire({
            title: "Email Already Exists",
            text: "The email you entered is already associated with an existing account. Please try a different email.",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "An error occurred during registration. Please try again later.",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Registration Failed",
          text: `An unexpected error occurred during registration. Please try again later.${error}`,
          icon: "error",
        });
      });
  };

  const LoginAfterLogin = async (email) => {
    dispatch(startLoading());
    try {
      const response = await axios.post(`${apiUrl}Authentication/Login`, {
        EmailId: email,
        Password: localStorage.getItem('Password')
      });

      if (response.data.Code === 200) {
        let userData = response.data.AuthenticationsList[0];
        let data = {
          user: `${userData.FirstName} ${userData.LastName}`,
          token: response.data.Token,
          role: userData.DesignationName,
        };

        localStorage.setItem("token", data.token);
        localStorage.setItem("UserId", userData.UserId);

        dispatch(
          login({
            user: data.user,
            role: data.role,
            token: data.token,
            UserId: userData.UserId,
          })
        );

        dispatch(stopLoading());
        Navigate("/");
        Swal.fire({
          title: "Login Successful",
          text: "Login was successful.",
          icon: "success",
        });
      } else {
        dispatch(stopLoading());
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      dispatch(stopLoading());
      alert("An error occurred. Please check your network connection.", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="register-image"></div>
        <div className="register-form">
          <h1>Register</h1>
          {!showOtpField ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmitReg}
            >
              {({ setFieldValue }) => (
                <Form>
                  {/* First Name and Last Name in a 2-column grid */}
                  <div className="name-grid">
                    <div className="form-group">
                      <label>First Name:</label>
                      <Field type="text" name="Firstname" placeholder="Enter Your First Name" />
                      <ErrorMessage name="Firstname" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label>Last Name:</label>
                      <Field type="text" name="Lastname" placeholder="Enter Your Last Name" />
                      <ErrorMessage name="Lastname" component="div" className="error-message" />
                    </div>
                    <div className="form-group">
                      <label>Email Address:</label>
                      <Field
                        type="email"
                        name="EmailId"
                        placeholder="Enter Your Email"
                        value={Credential.Email}
                        onChange={(e) => {
                          handleEmailChange(e);
                          setFieldValue("EmailId", e.target.value);
                        }}
                      />
                      <ErrorMessage name="EmailId" component="div" className="error-message" />
                    </div>
                    <div className="form-group" style={{ position: 'relative' }}>
                      <label>Password:</label>
                      <div style={{ position: 'relative' }}>
                        <Field
                          type={showPassword ? 'text' : 'password'}
                          name="Password"
                          placeholder="Enter Your Password"
                          className="input-field"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          style={{ position: 'absolute', top: 0, right: 0, height: '100%', width: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', outline: 'none' }}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      <ErrorMessage name="Password" component="div" style={{ color: 'red', marginTop: '0.5rem' }} />
                    </div>
                  </div>

                  {/* Other fields in single column */}
                  <div className="form-group">
                    <label>Address:</label>
                    <Field type="text" name="Address" placeholder="Enter Your Address" />
                    <ErrorMessage name="Address" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                  <label>Mobile Number:</label>
                  <Field type="text" name="MobileNumber" placeholder="Enter Your Mobile Number" />
                  <ErrorMessage name="MobileNumber" component="div" className="error-message" />
                  </div>




                  {/* <div>
                     <label>Select Country:</label>
                     <Field
                       as="select"
                       name="CountryId"
                       onChange={(e) => {
                         const { value } = e.target;
                         setFieldValue("CountryId", value);
                         handleCountryChange(value);
                       }}
                     >
                       <option value="">Select a Country</option>
                       {countries.map((country) => (
                         <option key={country.countryId} value={country.countryId}>
                           {country.countryName}
                         </option>
                       ))}
                     </Field>
                     <ErrorMessage name="CountryId" component="div" className="error-message" />
                   </div>

                   <div>
                     <label>Select State:</label>
                     <Field
                       as="select"
                       name="StateId"
                       onChange={(e) => {
                         const { value } = e.target;
                         setFieldValue("StateId", value);
                         handleStateChange(value);
                       }}
                     >
                       <option value="">Select a State</option>
                       {states.length > 0 ? (
                         states.map((state) => (
                           <option key={state.stateId} value={state.stateId}>
                             {state.stateName}
                           </option>
                         ))
                       ) : (
                         <option>Loading...</option>
                       )}
                     </Field>
                     <ErrorMessage name="StateId" component="div" className="error-message" />
                   </div>

                  <div>
                     <label>Select City:</label>
                     <Field as="select" name="CityId">
                       <option value="">Select a City</option>
                       {cities.length > 0 ? (
                         cities.map((city) => (
                           <option key={city.cityId} value={city.cityId}>
                             {city.cityName}
                           </option>
                         ))
                       ) : (
                         <option>Loading...</option>
                       )}
                     </Field>
                     <ErrorMessage name="CityId" component="div" className="error-message" />
                   </div> */}


                  <div className="form-group">
                    <label>Select Country:</label>
                    <Field
                      as="select"
                      name="CountryId"
                      onChange={(e) => {
                        const { value } = e.target;
                        setFieldValue("CountryId", value);
                        handleCountryChange(value);
                      }}
                    >
                        <option value="">Select a Country</option>
                       {countries.map((country) => (
                         <option key={country.countryId} value={country.countryId}>
                           {country.countryName}
                         </option>
                       ))}
                    </Field>
                    <ErrorMessage name="CountryId" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label>Select State:</label>
                    <Field
                      as="select"
                      name="StateId"
                      onChange={(e) => {
                        const { value } = e.target;
                        setFieldValue("StateId", value);
                        handleStateChange(value);
                      }}
                    >
                      <option value="">Select a State</option>
                       {states.length > 0 ? (
                         states.map((state) => (
                           <option key={state.stateId} value={state.stateId}>
                             {state.stateName}
                           </option>
                         ))
                       ) : (
                         <option>Loading...</option>
                       )}
                    </Field>
                    <ErrorMessage name="StateId" component="div" className="error-message" />
                  </div>

                  <div className="form-group">
                    <label>Select City:</label>
                    <Field as="select" name="CityId">
                    <option value="">Select a City</option>
                       {cities.length > 0 ? (
                         cities.map((city) => (
                           <option key={city.cityId} value={city.cityId}>
                             {city.cityName}
                           </option>
                         ))
                       ) : (
                         <option>Loading...</option>
                       )}
                    </Field>
                    <ErrorMessage name="CityId" component="div" className="error-message" />
                  </div>


                  <div className="form-group">
                    <button type="submit" className="register-button">
                      Register
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="otp-container">
              <p>Please Enter Your OTP</p>
              <ShowOtp length={4} onOtpSubmit={onOtpSubmit} />
              <Button onClick={sendOtp} className="resend-otp-button">
                Resend OTP
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Register;