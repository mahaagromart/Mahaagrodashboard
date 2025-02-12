import React, { useState } from "react";
import { Table, Button, Space, Input , Tooltip} from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa6";

const { Column } = Table;

// Initial coupon data
const initialData = [
  {
    SL: "1",
    Seller: " Sanjeev kumar",
    TotoalOrder  : "233₹",
    Commission : "35₹",
    CommissionGiven: "0.00",
    RefundRate : "0%",
    
  },
  {
    SL: "2",
    Seller: " Himanshu kumar",
    TotoalOrder  : "233₹",
    Commission : "35₹",
    CommissionGiven: "0.00",
    RefundRate : "0%",
    
  },
  {
    SL: "3",
    Seller: " pavan kumar",
    TotoalOrder  : "233₹",
    Commission : "35₹",
    CommissionGiven: "0.00",
    RefundRate : "0%",
    
  },
  {
    SL: "4",
    Seller: " Kashyap kumar",
    TotoalOrder  : "233₹",
    Commission : "35₹",
    CommissionGiven: "0.00",
    RefundRate : "0%",
    
  },

];

const TotalSeller = () => {
  const [data, setData] = useState(initialData);
const [searchText, setSearchText] = useState("");
  // Filtered data based on search
  const filteredData = data.filter((item) =>
    item.Seller.toLowerCase().includes(searchText.toLowerCase())
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Total Seller</h2>
        <Input
          placeholder="Search by category name"
          style={{
            width: "300px",
            paddingLeft: "30px",
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<MdSearch style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />}
        />

      </div>

      <Table
        dataSource={filteredData}
        rowKey="SL"
        bordered={false}
        pagination={{ pageSize: 12}}
      >
        <Column title="SL" dataIndex="SL" key="SL" align="center" />
        <Column title="Seller Info" dataIndex="Seller" key="Seller" align="center" />
        <Column
          title="Total order"
          dataIndex="TotoalOrder"
          key="TotoalOrder"
          align="center"
        />  
        <Column
          title="Commission"
          dataIndex="CommissionGiven"
          key="CommissionGiven"
          align="center"
        />  
        <Column
          title="Refund Rate"
          dataIndex="RefundRate"
          key="RefundRate"
          align="center"
        />  
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



export default TotalSeller