import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/Features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { startLoading, stopLoading } from "../redux/Features/LoadingSlice";
// import { PiCornersOutLight } from "react-icons/pi";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { user, token, isLogged } = useSelector((state) => state.auth);

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
      // If no token or userId, navigate to login
      if (!storedToken || !UserId) {
        navigate("/login");
        return;
      }

      dispatch(startLoading()); // Start loading

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
          const roleId = response.data.UserProfilesEntity[0].DesignationName;
      
          

          dispatch(
            login({
              user:
                response.data.UserProfilesEntity[0].FirstName +
                " " +
                response.data.UserProfilesEntity[0].LastName,
              role: roleId,
              token: storedToken,
              UserId: UserId,
            })
          );
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/login");
      } finally {
        dispatch(stopLoading()); 
      }
    };

    // Only fetch user data if we don't have it and have valid token and UserId
    if (!user && storedToken && UserId) {
      fetchUser();
    }
  }, [storedToken, UserId, user, dispatch , navigate]);

  return storedToken && UserId && isLogged ? children : null;
};

export default ProtectedRoutes;