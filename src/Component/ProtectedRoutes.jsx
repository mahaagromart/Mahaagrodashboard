import { useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/Features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { startLoading, stopLoading } from "../redux/Features/LoadingSlice";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const { user, token, isLogged } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");
  const UserId = localStorage.getItem("UserId");

  const hasFetched = useRef(false); // Prevent multiple API calls

  useEffect(() => {
    const fetchUser = async () => {
      if (!storedToken || !UserId) {
        navigate("/login");
        return;
      }

      dispatch(startLoading());

      try {
        const url = `${apiUrl}Authentication/GetUserProfile`;
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

    // Ensure fetchUser is called only once
    if (!user && storedToken && UserId && !hasFetched.current) {
      hasFetched.current = true;
      fetchUser();
    }
  }, [storedToken, UserId, dispatch, navigate, user, apiUrl]);

  return storedToken && UserId && isLogged ? children : null;
};

export default ProtectedRoutes;
