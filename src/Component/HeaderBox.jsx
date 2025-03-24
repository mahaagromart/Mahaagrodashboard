import { useState } from "react";
import "./HeaderBox.css";
import { Button, Layout, Input, Dropdown, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MdNotifications, MdSettings, MdSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../redux/Features/AuthSlice";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const HeaderBox = ({ collapsed, setCollapsed, onSearchTextChange }) => {
  const { Header } = Layout;
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch(); 
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearchTextChange(text);
  };


  const handleSignOut = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login"); 
  };


  const handleSettings = () => {
    navigate("/my-setting"); 
  };


  const items = [
    {
      key: "1",
      label: "My Account Setting",
      icon: <MdSettings />,
      onClick: handleSettings, 
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Sign Out",
      icon: <FaSignOutAlt />,
      onClick: handleSignOut, 
    },
  ];

  return (
    <Header className="watery-header">
      <div className="header-buttons">
        <Input
          placeholder="Search here"
          className="searchbox"
          style={{
            width: "280px",
            paddingLeft: "5px",
            position: "relative",
            borderRadius: "20px",
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

        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="header-icon-button hide"
        />
        <Button
          type="text"
          icon={<MdNotifications />}
          className="header-icon-button"
        />

        <Dropdown
          menu={{ items }}
          overlayStyle={{ marginTop: "40px", paddingTop: "10px" }} 
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
  );
};

export default HeaderBox;
