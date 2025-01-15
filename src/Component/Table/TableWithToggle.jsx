import React, { useState } from "react";
import { Button, Space, Table, Input } from "antd";
import { MdDelete, MdEdit , MdSearch} from "react-icons/md";
import Swal from "sweetalert2";

const { Column } = Table;

// Initial data
const initialData = [
  {
    id: "1",
    categoryImage: "https://via.placeholder.com/50",
    categoryName: "Fruits",
    priority: 1,
    status: "Active",
  },
  {
    id: "2",
    categoryImage: "https://via.placeholder.com/50",
    categoryName: "Vegetables",
    priority: 2,
    status: "Inactive",
  },
  {
    id: "3",
    categoryImage: "https://via.placeholder.com/50",
    categoryName: "Dairy",
    priority: 3,
    status: "Active",
  },
];

const TableWithToggle = () => {
  const [data, setData] = useState(initialData); 
  const [searchText, setSearchText] = useState(""); 

  const handleToggleStatus = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        record.status === "Active" ? "deactivate" : "activate"
      } this category.`,
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
          `The category is now ${
            record.status === "Active" ? "Inactive" : "Active"
          }.`,
          "success"
        );
      }
    });
  };

  // Delete handler with Swal confirmation
  const handleDelete = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((item) => item.id !== record.id));
        Swal.fire("Deleted!", "The category has been deleted.", "success");
      }
    });
  };

  // Filtered data based on search
  const filteredData = data.filter((item) =>
    item.categoryName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        {/* Category List Title */}
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>
          Category List
        </h2>

        {/* Search Bar with Icon */}
        <Input
          placeholder="Search by category name"
          style={{
            width: "300px", // Adjust width as needed
            paddingLeft: "30px", // Space for the icon
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<MdSearch style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />}
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
          title="Category Image"
          dataIndex="categoryImage"
          key="categoryImage"
          align="center"
          render={(text) => (
            <img
              src={text}
              alt="Category"
              style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
            />
          )}
        />

        <Column title="Name" dataIndex="categoryName" key="categoryName" align="center" />

        <Column title="Priority" dataIndex="priority" key="priority" align="center" />

        <Column
          title="Status"
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
                onClick={() => alert(`Edit item with ID: ${record.id}`)}
              />
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

export default TableWithToggle;
