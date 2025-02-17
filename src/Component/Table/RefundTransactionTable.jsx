import React, { useState } from "react";
import { Table, Button, Space, Input } from "antd";
import { MdSearch, MdDownload } from "react-icons/md";
import * as XLSX from "xlsx"



const { Column } = Table;

// Initial coupon data
const initialData = [
  {
    SL: "1",
    Product : "Noga",
    RefundId: "1",
    OrderId : "234234",
    ShopName : "Ishwar Youth Export",
    PaymentMethod : "Digitally Paid",
    PaymentStatus : "Paid",
    PaidBy : "Seller",
    Amount : "2343₹",
    TransactionType : "Refunded"
  },
];

const RefundTransactionTable = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const filteredData = data.filter((item) =>
    item.OrderId.toLowerCase().includes(searchText.toLowerCase())
  );

  const exportToExcel = (data, filename = "data.xlsx") => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename);
  };

  const handleDownload = (record) => {
    exportToExcel([record], `data_row_${record.OrderId}.xlsx`);
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Total Earnings</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Input
            placeholder="Search by Order ID"
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
          <Button
            type="primary"
            icon={<MdDownload />}
            onClick={() => exportToExcel(filteredData, "all_data.xlsx")}
            style={{ marginLeft: "10px" }}
          >
            Download All
          </Button>
        </div>
      </div>

      <Table
        dataSource={filteredData}
        rowKey="SL"
        bordered={false}
        pagination={{ pageSize: 12 }}
        Space
      >
        <Column title="Product" dataIndex="Product" key="Product" align="center" />
        <Column title="Refund Id" dataIndex="RefundId" key="RefundId" align="center" />
        <Column title="Order Id" dataIndex="OrderId" key="OrderId" align="center" />
        <Column title="payment Method" dataIndex="PaymentMethod" key="PaymentMethod" align="center" />
        <Column title="Payment Status" dataIndex="PaymentStatus" key="PaymentStatus" align="center" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
            
              <Button
                icon={<MdDownload />}
                onClick={() => handleDownload(record)}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};



export default RefundTransactionTable