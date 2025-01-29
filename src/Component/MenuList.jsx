
import { Menu } from 'antd';
import './Menu.css';
import { useNavigate , useLocation } from 'react-router-dom';

import { adminRoutes } from './AdminRoutes';
import { useDispatch , useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { vendorRoutes } from './VendorRoutes';
import { logout } from '../redux/Features/AuthSlice';


const MenuList = () => {

  const navigate = useNavigate();
  const [route , setRoute] = useState([]);
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation(); 

  useEffect(()=>{
      if(role === 'Admin'){

        setRoute(adminRoutes);
      }else if(role === 'Vendor'){
        setRoute(vendorRoutes)
      }else{
        navigate("/login")
      }
  },[role,navigate]);


  return (
   
<Menu 
    style={{
      backgroundColor: '#fff',
      marginTop: '40px'
    
    }}
    onClick={({ key }) => {

      if(key === '/signout'){

        localStorage.clear();
        dispatch(logout());
        navigate(key);
      }

      navigate(key);


    }}
    mode="inline"
    items={route}
    selectedKeys={[location.pathname]}
  />

  );

};

export default MenuList;

