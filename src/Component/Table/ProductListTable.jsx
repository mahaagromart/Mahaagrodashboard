import React, { useState, useEffect } from "react";
import { Button, Space, Table, Input, Tooltip, Modal } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { IoBarcode } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const { Column } = Table;

const ProductListTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");

  useEffect(() => {
    getInHouseProduct();
  }, []);

  const getInHouseProduct = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}EcommerceProduct/GetAllProducts`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      if (res.data.Message === "SUCCESS") {
        // Remove duplicates by using a Set and converting it back to an array
        const uniqueProducts = Array.from(new Set(res.data.ProductList.map(p => p.Product_id)))
          .map(id => {
            return res.data.ProductList.find(p => p.Product_id === id);
          });
        setData(uniqueProducts);
      } else {
        await Swal.fire({
          title: "Error in Getting Product List",
          text: "Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      await Swal.fire({
        title: "Error",
        text: "Failed to fetch the product list. Please try again later. " + error,
        icon: "error",
      });
    }
  };

  const handleToggleStatus = async (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        record.status === "Active" ? "deactivate" : "activate"
      } this product.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post(
            `${apiUrl}EcommerceProduct/ProductToggleStatus`,
            { Product_id: record.Product_id },
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );

          if (res.data.Message === "Success") {
            Swal.fire({
              title: "Status Updated",
              text: "Product status updated successfully",
              icon: "success",
            });
            setData((prevData) =>
              prevData.map((item) =>
                item.Product_id === record.Product_id
                  ? { ...item, status: record.status === "Active" ? "Inactive" : "Active" }
                  : item
              )
            );
          } else {
            await Swal.fire({
              title: "Error Occurred",
              text: "Please try again.",
              icon: "error",
            });
          }
        } catch (error) {
          await Swal.fire({
            title: "Error",
            text: "Failed to update product status. Please try again later. " + error,
            icon: "error",
          });
        }
      }
    });
  };

  const handleToggleVerified = async (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        record.verified === "Active" ? "deactivate" : "activate"
      } certification for this product.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post(
            `${apiUrl}EcommerceProduct/ProductToggleCertified`,
            { Product_id: record.Product_id },
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );

          if (res.data.Message === "Success") {
            Swal.fire({
              title: "Certification Status Updated",
              text: "Certification status updated successfully",
              icon: "success",
            });
            setData((prevData) =>
              prevData.map((item) =>
                item.Product_id === record.Product_id
                  ? { ...item, verified: record.verified === "Active" ? "Inactive" : "Active" }
                  : item
              )
            );
          } else {
            await Swal.fire({
              title: "Error Occurred",
              text: "Please try again.",
              icon: "error",
            });
          }
        } catch (error) {
          await Swal.fire({
            title: "Error",
            text: "Failed to update certification status. Please try again later. " + error,
            icon: "error",
          });
        }
      }
    });
  };

  const handleGenerateCode = (record) => {
    navigate("/GenerateBarCode", {
      state: {
        productSku: record.Product_id,
        productPrice: record.Price,
      },
    });
  };

  const handleDelete = async (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post(
            `${apiUrl}EcommerceProduct/DeleteProduct`,
            { Product_id: record.Product_id },
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );

          if (res.data.Message === "Success") {
            Swal.fire({
              title: "Deleted",
              text: "Data deleted successfully",
              icon: "success",
            });
            setData((prevData) =>
              prevData.filter((item) => item.Product_id !== record.Product_id)
            );
          } else {
            await Swal.fire({
              title: "Error While Deleting",
              text: "Please try again.",
              icon: "error",
            });
          }
        } catch (error) {
          await Swal.fire({
            title: "Error",
            text: "Failed to delete data. Please try again later. " + error,
            icon: "error",
          });
        }
      }
    });
  };

  const handleView = (record) => {
    setSelectedProduct(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const filteredData = data.filter((item) =>
    item.Product_Name.toLowerCase().includes(searchText.toLowerCase())
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

      <Table dataSource={filteredData} rowKey="Product_id" pagination={{ pageSize: 5 }}>
        <Column title="ID" dataIndex="Product_id" key="Product_id" align="center" />
        <Column
          title="Product Image"
          dataIndex="Image"
          key="Image"
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
        <Column title="Product Name" dataIndex="Product_Name" key="Product_Name" align="center" />
        <Column title="Description" dataIndex="Description" key="Description" align="center" />
        <Column title="Price" dataIndex="Price" key="Price" align="center" />
        <Column title="Quantity" dataIndex="Quantity" key="Quantity" align="center" />
        <Column title="Rating" dataIndex="Rating" key="Rating" align="center" />
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
                <Button
                  icon={<IoBarcode />}
                  type="primary"
                  onClick={() => handleGenerateCode(record)}
                />
              </Tooltip>
              <Tooltip title="View">
                <Button icon={<FaEye />} type="primary" onClick={() => handleView(record)} />
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

      <Modal
        title="Product Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedProduct && (
          <div>
            <p><strong>ID:</strong> {selectedProduct.Product_id}</p>
            <p><strong>Name:</strong> {selectedProduct.Product_Name}</p>
            <p><strong>Description:</strong> {selectedProduct.Description}</p>
            <p><strong>Price:</strong> {selectedProduct.Price}</p>
            <p><strong>Quantity:</strong> {selectedProduct.Quantity}</p>
            <p><strong>Rating:</strong> {selectedProduct.Rating}</p>
            <p><strong>Certification:</strong> {selectedProduct.Certified==="0" ? "Certified":"Uncertified"}</p>
            <p><strong>Status:</strong> {selectedProduct.status==="0" ? "Activated" : "Deactivated"}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductListTable;