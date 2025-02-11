import React, { useState } from "react";
import { Table, Button, Space, Input } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";


const { Column } = Table;

// Initial coupon data
const initialData = [
  {
    id: "1",
    Seller: "Noga",
    EarnFromOrder: "0.00",
    EarnFromShipping : "10.0",
    CommissionGiven: "0.00",
    DiscountGiven :"0.0",
    TaxCollected : "0.00",
    RefundGiven : "0.0",
    TotalEarning : "435.00",
  },
  {
    id: "2",
    Seller: "Sanjay Shirodkar",
    EarnFromOrder: "0.00",
    EarnFromShipping : "10.0",
    CommissionGiven: "0.00",
    DiscountGiven :"0.0",
    TaxCollected : "0.00",
    RefundGiven : "0.0",
    TotalEarning : "435.00",
  },
  {
    id: "3",
    Seller: "Pesticide MAIDC",
    EarnFromOrder: "0.00",
    EarnFromShipping : "10.0",
    CommissionGiven: "0.00",
    DiscountGiven :"0.0",
    TaxCollected : "0.00",
    RefundGiven : "0.0",
    TotalEarning : "435.00",
  },
  {
    id: "4",
    Seller: "Noga",
    EarnFromOrder: "0.00",
    EarnFromShipping : "10.0",
    CommissionGiven: "0.00",
    DiscountGiven :"0.0",
    TaxCollected : "0.00",
    RefundGiven : "0.0",
    TotalEarning : "435.00",
  },

];

const TotalSellerEarningTable = () => {
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
        <Column title="Seller Info" dataIndex="Seller" key="Seller" align="center" />
        <Column
          title="Earn From Shipping"
          dataIndex="EarnFromShipping"
          key="EarnFromShipping"
          align="center"
        />  
        <Column
          title="Commission Given"
          dataIndex="CommissionGiven"
          key="CommissionGiven"
          align="center"
        />  
        <Column
          title="Discount Given"
          dataIndex="DiscountGiven"
          key="DiscountGiven"
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



export default TotalSellerEarningTable;