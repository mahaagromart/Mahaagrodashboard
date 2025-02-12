import React, { useState } from "react";
import { Table, Button, Space, Input } from "antd";
import { MdSearch } from "react-icons/md";


const { Column } = Table;

// Initial coupon data
const initialData = [
  {
    SL: "1",
    ProductName: "Noga",
    ProductQTY : "10",
    TotalSale: "23",
  },
  {
    SL: "2",
    ProductName: "Glucosse",
    ProductQTY : "102",
    TotalSale: "2365",
  },
  {
    SL: "3",
    ProductName: "ChaiPatti",
    ProductQTY : "104",
    TotalSale: "23543",
  },
];

const InhouseTable = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");



  // Filtered data based on search
  const filteredData = data.filter((item) =>
    item.ProductName.toLowerCase().includes(searchText.toLowerCase())
  );

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

        <Input
          placeholder="Search by Product name"
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

      <Table
        dataSource={filteredData}
        rowKey="SL"
        bordered={false}
        pagination={{ pageSize: 5 }}
      >
        <Column title="SL" dataIndex="SL" key="SL" align="center" />
        <Column title="Product Name" dataIndex="ProductName" key="ProductName" align="center" />
        <Column
          title="Quantity"
          dataIndex="ProductQTY"
          key="ProductQTy"
          align="center"
        />
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
export default InhouseTable