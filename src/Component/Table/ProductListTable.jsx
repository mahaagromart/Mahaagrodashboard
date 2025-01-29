import React, { useState } from "react";
import { Button, Space, Table, Input ,Tooltip } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { IoBarcode } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const { Column } = Table;

const initialData = [
  {
    id: "1",
    productImage: "https://via.placeholder.com/50",
    productName: "Apple",
    purchasePrice: "100",
    sellingPrice: "120",
    status: "Active",
    verified: "Active",
  },
  {
    id: "2",
    productImage: "https://via.placeholder.com/50",
    productName: "Banana",
    purchasePrice: "50",
    sellingPrice: "65",
    status: "Inactive",
    verified: "Active",
  },
  {
    id: "3",
    productImage: "https://via.placeholder.com/50",
    productName: "Milk",
    purchasePrice: "40",
    sellingPrice: "50",
    status: "Active",
    verified: "Inactive",
  },
];

const ProductListTable = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const handleToggleStatus = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        record.status === "Active" ? "deactivate" : "activate"
      } this product.`,
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
          `The product is now ${
            record.status === "Active" ? "Inactive" : "Active"
          }.`,
          "success"
        );
      }
    });
  };

  const handleToggleVerified = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        record.verified === "Active" ? "deactivate" : "activate"
      } certification for this product.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === record.id
              ? { ...item, verified: record.verified === "Active" ? "Inactive" : "Active" }
              : item
          )
        );
        Swal.fire(
          "Updated!",
          `The certification status is now ${
            record.verified === "Active" ? "Inactive" : "Active"
          }.`,
          "success"
        );
      }
    });
  };

  const handleGenerateCode = (record)=>{


    
  navigate("/GenerateBarCode", {
    state: {
      productSku: 398434, 
      productPrice: record.sellingPrice,
    },
  });
  }

  const handleDelete = (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((item) => item.id !== record.id));
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      }
    });
  };

  const filteredData = data.filter((item) =>
    item.productName.toLowerCase().includes(searchText.toLowerCase())
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Product List</h2>
        <Input
          placeholder="Search by product name"
          style={{ width: "300px", paddingLeft: "30px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<MdSearch />}
        />
      </div>

      <Table dataSource={filteredData} rowKey="id" pagination={{ pageSize: 5 }}>
        <Column title="ID" dataIndex="id" key="id" align="center" />
        <Column
          title="Product Image"
          dataIndex="productImage"
          key="productImage"
          align="center"
          render={(text) => (
            <img
              src={text}
              alt="Product"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}
        />
        <Column title="Product Name" dataIndex="productName" key="productName" align="center" />
        <Column title="Purchase Price" dataIndex="purchasePrice" key="purchasePrice" align="center" />
        <Column title="Selling Price" dataIndex="sellingPrice" key="sellingPrice" align="center" />
        <Column
          title="Certification"
          dataIndex="verified"
          key="verified"
          align="center"
          render={(_, record) => (
            <Button
              onClick={() => handleToggleVerified(record)}
              style={{
                background: record.verified === "Active" ? "#52c41a" : "#f5222d",
                color: "#fff",
                border: "none",
              }}
            >
              {record.verified === "Active" ? "Deactivate" : "Activate"}
            </Button>
          )}
        />
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
              <Tooltip title="Generate Barcode">
                <Button icon={<IoBarcode />} 
                type="primary"
                onClick={()=> handleGenerateCode(record)}
                />
                
              </Tooltip>
              <Tooltip title="View">
                <Button icon={<FaEye />} type="primary" />
              </Tooltip>
              <Tooltip title="Edit">
                <Button icon={<MdEdit />} type="primary" />
              </Tooltip>
              <Tooltip title="Delete">
                <Button
                  icon={<MdDelete />}
                  type="primary"
                  danger
                  onClick={() => handleDelete(record)}
                />
              </Tooltip>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default ProductListTable;
