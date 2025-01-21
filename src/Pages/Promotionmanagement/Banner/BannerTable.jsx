import React, { useState } from "react";
import { Button, Space, Table, Input } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";

const { Column } = Table;

const BannerTable = () => {
  // Sample data
  const initialData = [
    {
      id: "1",
      image: "https://via.placeholder.com/50",
      bannerType: "Fruits",
      status: "Active",
    },
    {
      id: "2",
      image: "https://via.placeholder.com/50",
      bannerType: "Vegetables",
      status: "Inactive",
    },
    {
      id: "3",
      image: "https://via.placeholder.com/50",
      bannerType: "Dairy",
      status: "Active",
    },
  ];

  // State for data and search text
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");

  // Toggle the status between Active and Inactive
  const handleToggleStatus = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        record.status === "Active" ? "deactivate" : "activate"
      } this banner.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Update the status of the row
        setData((prevData) =>
          prevData.map((item) =>
            item.id === record.id
              ? { ...item, status: record.status === "Active" ? "Inactive" : "Active" }
              : item
          )
        );
        Swal.fire(
          "Updated!",
          `The banner is now ${
            record.status === "Active" ? "Inactive" : "Active"
          }.`,
          "success"
        );
      }
    });
  };

  // Delete banner with confirmation
  const handleDelete = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this banner!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Filter out the deleted item from the data array
        setData((prevData) => prevData.filter((item) => item.id !== record.id));
        Swal.fire("Deleted!", "The banner has been deleted.", "success");
      }
    });
  };

  // Filter data based on the search text
  const filteredData = data.filter((item) =>
    item.bannerType.toLowerCase().includes(searchText.toLowerCase())
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Banner List</h2>

        <Input
          placeholder="Search by banner type"
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

      {/* Table */}
      <Table
        dataSource={filteredData}
        rowKey="id"
        bordered={false}
        pagination={{ pageSize: 5 }}
        style={{
          border: "none",
        }}
      >
        <Column title="ID" dataIndex="id" key="id" align="center" />

        <Column
          title="Image"
          dataIndex="image"
          key="image"
          align="center"
          render={(text) => (
            <img
              src={text}
              alt="Banner"
              style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
            />
          )}
        />

        <Column title="Banner Type" dataIndex="bannerType" key="bannerType" align="center" />

        <Column
          title="Publish"
          dataIndex="status"
          key="status"
          align="center"
          render={(_, record) => (
            <Button
              onClick={() => handleToggleStatus(record)}
              style={{
                background: record.status === "Active" ? "#52c41a" : "#f5222d",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
              }}
            >
              {record.status === "Active" ? "Deactivate" : "Activate"}
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
                onClick={() => alert(`Edit item with ID: ${record.id}`)} // Placeholder for edit action
              />
              <Button
                icon={<MdDelete />}
                type="primary"
                danger
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => handleDelete(record)} // Delete action
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default BannerTable;
