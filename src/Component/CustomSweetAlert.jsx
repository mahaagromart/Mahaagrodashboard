import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CustomSweetAlert = ({ title, inputValue, onConfirm }) => {
  const MySwal = withReactContent(Swal);

  const showSwal = () => {
    MySwal.fire({
      title: <i>{title}</i>,
      input: "text",
      inputValue: inputValue || "",
      showCancelButton: true,
      confirmButtonText: "Submit",
      preConfirm: () => {
        const value = Swal.getInput()?.value || "";
        if (onConfirm) {
          onConfirm(value); 
        }
      },
    });
  };

  return (
    <button onClick={showSwal} style={{ padding: "10px", margin: "10px" }}>
      Show Alert
    </button>
  );
};

export default CustomSweetAlert;
