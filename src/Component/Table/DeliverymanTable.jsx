import React, { useState } from "react";
import { Table, Button, Space, Input, Tooltip } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import { BsCashCoin } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const { Column } = Table;

// Initial coupon data
const initialData = [
  {
    SL: "1",
    Name: "Sanjeev",
    ContactInfo: "sanjeevkrpd11@gmail.com",
    TotalOrders: "0",
    Ratings: "4",
    Status: "Active",
  },
];

const DeliverymanTable = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
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

  const handleCash =  (record)=>{
   
     console.log(record.SL)
        navigate("/EarningStatement",{
           state : {
            SL  : record.SL
           }
        })

  }


  const handleToggleStatus = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        record.Status === "Active" ? "deactivate" : "activate"
      } this category.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) =>
          prevData.map((item) =>
            item.SL === record.SL
              ? { ...item, Status: item.Status === "Active" ? "Inactive" : "Active" }
              : item
          )
        );

        Swal.fire(
          "Updated!",
          `The category is now ${
            record.Status === "Active" ? "Inactive" : "Active"
          }.`,
          "success"
        );
      }
    });
  };

  // Filtered data based on search
  const filteredData = data.filter((item) =>
    item.Name.toLowerCase().includes(searchText.toLowerCase())
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
          placeholder="Search by name"
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
        <Column title="Name" dataIndex="Name" key="Name" align="center" />
        <Column title="Contact Info" dataIndex="ContactInfo" key="ContactInfo" align="center" />
        <Column title="Total Orders" dataIndex="TotalOrders" key="TotalOrders" align="center" />
        <Column title="Ratings" dataIndex="Ratings" key="Ratings" align="center" />
        <Column
          title="Status"
          dataIndex="Status"
          key="Status"
          align="center"
          render={(_, record) => (
            <Button
              onClick={() => handleToggleStatus(record)}
              style={{
                background: record.Status === "Active" ? "#52c41a" : "#f5222d",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
              }}
            >
              {record.Status === "Active" ? "Deactivate" : "Activate"}
            </Button>
          )}
        />

        <Column
          title="Action"
          key="action"
          align="center"
          render={(_, record) => (
            <Space size="middle">
              <Button
                icon={<MdEdit />}
                type="primary"
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => alert(`Edit item with ID: ${record.SL}`)}
              />
              <Button
                icon={<BsCashCoin />}
                type="primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "green",
                  color: "white",
                }}
                onClick={() => handleCash(record)}
              />
              <Button icon={<MdDelete />} type="primary" danger onClick={() => handleDelete(record)} />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default DeliverymanTable;
