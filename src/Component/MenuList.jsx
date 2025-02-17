

import { Menu } from 'antd';
import './Menu.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminRoutes } from './Routes/AdminRoutes';
import { vendorRoutes } from './Routes/VendorRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { logout } from '../redux/Features/AuthSlice';

const MenuList = ({ searchText  }) => { 
  const navigate = useNavigate();
  const [route, setRoute] = useState([]);
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!role) {
      navigate("/login");
      return;
    }

    if (role === 'Admin') {
      setRoute(adminRoutes);
    } else if (role === 'Vendor') {
      setRoute(vendorRoutes);
    } else {
      navigate("/login");
    }
  }, [role, navigate]);

  const handleMenuClick = ({ key }) => {
    if (key === '/signout') {
      localStorage.clear();
      dispatch(logout());
      navigate(key);
      return;
    }
    navigate(key);
  };

  const keys = adminRoutes.map((route) => route.key);
  console.log("Menu Keys:", keys);
  const filteredRoutes = route.filter((item) =>
    item.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Menu
      style={{
        backgroundColor: '#fff',
        marginTop: '40px',
      }}
      onClick={handleMenuClick}
      mode="inline"
      items={filteredRoutes} 
      selectedKeys={[location.pathname]}
    />
  );
};

export default MenuList;
