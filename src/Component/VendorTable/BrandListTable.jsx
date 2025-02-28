import React, { useState } from "react";
import { Table, Button, Space, Input, Tooltip } from "antd";
import { MdSearch } from "react-icons/md";
import { FaEye } from "react-icons/fa6";

const { Column } = Table;

// Initial brand data
const initialData = [
  {
    SL: "1",
    BrandLogo: "https://via.placeholder.com/100", // Valid placeholder image
    BrandName: "ParleG",
    TotalProduct: "1",
    TotalOrder: "0",
  },
  {
    SL: "2",
    BrandLogo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Logo-Apple.svg", // Valid Apple logo
    BrandName: "Apple",
    TotalProduct: "1",
    TotalOrder: "0",
  },
  {
    SL: "3",
    BrandLogo: "https://via.placeholder.com/100",
    BrandName: "LUX",
    TotalProduct: "1",
    TotalOrder: "0",
  },
  {
    SL: "4",
    BrandLogo: "https://via.placeholder.com/100",
    BrandName: "Tiger",
    TotalProduct: "1",
    TotalOrder: "0",
  },
];

const BrandListTable = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");

  const filteredData = data.filter((item) =>
    item.BrandName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleView = (record) => {
    console.log("View brand:", record);
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Total Brand List</h2>
        <Input
          placeholder="Search by Brand name"
          style={{
            width: "300px",
            paddingLeft: "30px",
          }}
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

        {/* Brand Logo Column */}
        <Column
          title="Brand Logo"
          dataIndex="BrandLogo"
          key="BrandLogo"
          align="center"
          render={(text) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={text}
                alt="Brand Logo"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                  padding: "5px",
                  backgroundColor: "#fff",
                }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}
        />

        <Column title="Brand Name" dataIndex="BrandName" key="BrandName" align="center" />

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
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default BrandListTable;
