import React, { useState } from 'react';
import { Tabs } from 'antd';
import { Box } from '@chakra-ui/react';
import OrderTransaction from './OrderTransaction';
import ExpenseTransaction from './ExpenseTransaction';
import RefundTransaction from './RefundTransaction';

const TransactionReport = () => {
  const [activeTab, setActiveTab] = useState('1');

  const items = [
    { key: '1', label: 'Order Transactions' },
    { key: '2', label: 'Expense Transactions' },
    { key: '3', label: 'Refund Transactions' },
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
          Transaction Report
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
    {
      activeTab === '1' ? <OrderTransaction /> :
      activeTab === '2' ? <ExpenseTransaction /> :
      <RefundTransaction />
}

  </>
  )
}

export default TransactionReport