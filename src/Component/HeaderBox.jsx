
import './HeaderBox.css'
import { Button, Flex, Layout } from 'antd';
import { ManOutlined, MenuFoldOutlined, MenuUnfoldOutlined, NotificationOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { MdNotifications } from 'react-icons/md';

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
      <Button
        type="text"
        icon={<UserOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="header-icon-button"
      />
    </div>
  </Header>
  
  )
}

export default HeaderBox