import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import MainLayoutBox from "./Component/MainLayoutBox";
import LoginForm from "./Pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "./Component/LoadingSpinner";
import { startLoading, stopLoading } from "./redux/Features/LoadingSlice";
import Register from "./Pages/Register/Register";
import ForgotOtp from "./Pages/ForgotOtp/ForgotOtp";
import Forgot from "./Pages/ForgotPassword/Forgot";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";

const App = () => {
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.loading);
  const storedToken = token || localStorage.getItem("token");
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      dispatch(startLoading());
   
      setTimeout(() => {
        dispatch(stopLoading());
      }, 500);
    };

    validateToken();
  }, [dispatch, storedToken]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
           height: "100vh",
        }}
      >
       <LoadingSpinner />

      </div>
    );
  }
  
    if (location.pathname === "/login") {
      return <LoginForm  replace />;
    }
    
    if (location.pathname === "/Register") {
      return <Register  replace />;
    }
    if (location.pathname === "/ForgotOtp") {
      return <ForgotOtp  replace />;
    }
    if (location.pathname === "/Forgot") {
      return <Forgot  replace />;
    }
    if (location.pathname === "/ResetPassword" ) {
      return <ResetPassword  replace />;
    }
  if (!storedToken) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayoutBox />;
};

export default App;