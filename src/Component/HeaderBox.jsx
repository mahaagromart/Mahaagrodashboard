
import './HeaderBox.css'
import { Button, Flex, Layout } from 'antd';
import { ManOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { MdNotifications, MdSettings } from 'react-icons/md';
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
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



const HeaderBox = ({collapsed , setCollapsed}) => {
   const { Header } = Layout;


  return (
    <Header className="watery-header">
    <div className="header-buttons">
    <Button
  type="text"
  icon={<SearchOutlined />}
  onClick={() => setCollapsed(!collapsed)}
  className="header-icon-button"
  style={{
    width: '100px',
  }}
/>

      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="header-icon-button"
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
        className="header-icon-button dropdown-icon-button"
      />
    </Space>
  </a>
</Dropdown>
 



    </div>
  </Header>
  
  )
}

export default HeaderBox