<<<<<<< HEAD
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { login } from "../../redux/Features/AuthSlice";
// import { useNavigate } from "react-router-dom";
// import { startLoading, stopLoading } from "../../redux/Features/LoadingSlice";
// import ForgotOtp from "../ForgotOtp/ForgotOtp";

// const LoginForm = () => {
//   const [formData, setFormData] = useState({ EmailId: "", Password: "" });
//   const [ForgotOtpFeild, setForgotOtpFeild] = useState(false);  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const validationSchema = Yup.object({
//     EmailId: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     Password: Yup.string().required("Password is required"),
//   });

//   const handleSubmit = async (values, { setSubmitting }) => {
//     dispatch(startLoading());
//     setFormData(values);

//     try {
//       const response = await axios.post(
//         "http://localhost:49814/Authentication/Login",
//         values
//       );

//       if (response.data.Code === 200) {
//         let userData = response.data.AuthenticationsList[0];
//         let data = {
//           user: userData.FirstName + " " + userData.LastName,
//           token: response.data.Token,
//           role: userData.DesignationName,
//         };

//         localStorage.setItem("email", values.EmailId);
//         localStorage.setItem("password", values.Password);

//         dispatch(
//           login({
//             user: data.user,
//             role: data.role,
//             token: data.token,
//             UserId: userData.UserId,
//           })
//         );

//         dispatch(stopLoading());
//         navigate("/"); 
//         alert("Login Successful!");
//       } else {
//         dispatch(stopLoading());
//         alert("Login failed. Please try again.");
//       }
//     } catch (error) {
//       dispatch(stopLoading());
//       alert("An error occurred. Please check your network connection.", error);
//     }

//     setSubmitting(false);
//   };

//   const handleRegisterRedirect = () => {
//     navigate('/Register');
//   };

//   const forgotPassword = (email) => {
//     console.log(email);

//     const sendDataForgotPass = { Email: email };

//     const urlForForgot = "http://localhost:49814/Authentication/ForgetPasswordOtpTrigger";

//     axios.post(urlForForgot, sendDataForgotPass)
//       .then((response) => {
//         if (response.data.Retval === "Success") {
//           console.log(response.data.Retval);
//           // Setting the ForgotOtpFeild state to true
//           setForgotOtpFeild(true);

//           // Explicitly navigate to the ForgotOtp page
//           navigate(`/ForgotOtp?email=${email}&length=4`);
//         } else {
//           alert("Failed to send OTP. Please try again.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert("An error occurred. Please check your network connection.");
//       });
//   };

//   return (
//     <div>
//       {!ForgotOtpFeild ? (
//         <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
//           <h2 style={{ textAlign: "center" }}>Login</h2>
//           <Formik
//             initialValues={formData}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting, values }) => (
//               <Form>
//                 <div style={{ marginBottom: "15px" }}>
//                   <label htmlFor="email">Email:</label>
//                   <Field
//                     type="email"
//                     name="EmailId"
//                     id="email"
//                     placeholder="Enter your email"
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       marginTop: "5px",
//                       border: "1px solid #ccc",
//                       borderRadius: "4px",
//                     }}
//                   />
//                   <ErrorMessage
//                     name="EmailId"
//                     component="div"
//                     style={{ color: "red", marginTop: "5px" }}
//                   />
//                 </div>

//                 <div style={{ marginBottom: "15px" }}>
//                   <label htmlFor="password">Password:</label>
//                   <Field
//                     type="password"
//                     name="Password"
//                     id="password"
//                     placeholder="Enter your password"
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       marginTop: "5px",
//                       border: "1px solid #ccc",
//                       borderRadius: "4px",
//                     }}
//                   />
//                   <ErrorMessage
//                     name="Password"
//                     component="div"
//                     style={{ color: "red", marginTop: "5px" }}
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   style={{
//                     width: "100%",
//                     padding: "10px",
//                     backgroundColor: "#4CAF50",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "4px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {isSubmitting ? "Submitting..." : "Login"}
//                 </button>

//                 <div style={{ marginTop: "15px", textAlign: "center" }}>
//                   <p>
//                     Don’t have an account?{" "}
//                     <button
//                       type="button"
//                       onClick={handleRegisterRedirect}
//                       style={{
//                         background: "none",
//                         border: "none",
//                         color: "#007BFF",
//                         cursor: "pointer",
//                         textDecoration: "underline",
//                       }}
//                     >
//                       Register here
//                     </button>
//                   </p>

//                   <button
//                     style={{
//                       backgroundColor: "blue",
//                       height: "35px",
//                       width: "140px",
//                       borderRadius: "20px",
//                       color: "white",
//                     }}
//                     onClick={() => forgotPassword(values.EmailId)}
//                   >
//                     Forgot Password
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       ) : (
//         <div style={{ position: "relative", height: "100vh" }}>
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               display: "flex",
//               flexDirection: "column",
//               textAlign: "center",
//             }}
//           >
//   <ForgotOtp/>
//   </div>
//         </div> 
//       )}
//     </div>
//   );
// };

// export default LoginForm;
=======

>>>>>>> 385c7f57bc94b546de7385950c08ca927b9ab2f9



import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Features/AuthSlice";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
import {  useNavigate } from "react-router-dom";
>>>>>>> 385c7f57bc94b546de7385950c08ca927b9ab2f9
import { startLoading, stopLoading } from "../../redux/Features/LoadingSlice";

import Swal from "sweetalert2";

const LoginForm = () => {
  const [formData, setFormData] = useState({ EmailId: "", Password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show,setShow]=useState(false)

  const validationSchema = Yup.object({
    EmailId: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    Password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
<<<<<<< HEAD
    dispatch(startLoading());
=======
    dispatch(startLoading()); 
>>>>>>> 385c7f57bc94b546de7385950c08ca927b9ab2f9
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

        localStorage.setItem("email", values.EmailId);
        localStorage.setItem("password", values.Password);

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
          title : `Great Job ${userData.FirstName}`,
          text : " You Have Logged In.",
          icon : "success"
        })
        navigate("/"); 
      } else {
        dispatch(stopLoading());
        alert("Login failed. Please try again.");
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

  const forgotPassword = (email) => {
    console.log(email);

    const sendDataForgotPass = { Email: email };

    const urlForForgot = "http://localhost:49814/Authentication/ForgetPasswordOtpTrigger";

    axios.post(urlForForgot, sendDataForgotPass)
      .then((response) => {
        if (response.data.Retval === "Success") {
          console.log(response.data.Retval);
          setShow(true)


          navigate('/ForgotOtp');
        } else {
          alert("Failed to send OTP. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please check your network connection.");
      });
  };

  return (
    <div>
    {!show ? (
      <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
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

                <button
                  style={{
                    backgroundColor: "blue",
                    height: "35px",
                    width: "140px",
                    borderRadius: "20px",
                    color: "white",
                  }}
                  onClick={() => forgotPassword(values.EmailId)}
                >
                  Forgot Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    
        ):(<div>Hello world</div>)

        }
        </div>
  );
};

export default LoginForm;
