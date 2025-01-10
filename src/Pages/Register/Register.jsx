import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Register = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

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
      })
      .catch((error) => {
        console.error("Error fetching countries", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCountryChange = (selectedCountry) => {
    setLoading(true);
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

  const handleSubmit = (values) => {
    let registerUrl = "http://localhost:49814/Authentication/Register";
    axios
      .post(registerUrl, values) 
      .then((response) => {
        if (response.data.Message) {
  
          alert("Registration successful!");
        } else {
          alert("Registration failed.");
        }
      })
      .catch((error) => {
        console.error("Error registering user", error);
      });
  };

  return (
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
            <label>EmailId:</label>
            <Field type="email" name="EmailId" placeholder="Enter Your Email" />
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
            <button type="submit">Register</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;

