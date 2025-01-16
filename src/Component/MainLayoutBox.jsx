// import { useState , useEffect} from "react";
// import { Layout } from "antd";


// import { useNavigate } from "react-router-dom";
// import "../App.css";

// import HeaderBox from "./HeaderBox";
// import RouteContent from "./RouteContent";

// import MenuList from './MenuList'
// const MainLayoutBox = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();

//   const { Sider, Content } = Layout;

//   const expandedWidth = 270;
//   const collapsedWidth = 80;

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) { 
//         setCollapsed(true);
//       } else {
//         setCollapsed(false);
//       }
//     };

  
//     window.addEventListener('resize', handleResize);

 
//     handleResize();

    
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <>
//       <Layout style={{ minHeight: "100vh" }}>
//         {/* Fixed Sidebar */}
//         <Sider
//           trigger={null}
//           collapsible
//           collapsed={collapsed}
//           collapsedWidth={collapsedWidth}
//           width={expandedWidth}
//           style={{
//             position: "fixed",
//             height: "200vh",
//             left: 0,
//             backgroundColor: "#fff",
//             top: 0,
//             transition: "width 0.2s",
//             overflowY: "auto",
//             insetInlineStart: 0,
//             bottom: 0,
//             scrollbarWidth: 'thin',
//             scrollbarGutter: 'stable',
            
//           }}
//         >
//           <div
//             className="demo-logo-vertical brandStyle"
//             style={{ color: collapsed ? "#fff" : "#000" }}
//           >

//             <h3 style={{fontfamily: '"Poppins", serif',marginTop:'50px',paddingRight:'60px'}}>Mahaagro Mart</h3>
//           </div>



//           <MenuList navigate={navigate} collapsed={collapsed} />
//         </Sider>

//         <Layout
//           style={{
//             marginLeft: collapsed ? 80 : 250,
//             transition: "margin-left 0.2s",
//             backgroundColor: "#f4f7fe",
//           }}
//         >
//           {/* Header */}
//           <HeaderBox collapsed={collapsed} setCollapsed={setCollapsed} />
//           <Content
//             style={{
//               padding: "24px",
//               backgroundColor: "#f4f7fe",
//               minHeight: "200vh",
//               marginLeft: "20px",
//             }}
//           >
//             <RouteContent />
//           </Content>
//         </Layout>
//       </Layout>
//     </>
//   );
// };

// export default MainLayoutBox;

import { useState, useEffect } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import "../App.css";
import HeaderBox from "./HeaderBox";
import RouteContent from "./RouteContent";
import MenuList from './MenuList';

const MainLayoutBox = () => {
  const [collapsed, setCollapsed] = useState(false);
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

          <MenuList navigate={navigate} collapsed={collapsed} />
        </Sider>

        <Layout
          style={{
            marginLeft: collapsed ? 80 : 270, 
            transition: "margin-left 0.2s",
            backgroundColor: "#f4f7fe",
          }}
        >
          {/* Header */}
          <HeaderBox collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            style={{
              padding: "24px",
              backgroundColor: "#f4f7fe",
              minHeight: "200vh",
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
