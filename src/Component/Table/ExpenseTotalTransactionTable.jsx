import React, { useState } from "react";
import { Table, Button, Space, Input } from "antd";
import { MdSearch, MdDownload } from "react-icons/md";
import * as XLSX from "xlsx"



const { Column } = Table;

// Initial coupon data
const initialData = [
  {
    SL: "1",
    XID : "3943",
    TransactionDate: "11march2004",
    OrderId : "2304ui0234",
    ExpenseAmount : "435",
    ExpenseType : "Discount"
  },
  {
    SL: "2",
    XID : "3933",
    TransactionDate: "11march2004",
    OrderId : "2304ui056234",
    ExpenseAmount : "435",
    ExpenseType : "Discount"
  },
  {
    SL: "3",
    XID : "4943",
    TransactionDate: "11march2004",
    OrderId : "2304w54i0234",
    ExpenseAmount : "435",
    ExpenseType : "Discount"
  },
  {
    SL: "4",
    XID : "5943",
    TransactionDate: "11march2004",
    OrderId : "409843",
    ExpenseAmount : "435",
    ExpenseType : "Discount"
  },

];

const ExpenseTotalTransactionTable = () => {
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
        <Column title="XID" dataIndex="XID" key="XID" align="center" />
        <Column title="Transaction Date" dataIndex="TransactionDate" key="TransactionDate" align="center" />
        <Column title="Order Id" dataIndex="OrderId" key="OrderId" align="center" />
        <Column title="Expense Amount" dataIndex="ExpenseAmount" key="ExpenseAmount" align="center" />
        <Column title="Expense Type" dataIndex="ExpenseType" key="ExpenseType" align="center" />
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


export default ExpenseTotalTransactionTable