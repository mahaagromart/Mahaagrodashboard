import React, { useState } from "react";
import { Table, Button, Space, Input } from "antd";
import { MdSearch } from "react-icons/md";


const { Column } = Table;

// Initial coupon data
const initialData = [
  {
    SL: "1",
    image : "img.png",
    ProductName: "Noga Chocolate",
    TotalSale: "23543"
  },
  {
    SL: "2",
    image : "img.png",
    ProductName: "Pineapple Squash",
    TotalSale: "23543",
  },
  {
    SL: "3",
    ProductName: "ChaiPatti",
    ProductQTY : "104",
    TotalSale: "23543"
  },
];

const TopSellingProductTable = () => {
  const [data, setData] = useState(initialData);


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
      <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Top Selling Products</h2>
      </div>

      <Table
        dataSource={data}
        rowKey="SL"
        bordered={false}
        pagination={{ pageSize: 5 }}
      >
        <Column title="SL" dataIndex="SL" key="SL" align="center" />
        <Column title="Product Name" dataIndex="ProductName" key="ProductName" align="center" />
       
        <Column
          title="Totoal Sale"
          dataIndex="TotalSale"
          key="TotalSale"
          align="center"
        />
      </Table>
    </div>
  );
};

export default TopSellingProductTable