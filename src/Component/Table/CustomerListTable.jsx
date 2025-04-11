import React, { useEffect, useState } from "react";
import { Table, Button, Space, Input, Tooltip } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useDispatch , useSelector } from "react-redux";

const { Column } = Table;

// Initial coupon data
const initialData = [
  {
    SL: "1",
    CustomerName: "Sanjeev kumar",
    ContactInfo: "0392480233",
    Email: "sanjeevkrpd11@gmail.com",
    TotalOrder: "34",
    Action: "0.00",
  },
  {
    SL: "2",
    CustomerName: "Himanshu kumar",
    ContactInfo: "0392480233",
    Email: "himanshu@gmail.com",
    TotalOrder: "34",
    Action: "0.00",
  },
  {
    SL: "3",
    CustomerName: "Pavan kumar",
    ContactInfo: "0392480233",
    Email: "pavan@gmail.com",
    TotalOrder: "34",
    Action: "0.00",
  },
  {
    SL: "4",
    CustomerName: "Kashyap kumar",
    ContactInfo: "0392480233",
    Email: "kashyap@gmail.com",
    TotalOrder: "34",
    Action: "0.00",
  },
];

const CustomerListTable = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");

  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleDelete = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((item) => item.SL !== record.SL));
        Swal.fire("Deleted!", "Your record has been deleted.", "success");
      }
    });
  };




  // Filtered data based on search
  const filteredData = data.filter((item) =>
    item.CustomerName.toLowerCase().includes(searchText.toLowerCase())
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
          placeholder="Search by customer name"
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
        pagination={{ pageSize: 12 }}
      >
        
        <Column title="SL" dataIndex="SL" key="SL" align="center" />
        
              <Column
              title="Profile Image"
              dataIndex="thumbnailImages"
              key="thumbnailImages"
              align="center"
              render={(images) => (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={`${apiUrl}${images?.[0] || "default-image.jpg"}`} 
                    alt="Product"
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

        <Column title="Customer Name" dataIndex="CustomerName" key="CustomerName" align="center" />
        <Column title="Contact Info" dataIndex="ContactInfo" key="ContactInfo" align="center" />
        <Column title="Email" dataIndex="Email" key="Email" align="center" />
        <Column title="Total Order" dataIndex="TotalOrder" key="TotalOrder" align="center" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(_, record) => (
            <Space size="middle">
              <Tooltip title="View">
                <Button icon={<FaEye />} type="primary" onClick={() => handleView(record)} />
              </Tooltip>
              {/* <Tooltip title="Delete">
                <Button icon={<MdDelete />} type="primary" danger onClick={() => handleDelete(record)} />
              </Tooltip> */}
            </Space>
          )}
        />
      </Table>
    </div>

  );
};

export default CustomerListTable;
