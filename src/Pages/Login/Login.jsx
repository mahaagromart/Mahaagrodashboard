import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Features/AuthSlice";
import { useNavigate ,  } from "react-router-dom";
import { startLoading, stopLoading } from "../../redux/Features/LoadingSlice";
import Swal from "sweetalert2";


const apiUrl = import.meta.env.VITE_API_URL; 
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

    dispatch(startLoading());

    setFormData(values);

    try {
      const response = await axios.post(
        `${apiUrl}Authentication/Login?EmailId=${values.EmailId}&Password=${values.Password}`,
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
        localStorage.removeItem("Password");

        dispatch(
          login({
            user: data.user,
            role: data.role,
            token: data.token,
            UserId: userData.UserId,
          })
        );

        dispatch(stopLoading());
        await Swal.fire({
          title : "Login Successfull",
          text : " You Have Logged In.",
          icon : "success"
        })
        navigate("/"); 
      
      } else if(response.data.Message==="User Not Exists"){
  
        dispatch(stopLoading());
        await Swal.fire({
          title: "Email Already Exists",  
          text: "The email you entered is already associated with an existing account. Please use a different email.", 
          icon: "error",
        });
      
      }else{
        dispatch(stopLoading());
        Swal.fire({
          title: "Error",  
          text: "An unexpected error occurred during registration. Please try again later.",
          icon: "error",
        });

      }
    } catch (error) {
      dispatch(stopLoading());
      alert("An error occurred. Please check your network connection.", error);
    }
    setSubmitting(false);
  };

  const handleRegisterRedirect = () => {
    navigate('/Register');
  };

  const ForgotPassword = () => { 
   navigate('/Forgot')
  };

  return (

      <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
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

              <div style={{ marginTop: "15px", textAlign: "center" }}>
                <p>
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    onClick={handleRegisterRedirect}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#007BFF",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Register here
                  </button>
                </p>

                <button type="button" 
                  style={{
                    backgroundColor: "blue",
                    height: "35px",
                    width: "140px",
                    borderRadius: "20px",
                    color: "white",
                  }}
                  onClick={() => ForgotPassword()}
                >
                  Forgot Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    


        
       
  );
};

export default LoginForm;
