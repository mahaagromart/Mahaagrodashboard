import { Menu } from 'antd';
import './Menu.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminRoutes } from './AdminRoutes';
import { vendorRoutes } from './VendorRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { logout } from '../redux/Features/AuthSlice';

const MenuList = () => {
  const navigate = useNavigate();
  const [route, setRoute] = useState([]);
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // If role is not defined, navigate to login
    if (!role) {
      navigate("/login");
      return; // Early return to stop further execution
    }

    // Set the routes based on the role
    if (role === 'Admin') {
      setRoute(adminRoutes);
    } else if (role === 'Vendor') {
      setRoute(vendorRoutes);
    } else {
      // If role is invalid, navigate to login
      navigate("/login");
    }
  }, [role, navigate]);

  const handleMenuClick = ({ key }) => {
    // Handle signout separately
    if (key === '/signout') {
      localStorage.clear();
      dispatch(logout());
      navigate(key);  // Navigate to logout
      return; // Stop further action
    }

    // Handle navigation for other menu items
    navigate(key);
  };

  // Ensure routes are set before rendering the menu
  if (!route.length) {
    return null; // You could show a loading spinner instead if needed
  }

  return (
    <Menu
      style={{
        backgroundColor: '#fff',
        marginTop: '40px',
      }}
      onClick={handleMenuClick}
      mode="inline"
      items={route}
      selectedKeys={[location.pathname]}
    />
  );
};

export default MenuList;
