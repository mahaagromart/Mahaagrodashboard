import React, { useState } from "react";
import { Button, Space, Table, Input } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";

const { Column } = Table;

const CustomTable = ({ columns, data: initialData }) => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");

  // Delete handler with Swal confirmation
  const handleDelete = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this sub-category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((item) => item.id !== record.id));
        Swal.fire("Deleted!", "The sub-category has been deleted.", "success");
      }
    });
  };

  // Edit handler with Swal confirmation
  const handleEdit = (record) => {
    Swal.fire({
      title: "Edit Sub-Category",
      text: `Are you sure you want to edit the sub-category: ${record.SubCategoryName}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, edit!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Edit Confirmed!",
          `Proceed to edit the sub-category: ${record.SubCategoryName}`,
          "success"
        );
      }
    });
  };

  // Filtered data based on search
  const filteredData = data.filter((item) =>
    item.SubCategoryName.toLowerCase().includes(searchText.toLowerCase())
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Sub-Category List</h2>

        <Input
          placeholder="Search by sub-category name"
          style={{
            width: "300px",
            paddingLeft: "30px",
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<MdSearch style={{ marginRight: "10px" }} />}
        />
      </div>

      <Table dataSource={filteredData} rowKey="id" bordered={false} pagination={{ pageSize: 5 }}>
        {columns.map((column) => (
          <Column
            key={column.key}
            title={column.title}
            dataIndex={column.dataIndex}
            render={column.render}
            align={column.align || "center"}
          />
        ))}
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
                onClick={() => handleEdit(record)}
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

export default CustomTable;
