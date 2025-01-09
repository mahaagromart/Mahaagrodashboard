import React from "react";
import { Watch } from "react-loader-spinner"; 


const spinnerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const LoadingSpinner = ({ loadingMessage = "Please wait..." }) => (
  <div style={{ backgroundColor: "#f4f7fe", width: "100%" }}>
    <div style={spinnerStyle}>
      <Watch
        visible={true}
        height="120"
        width="120"
        radius="88"
        color="#5E4AFC"
        ariaLabel="watch-loading"
        wrapperStyle={{
            border: "2px solid #5E4AFC",
            borderRadius: "50%", 
            padding: "10px", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        wrapperClass=""
      />
    </div>
    <p style={{ textAlign: "center", fontSize: "16px", color: "#4fa94d", marginTop: "10px" }}>
      {loadingMessage}
    </p>
  </div>
);

export default LoadingSpinner;
