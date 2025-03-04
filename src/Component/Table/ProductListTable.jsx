import React, { useState, useEffect } from "react";
import { Button, Space, Table, Input, Tooltip, Modal , Rate } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { IoBarcode } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const { Column } = Table;

const ProductListTable = () => {
  const [productList, setProductList] = useState([]);
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
      console.log("Calling API...");
      const res = await axios.get(
        `http://localhost:5136/Product/GetAllProducts`,  // Ensure correct URL
        {
          headers: { Authorization: `Bearer ${storedToken}` }
        }
      );

      if (res.data.message === "SUCCESS") {
        const products = res.data.dataset?.$values || [];
        setProductList(products);
      } else {
        await Swal.fire({
          title: "Error in Getting Product List",
          text: "Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error.response || error);
      await Swal.fire({
        title: "Error",
        text: `Failed to fetch product list: ${error.response?.status} ${error.message}`,
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


  const getValue = (value)=>{
    if(value === 0){
      return "Active";
    }else{
      return "Deactivate"
    }
  }


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

  const filteredData = productList.filter((item) =>
    item.product_Name.toLowerCase().includes(searchText.toLowerCase())
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
        <Column title="ID" dataIndex="id" key="id" align="center" />

        <Column
            title="Product Image"
            dataIndex="images"
            key="images"
            align="center"
          render={(images) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
               src={`${apiUrl}/${images}`}
                alt="Brand Logo"
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
        <Column title="Product Name" dataIndex="product_Name" key="product_Name" align="center" />
        <Column title="Description" dataIndex="product_Description" key="product_Description" align="center" />
        <Column title="Price" dataIndex="sellinG_PRICE" key="sellinG_PRICE" align="center" />
        <Column title="Quantity" dataIndex="currenT_STOCK_QUANTITY" key="currenT_STOCK_QUANTITY" align="center" />
        <Column
            title="Rating"
            dataIndex="rating"
            key="rating"
            align="center"
            minWidth={180} 
            render={(rating) => (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Rate allowHalf defaultValue={rating} disabled />
              </div>
            )}
          />

            <Column
              title="Certification"
              dataIndex="certification"
              key="certification"
              align="center"
              render={(_, record) => (
                <Button
                  onClick={() => handleToggleVerified(record)}
                  style={{
                    background: record.certification === 0 ? "#52c41a" : "#f5222d",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  {record.certification === 0 ? "Activate" : "Deactivate"} 
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
                    background: record.status === 0 ? "#52c41a" : "#f5222d", 
                    color: "#fff",
                    border: "none",
                  }}
                >
                  {record.status === 0 ? "Activate" : "Deactivate"} 
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
        open={isModalVisible}
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