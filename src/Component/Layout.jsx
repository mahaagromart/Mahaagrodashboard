import React from 'react';
import MenuList from './MenuList';
import RouteContent from './RouteContent';

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    
      <div
        style={{
          background: '#001529',
          color: 'white',
          padding: '10px 20px',
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        Header
      </div>

     
      <div style={{ display: 'flex', flex: 1 }}>
        <MenuList/>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
        <RouteContent/>
        </div>
      </div>
    </div>
  );
};

export default Layout;



