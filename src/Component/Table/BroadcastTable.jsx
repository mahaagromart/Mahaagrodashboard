import React, { useState } from "react";
import { Table, Button, Space, Input } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";


const { Column } = Table;

// Initial coupon data
const initialData = [
  {
    id: "1",
    title: "Sale Sale Sale",
    message: "Message",
    duration: "2025-01-01 to 2025-01-31",

  },
  {
    id: "1",
    title: "Sale Sale Sale",
    message: "message",
    duration: "2025-01-01 to 2025-01-31",

  },
  {
    id: "1",
    title: "Sale Sale Sale",
    message: "Message",
    duration: "2025-01-01 to 2025-01-31",

  },
];

const BroadcastTable = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");

  const handleToggleStatus = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        record.status === "Active" ? "deactivate" : "activate"
      } this coupon.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === record.id
              ? { ...item, status: record.status === "Active" ? "Inactive" : "Active" }
              : item
          )
        );
        Swal.fire(
          "Updated!",
          `The coupon is now ${
            record.status === "Active" ? "Inactive" : "Active"
          }.`,
          "success"
        );
      }
    });
  };

  const handleDelete = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this coupon!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((item) => item.id !== record.id));
        Swal.fire("Deleted!", "The coupon has been deleted.", "success");
      }
    });
  };

  const handleEdit = (record) => {
    alert(`Edit coupon with ID: ${record.id}`);
  };



  // Filtered data based on search
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>BroadcastNotification List</h2>

        <Input
          placeholder="Search by Titile"
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
        rowKey="id"
        bordered={false}
        pagination={{ pageSize: 5 }}
      >
        <Column title="ID" dataIndex="id" key="id" align="center" />
        <Column title="Title" dataIndex="title" key="title" align="center" />
        <Column
          title="Message"
          dataIndex="message"
          key="message"
          align="center"
        />
      

        <Column
          title="Action"
          key="action"
          align="center"
          render={(_, record) => (
            <Space size="middle">

             
              <Button
                icon={<MdDelete />}
                type="primary"
                danger
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => handleDelete(record)}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default BroadcastTable;
