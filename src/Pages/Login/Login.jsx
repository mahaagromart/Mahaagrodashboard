import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { startLoading, stopLoading } from "../../redux/Features/LoadingSlice";

const LoginForm = () => {
  const [formData, setFormData] = useState({ EmailId: "", Password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    EmailId: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    Password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(startLoading()); // Start loading spinner globally
    setFormData(values);

    try {
      const response = await axios.post(
        "http://localhost:49814/Authentication/Login",
        values
      );

      if (response.data.Code === 200) {
        let userData = response.data.AuthenticationsList[0];
        let data = {
          user: userData.FirstName + " " + userData.LastName,
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

        dispatch(stopLoading()); // Stop loading spinner globally
        navigate("/"); // Redirect to homepage
        alert("Login Successful!");
      } else {
        dispatch(stopLoading());
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      dispatch(stopLoading());
      alert("An error occurred. Please check your network connection and try again.");
    }

    setSubmitting(false);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                name="EmailId"
                id="email"
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <ErrorMessage
                name="EmailId"
                component="div"
                style={{ color: "red", marginTop: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                name="Password"
                id="password"
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <ErrorMessage
                name="Password"
                component="div"
                style={{ color: "red", marginTop: "5px" }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {isSubmitting ? "Submitting..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
