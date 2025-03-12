import React, { useState } from "react";
import { Table, Button, Space, Input, Tooltip } from "antd";
import { MdDownload, MdSearch } from "react-icons/md";
import { FaEye } from "react-icons/fa6";

const { Column } = Table;

// Initial brand data
const initialData = [
  {
    SL: "1",
    BrandName: "ParleG",
    OrderID: "1001",
    OrderDate: "2024-03-10",
    CustomerInfo: "John Doe, john@example.com",
    TotalAmount: "$10",
    OrderStatus: "Pending"
  },
  {
    SL: "2",
    BrandName: "Apple",
    OrderID: "1002",
    OrderDate: "2024-03-11",
    CustomerInfo: "Jane Smith, jane@example.com",
    TotalAmount: "$2000",
    OrderStatus: "Shipped"
  },
  {
    SL: "3",
    BrandName: "LUX",
    OrderID: "1003",
    OrderDate: "2024-03-12",
    CustomerInfo: "Alice Brown, alice@example.com",
    TotalAmount: "$15",
    OrderStatus: "Delivered"
  },
  {
    SL: "4",
    BrandName: "Tiger",
    OrderID: "1004",
    OrderDate: "2024-03-13",
    CustomerInfo: "Bob Johnson, bob@example.com",
    TotalAmount: "$8",
    OrderStatus: "Cancelled"
  },
  {
    SL: "5",
    BrandName: "Tiger",
    OrderID: "1004",
    OrderDate: "2024-03-13",
    CustomerInfo: "Bob Johnson, bob@example.com",
    TotalAmount: "$8",
    OrderStatus: "OrderConfirmed"
  },
  {
    SL: "6",
    BrandName: "Tiger",
    OrderID: "1004",
    OrderDate: "2024-03-13",
    CustomerInfo: "Bob Johnson, bob@example.com",
    TotalAmount: "$8",
    OrderStatus: "Packaging"
  },
  {
    SL: "7",
    BrandName: "Tiger",
    OrderID: "1004",
    OrderDate: "2024-03-13",
    CustomerInfo: "Bob Johnson, bob@example.com",
    TotalAmount: "$8",
    OrderStatus: "OutForDelivery"
  },
  {
    SL: "7",
    BrandName: "Tiger",
    OrderID: "1004",
    OrderDate: "2024-03-13",
    CustomerInfo: "Bob Johnson, bob@example.com",
    TotalAmount: "$8",
    OrderStatus: "Returned"
  },
  {
    SL: "7",
    BrandName: "Tiger",
    OrderID: "1004",
    OrderDate: "2024-03-13",
    CustomerInfo: "Bob Johnson, bob@example.com",
    TotalAmount: "$8",
    OrderStatus: "FailedToDelivery"
  }
];

const OrderListTable = ({ type }) => {
  const [searchText, setSearchText] = useState("");

 
  const orderType = type?.trim().toLowerCase();




  const filteredData = initialData
    .filter((item) => !orderType || orderType === "allorders" || item.OrderStatus.toLowerCase() === orderType)
    .filter((item) => item.BrandName.toLowerCase().includes(searchText.toLowerCase()));



  const handleView = (record) => {
    console.log("View brand:", record);
  };

  const handleDownload = (record) => {
    console.log("Download brand:", record);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>
          Order List ({type || "All"})
        </h2>
        <Input
          placeholder="Search by Brand name"
          style={{ width: "300px", paddingLeft: "30px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={
            <MdSearch
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          }
        />
      </div>

      <Table dataSource={filteredData} rowKey="SL" bordered={false} pagination={{ pageSize: 12 }}>
        <Column title="SL" dataIndex="SL" key="SL" align="center" />
        <Column title="Brand Name" dataIndex="BrandName" key="BrandName" align="center" />
        <Column title="Order ID" dataIndex="OrderID" key="OrderID" align="center" />
        <Column title="Order Date" dataIndex="OrderDate" key="OrderDate" align="center" />
        <Column title="Customer Info" dataIndex="CustomerInfo" key="CustomerInfo" align="center" />
        <Column title="Total Amount" dataIndex="TotalAmount" key="TotalAmount" align="center" />
        <Column title="Order Status" dataIndex="OrderStatus" key="OrderStatus" align="center" />

        {/* Actions Column */}
        <Column
          title="Action"
          key="action"
          align="center"
          render={(_, record) => (
            <Space size="middle">
              <Tooltip title="View">
                <Button icon={<FaEye />} type="primary" onClick={() => handleView(record)} />
              </Tooltip>
              <Tooltip title="Download">
                <Button icon={<MdDownload />} type="primary" onClick={() => handleDownload(record)} />
              </Tooltip>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default OrderListTable;
