import React, { useState } from 'react';
import { Tabs } from 'antd';
import { Box } from '@chakra-ui/react';
import AdminEarningReport from './AdminEarningReport';
import SellerEarningReport from './SellerEarningReport';

const EarningReport = () => {
  const [activeTab, setActiveTab] = useState('1');

  const items = [
    { key: '1', label: 'Admin Panel' },
    { key: '2', label: 'Seller Panel' },
  ];

  return (
    <>
      <Box>
      <Box mb={6}>
          <h2
            className="content-title"
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "20px",
              color: "#4A5568",
            }}
          >
            Earning Reports
          </h2>
        </Box>

        <Tabs
          defaultActiveKey="1"
          onChange={(key) => setActiveTab(key)}
          items={items.map((item) => ({
            key: item.key,
            label: item.label,
          }))}
        />
      </Box>
      {activeTab === '1' ? <AdminEarningReport /> : <SellerEarningReport />}
    </>
  );
};

export default EarningReport;
