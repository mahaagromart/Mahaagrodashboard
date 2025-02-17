import React, { useState } from "react";
import { Table, Button, Space, Input } from "antd";
import { MdSearch, MdDownload } from "react-icons/md";
import * as XLSX from "xlsx"



const { Column } = Table;

// Initial coupon data
const initialData = [
  {
    SL: "1",
    OrderId : "32383",
    ShopName: "Noga",
    CustomerName: "0.00",
    TotalProductAmount : "10.0",
    ProductDiscount: "0.00",
    CouponDiscount :"0.0",
    DiscountedAmount : "0.00",
    GST : "0.0",
    ShippingCharge : "435.00",
    OrderAmount : "150₹",
    DeliveredBy : "Admin",
    AdminDiscount : "0.00",
    SellerDiscount : "0.00",
    AdminCommission : "3.00",
    AdminNetIncome : "3.00",
    PaymentMethod : "online",
    PaymetStatus : "Hold",
  },
  {
    SL: "2",
    OrderId : "32383",
    ShopName: "Noga",
    CustomerName: "0.00",
    TotalProductAmount : "10.0",
    ProductDiscount: "0.00",
    CouponDiscount :"0.0",
    DiscountedAmount : "0.00",
    GST : "0.0",
    ShippingCharge : "435.00",
    OrderAmount : "150₹",
    DeliveredBy : "Admin",
    AdminDiscount : "0.00",
    SellerDiscount : "0.00",
    AdminCommission : "3.00",
    AdminNetIncome : "3.00",
    PaymentMethod : "online",
    PaymetStatus : "Hold",
  },
  {
    SL: "3",
    OrderId : "32383",
    ShopName: "Noga",
    CustomerName: "0.00",
    TotalProductAmount : "10.0",
    ProductDiscount: "0.00",
    CouponDiscount :"0.0",
    DiscountedAmount : "0.00",
    GST : "0.0",
    ShippingCharge : "435.00",
    OrderAmount : "150₹",
    DeliveredBy : "Admin",
    AdminDiscount : "0.00",
    SellerDiscount : "0.00",
    AdminCommission : "3.00",
    AdminNetIncome : "3.00",
    PaymentMethod : "online",
    PaymetStatus : "Hold",
  },
  {
    SL: "4",
    OrderId : "32383",
    ShopName: "Noga",
    CustomerName: "0.00",
    TotalProductAmount : "10.0",
    ProductDiscount: "0.00",
    CouponDiscount :"0.0",
    DiscountedAmount : "0.00",
    GST : "0.0",
    ShippingCharge : "435.00",
    OrderAmount : "150₹",
    DeliveredBy : "Admin",
    AdminDiscount : "0.00",
    SellerDiscount : "0.00",
    AdminCommission : "3.00",
    AdminNetIncome : "3.00",
    PaymentMethod : "online",
    PaymetStatus : "Hold",
  },

];

const TotalTransactionTable = () => {
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
        <Column title="Shop Name" dataIndex="ShopName" key="ShopName" align="center" />
        <Column title="Customer Name" dataIndex="CustomerName" key="CustomerName" align="center" />
        <Column title="Total Product Amount" dataIndex="TotalProductAmount" key="TotalProductAmount" align="center" />
        <Column title="Product Discount" dataIndex="ProductDiscount" key="ProductDiscount" align="center" />
        <Column title="Coupon Discount" dataIndex="CouponDiscount" key="CouponDiscount" align="center" />
        <Column title="Discounted Amount" dataIndex="DiscountedAmount" key="DiscountedAmount" align="center" />
        <Column title="GST" dataIndex="GST" key="GST" align="center" />
        <Column title="Shipping Charge" dataIndex="ShippingCharge" key="ShippingCharge" align="center" />
        <Column title="Order Amount" dataIndex="OrderAmount" key="OrderAmount" align="center" />
        <Column title="Delivered By" dataIndex="DeliveredBy" key="DeliveredBy" align="center" />
        <Column title="Admin Discount" dataIndex="AdminDiscount" key="AdminDiscount" align="center" />
        <Column title="Seller Discount" dataIndex="SellerDiscount" key="SellerDiscount" align="center" />
        <Column title="Admin Commission" dataIndex="AdminCommission" key="AdminCommission" align="center" />
        <Column title="Admin Net Income" dataIndex="AdminNetIncome" key="AdminNetIncome" align="center" />
        <Column title="Seller Net Income" dataIndex="SellerNetIncome" key="SellerNetIncome" align="center" />
        <Column title="Payment Method" dataIndex="PaymentMethod" key="PaymentMethod" align="center" />
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

export default TotalTransactionTable;