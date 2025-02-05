import { useState } from 'react';
import './HeaderBox.css'
import { Button, Flex, Layout } from 'antd';
import { ManOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { MdNotifications, MdSettings , MdSearch } from 'react-icons/md';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space , Input } from 'antd';
import { FaSignOutAlt } from 'react-icons/fa';


const items = [
  
  {
    type: 'divider',
  },
  {
    key: '1',
    label: 'My Account Setting',
    icon : <MdSettings/>

  },
  {
    key : '3',
    label : 'SignOut',
    icon : <FaSignOutAlt/>,
  }
 
];



const HeaderBox = ({collapsed , setCollapsed, onSearchTextChange }) => {
   const { Header } = Layout;
  const [searchText, setSearchText] = useState("");
  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearchTextChange(text); 
  };

  return (
    <Header className="watery-header">
    <div className="header-buttons">

   <Input
  placeholder="Search here"
  className='searchbox'
  style={{
    width: "280px",
    paddingLeft: "5px",
    position: "relative", 
    borderRadius : "20px"
   
    
  }}
  value={searchText}
  onChange={handleInputChange} 
  
  prefix={
    <MdSearch
      style={{
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    />
  }
/> 



    {/* <Button
  type="text"
  icon={<SearchOutlined />}
  onClick={() => setCollapsed(!collapsed)}
  className="header-icon-button"
  style={{
    width: '100px',
  }}
/> */}

      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="header-icon-button hide"
      />
      <Button
        type="text"
        icon={<MdNotifications />}



        
        onClick={() => setCollapsed(!collapsed)}
        className="header-icon-button"
      />



     
 
     <Dropdown
  menu={{
    items,
  }}
>
  <a onClick={(e) => e.preventDefault()}>
    <Space>
      <Button
        type="text"
        icon={<UserOutlined />}
        className="header-icon-button dropdown-icon-button usericon"
      />
    </Space>
  </a>
</Dropdown>
 



    </div>
  </Header>
  
  )
}

export default HeaderBox