

import { useState, useEffect } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import "../App.css";
import HeaderBox from "./HeaderBox";
import RouteContent from "./RouteContent";
import MenuList from './MenuList';
import ProtectedRoutes from "./ProtectedRoutes";

const MainLayoutBox = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const { Sider, Content } = Layout;

  const expandedWidth = 270;
  const collapsedWidth = 80;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 920) { 
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
 
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={collapsedWidth}
          width={expandedWidth}
          style={{
            position: "fixed",
            height: "100vh",
            left: 0,
            backgroundColor: "#fff",
            top: 0,
            transition: "width 0.2s",
            overflowY: "auto",
            insetInlineStart: 0,
            bottom: 0,
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
          }}
        >
          <div
            className="demo-logo-vertical brandStyle"
            style={{ color: collapsed ? "#fff" : "#000" }}
          >
            <h3 style={{ fontFamily: '"Poppins", serif', marginTop: "50px", paddingRight: "60px" }}>
              Mahaagro Mart
            </h3>
          </div>

          <ProtectedRoutes>

          <MenuList navigate={navigate} collapsed={collapsed} searchText={searchText} />

          </ProtectedRoutes>
        </Sider>

        <Layout
          style={{
            marginLeft: collapsed ? 80 : 270, 
            transition: "margin-left 0.2s",
            backgroundColor: "#f4f7fe",
          }}
        >
          {/* Header */}
          <HeaderBox collapsed={collapsed} setCollapsed={setCollapsed} onSearchTextChange={setSearchText} />
          <Content
            style={{
              padding: "24px",
              backgroundColor: "#f4f7fe",
              minHeight: "100vh",
              marginLeft: "20px",
            }}
          >
            <RouteContent />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayoutBox;
