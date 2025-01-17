import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ShowOtp from "../ShowOtp/ShowOtp";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/Features/LoadingSlice";
import { login } from "../../redux/Features/AuthSlice";
import './Register.css'

const Register = () => {
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
    EmailId: Yup.string().email("Invalid email format").required("Email is required"),
    Password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    CountryId: Yup.string().required("Country is required"),
    StateId: Yup.string().required("State is required"),
    CityId: Yup.string().required("City is required"),
  });


  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:49814/FormHelper/GetAllCountry")
      .then((response) => {
        setCountries(response.data.CountryEntities);
        console.log(response.data.CountryEntities)
     
      })
      .catch((error) => {
        console.error("Error fetching countries", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Handle country change
  const handleCountryChange = (selectedCountry) => {
    setLoading(true);
    console.log(selectedCountry)
    axios
      .get(`http://localhost:49814/FormHelper/GetStatesByCountry?countryId=${selectedCountry}`)
      .then((response) => {
        setStates(response.data.StateEntities);
        setCities([]);
      })
      .catch((error) => {
        console.error("Error fetching states", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle state change
  const handleStateChange = (StateId) => {
    setLoading(true);
    axios
      .get(`http://localhost:49814/FormHelper/GetCityByState?StateId=${StateId}`)
      .then((response) => {
        setCities(response.data.CityEntities);
      })
      .catch((error) => {
        console.error("Error fetching cities", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // OTP verification
  const onOtpSubmit = (otp) => {
    setCredential({ ...Credential, Otp: otp });
    axios
      .get(`http://localhost:49814/Authentication/VerifyEmail?Email=${Credential.Email}&Otp=${otp}`)
      .then((response) => {
        if (response.data.Retval === "Success") {
          LoginAfterLogin(Credential.Email, Credential.Otp); 
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle email change
  const handleEmailChange = (e) => {
    setCredential({ ...Credential, Email: e.target.value });
  };

  // Sending OTP
  const sendOtp = () => {
    let url = "http://localhost:49814/Authentication/SendOtpEmail";
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

  // Handle user registration
  const handleSubmit = (values) => {
    let registerUrl = "http://localhost:49814/Authentication/Register";

    axios
      .post(registerUrl, values)
      .then((response) => {
        if (response.data.Message === "Success") {
          localStorage.setItem('Password', values.Password);
          sendOtp();
        } else {
          alert("Error occurred during registration");
        }
      })
      .catch((error) => {
        console.error("Error registering user", error);
      });
  };

  // Login after registration
  const LoginAfterLogin = async (email) => {
    console.log();
    dispatch(startLoading());
    try {
      const response = await axios.post("http://localhost:49814/Authentication/Login", {
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
        alert("Login Successful!");
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
    <div>
      {!showOtpField ? ( 
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div>
                <label>FirstName:</label>
                <Field type="text" name="Firstname" placeholder="Enter Your FirstName" />
                <ErrorMessage name="Firstname" component="div" style={{ color: "red" }} />
              </div>

              <div>
                <label>LastName:</label>
                <Field type="text" name="Lastname" placeholder="Enter Your LastName" />
                <ErrorMessage name="Lastname" component="div" style={{ color: "red" }} />
              </div>

              <div>
                <label>Address:</label>
                <Field type="text" name="Address" placeholder="Enter Your Address" />
                <ErrorMessage name="Address" component="div" style={{ color: "red" }} />
              </div>

              <div>
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
                <ErrorMessage name="EmailId" component="div" style={{ color: "red" }} />
              </div>

              <div>
                <label>Password:</label>
                <Field type="password" name="Password" placeholder="Enter Your Password" />
                <ErrorMessage name="Password" component="div" style={{ color: "red" }} />
              </div>

              <div>
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
                    <option key={country.CountryId} value={country.CountryId}>
                      {country.CountryName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="CountryId" component="div" style={{ color: "red" }} />
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
                      <option key={state.StateId} value={state.StateId}>
                        {state.StateName}
                      </option>
                    ))
                  ) : (
                    <option>Loading...</option>
                  )}
                </Field>
                <ErrorMessage name="StateId" component="div" style={{ color: "red" }} />
              </div>

              <div>
                <label>Select City:</label>
                <Field as="select" name="CityId">
                  <option value="">Select a City</option>
                  {cities.length > 0 ? (
                    cities.map((city) => (
                      <option key={city.CityId} value={city.CityId}>
                        {city.CityName}
                      </option>
                    ))
                  ) : (
                    <option>Loading...</option>
                  )}
                </Field>
                <ErrorMessage name="CityId" component="div" style={{ color: "red" }} />
              </div>

              <div>
                <button className="regBtn" type="submit">Register</button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div style={{ position: "relative", height: "100vh" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <p>Please Enter Your OTP</p>
            <ShowOtp length={4} onOtpSubmit={onOtpSubmit} style={{ width: "300px", height: "200px", margin: "auto" }} />
            <Button  onClick={sendOtp}>Resend OTP</Button>
            {/* <Button onClick={forgotPassword}>Forgot Password</Button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
