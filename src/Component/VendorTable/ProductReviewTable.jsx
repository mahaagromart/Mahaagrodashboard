import React, { useState } from "react";
import { Table, Button, Space, Input, Tooltip, Rate } from "antd";
import { MdDownload, MdSearch } from "react-icons/md";
import { FaEye } from "react-icons/fa6";

const { Column } = Table;

const initialData = [
  {
    SL: "1",
    Product: "ParleG",
    Rating: "4.5",
    Review: "nice product",
    Date: "2024-03-10",
    TotalAmount: "$10",
    Status: "True"
  },
  {
    SL: "2",
    Product: "Apple",
    Rating: "5.0",
    Review: "excellent product",
    Date: "2024-03-11",
    TotalAmount: "$2000",
    Status: "True"
  }
];

const ProductReviewTable = () => {
  const [searchText, setSearchText] = useState("");

  const filteredData = initialData.filter((item) =>
    item.Product.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleView = (record) => {
    console.log("View product:", record);
  };

  const handleDownload = (record) => {
    console.log("Download product:", record);
  };

  const handleToggleStatus = (record) => {
    console.log("Toggle status for:", record);
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Review List</h2>
        <Input
          placeholder="Search by Product name"
          style={{ width: "300px", paddingLeft: "30px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<MdSearch style={{ marginRight: "10px" }} />}
        />
      </div>

      <Table dataSource={filteredData} rowKey="SL" bordered={false} pagination={{ pageSize: 12 }}>
        <Column title="SL" dataIndex="SL" key="SL" align="center" />
        <Column title="Product" dataIndex="Product" key="Product" align="center" />
        <Column
          title="Rating"
          dataIndex="Rating"
          key="Rating"
          align="center"
          render={(rating) => (
            <Rate allowHalf value={Number(rating)} disabled />
          )}
        />
        <Column title="Review" dataIndex="Review" key="Review" align="center" />
        <Column title="Date" dataIndex="Date" key="Date" align="center" />
        {/* <Column title="Total Amount" dataIndex="TotalAmount" key="TotalAmount" align="center" /> */}
        <Column
          title="Status"
          dataIndex="Status"
          key="Status"
          align="center"
          render={(_, record) => (
            <Button
              onClick={() => handleToggleStatus(record)}
              style={{
                background: record.Status === "True" ? "#52c41a" : "#f5222d",
                color: "#fff",
                border: "none",
              }}
            >
              {record.Status === "True" ? "Deactivate" : "Activate"}
            </Button>
          )}
        />
        {/* <Column
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
        /> */}
      </Table>
    </div>
  );
};

export default ProductReviewTable;
