import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import MainLayoutBox from "./Component/MainLayoutBox";
import LoginForm from "./Pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "./Component/LoadingSpinner";
import { startLoading, stopLoading } from "./redux/Features/LoadingSlice";

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
       <LoadingSpinner loadingMessage="Loading your data, please wait..." />

      </div>
    );
  }

  if (location.pathname === "/login") {
    return <LoginForm />;
  }

  if (!storedToken) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayoutBox />;
};

export default App;
