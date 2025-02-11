import React, { useState } from "react";
import { Table, Button, Space, Input } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";


const { Column } = Table;

// Initial coupon data
const initialData = [
  {
    id: "1",
    Duration: "January-2025",
    InHouseEarning: "0.00",
    CommissionEarning: "0.00",
    EarnFromShipping : "10.0",
    DiscountGiven :"0.0",
    GST : "0.00",
    RefundGiven : "0.0",
    TotalEarning : "435.00",
  },
  {
    id: "2",
    Duration: "February-2025",
    InHouseEarning: "0.00",
    CommissionEarning: "0.00",
    EarnFromShipping : "10.0",
    DiscountGiven :"0.0",
    GST : "0.00",
    RefundGiven : "0.0",
    TotalEarning : "435.00",
  },
  {
    id: "3",
    Duration: "March-2025",
    InHouseEarning: "0.00",
    CommissionEarning: "0.00",
    EarnFromShipping : "10.0",
    DiscountGiven :"0.0",
    GST : "0.00",
    RefundGiven : "0.0",
    TotalEarning : "435.00",
  },
  {
    id: "4",
    Duration: "April-2025",
    InHouseEarning: "0.00",
    CommissionEarning: "0.00",
    EarnFromShipping : "10.0",
    DiscountGiven :"0.0",
    GST : "0.00",
    RefundGiven : "0.0",
    TotalEarning : "435.00",
  },

];

const TotalEarningTable = () => {
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Total Earnings</h2>


      </div>

      <Table
        dataSource={data}
        rowKey="id"
        bordered={false}
        pagination={{ pageSize: 12}}
      >
        <Column title="ID" dataIndex="id" key="id" align="center" />
        <Column title="Duration" dataIndex="Duration" key="Duration" align="center" />
        <Column
          title="In-House Earning"
          dataIndex="InHouseEarning"
          key="InHouseEarning"
          align="center"
        />  
        <Column
          title="Commission Earning"
          dataIndex="CommissionEarning"
          key="CommissionEarning"
          align="center"
        />  
        <Column
          title="Earn From Shipping"
          dataIndex="EarnFromShipping"
          key="EarnFromShipping"
          align="center"
        />  

        <Column
          title="GST"
          dataIndex="GST"
          key="GST"
          align="center"
        />  
        <Column
          title="Refund Given"
          dataIndex="RefundGiven"
          key="RefundGiven"
          align="center"
        />  
        <Column
          title="Total Earning"
          dataIndex="TotalEarning"
          key="TotalEarning"
          align="center"
        />  
      </Table>
    </div>
  );
};

export default TotalEarningTable;
