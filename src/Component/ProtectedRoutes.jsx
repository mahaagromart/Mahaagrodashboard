

// import  { useEffect } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { login } from "../redux/Features/AuthSlice";
// import { useNavigate } from "react-router-dom";
// import { startLoading, stopLoading } from "../redux/Features/LoadingSlice";

// const ProtectedRoutes = ({ children }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//    const { isLoading } = useSelector((state) => state.loading);
//   const { user, role, token, isLogged } = useSelector((state) => state.auth);

//   const storedToken = token || localStorage.getItem("token");
//   const UserId = localStorage.getItem("UserId");

//   const getRole = (id) => {
//     switch (id) {
//       case "1":
//         return "Admin";
//       case "2":
//         return "Vendor";
//       default:
//         return null;
//     }
//   };

//   useEffect(() => {
//     dispatch(startLoading);
//     const fetchUser = async () => {
//       if (!storedToken || !UserId) {
        
//         navigate("/login");
//         return;
//       }

//       try {
//         const url = "http://localhost:49814/Authentication/GetUserProfile";
       
//         const response = await axios.post(
//           `${url}?UserId=${UserId}`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${storedToken}`,
//             },
//           }
//         );

//         if (response.data.Code === 200) {
//           const UserId = response.data.UserProfilesEntity[0].DesignationId;
           
//           const userRole = getRole(UserId);

//           dispatch(
//             login({
//               user : response.data.UserProfilesEntity[0].FirstName + " " +response.data.UserProfilesEntity[0].LastName,
//               role: userRole,
//               token: storedToken,
//               UserId: UserId,
//             })
//           );

//           dispatch(stopLoading);

//         } else {
//           dispatch(stopLoading)
//           navigate("/login");
//         }
//       } catch (error) {
//         dispatch(stopLoading)
//         navigate("/login");
//       }
//     };

//     if (!user || !role || !isLogged) {
//       fetchUser();
//     }
//   }, [user, role, isLogged, storedToken, UserId, dispatch, navigate]);

//   return storedToken && UserId && isLogged ? children : null;
// };

// export default ProtectedRoutes;
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/Features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { startLoading, stopLoading } from "../redux/Features/LoadingSlice";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.loading);
  const { user, role, token, isLogged } = useSelector((state) => state.auth);

  const storedToken = token || localStorage.getItem("token");
  const UserId = localStorage.getItem("UserId");

  const getRole = (id) => {
    switch (id) {
      case "1":
        return "Admin";
      case "2":
        return "Vendor";
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(startLoading()); // Call startLoading as a function

      if (!storedToken || !UserId) {
        navigate("/login");
        dispatch(stopLoading()); // Stop loading if no token or user ID
        return;
      }

      try {
        const url = "http://localhost:49814/Authentication/GetUserProfile";

        const response = await axios.post(
          `${url}?UserId=${UserId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (response.data.Code === 200) {
          const designationId = response.data.UserProfilesEntity[0].DesignationId;
          const userRole = getRole(designationId);

          dispatch(
            login({
              user:
                response.data.UserProfilesEntity[0].FirstName +
                " " +
                response.data.UserProfilesEntity[0].LastName,
              role: userRole,
              token: storedToken,
              UserId: UserId,
            })
          );

          dispatch(stopLoading()); // Stop loading after successful login
        } else {
          dispatch(stopLoading());
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        dispatch(stopLoading()); // Stop loading on error
        navigate("/login");
      }
    };

    if (!user || !role || !isLogged) {
      fetchUser();
    }
  }, [user, role, isLogged, storedToken, UserId, dispatch, navigate]);

  return storedToken && UserId && isLogged ? children : null;
};

export default ProtectedRoutes;
