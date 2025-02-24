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


const initialData = [
    {
      SL: "1",
      ShopName: "Siddhi Gruha Udhyog",
      SellerName: "Sanjeev kumar",
      SellerType: "Businesses",
      SellerPackage : "Free Registration",
      ContactInfo : "sanjeevkrpd11@gamil.com",
      Address : "Goregawn east mumbai",
      TotalProducts: "0",
      TotalOrders : "0",
    },
    {
        SL: "2",
        ShopName: "Siddhi Gruha Udhyog",
        SellerName: "Sanjeev kumar",
        SellerType: "Businesses",
        SellerPackage : "Free Registration",
        ContactInfo : "sanjeevkrpd11@gamil.com",
        Address : "Goregawn east mumbai",
        TotalProducts: "0",
        TotalOrders : "0",
    },
    {
        SL: "3",
        ShopName: "Siddhi Gruha Udhyog",
        SellerName: "Sanjeev kumar",
        SellerType: "Businesses",
        SellerPackage : "Free Registration",
        ContactInfo : "sanjeevkrpd11@gamil.com",
        Address : "Goregawn east mumbai",
        TotalProducts: "0",
        TotalOrders : "0",
    },
    {
        SL: "3",
        ShopName: "Siddhi Gruha Udhyog",
        SellerName: "Sanjeev kumar",
        SellerType: "Businesses",
        SellerPackage : "Free Registration",
        ContactInfo : "sanjeevkrpd11@gamil.com",
        Address : "Goregawn east mumbai",
        TotalProducts: "0",
        TotalOrders : "0",
    },
  ];
  


const SellerListTable = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");


  const handleEdit = async(record)=>{
    navigate("/EditSellerInfo", {
        state: {
          SellerPackage: record.SellerPackage,
          SellerType: record.SellerType,
          Address : record.Address,
        },
      });


  }

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



  const filteredData = data.filter((item) =>
    item.ShopName.toLowerCase().includes(searchText.toLowerCase())
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
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Seller List</h2>
        <Input
          placeholder="Search by Shop name"
          style={{ width: "300px", paddingLeft: "30px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<MdSearch />}
        />
      </div>

      <Table dataSource={filteredData} rowKey="SL" pagination={{ pageSize: 5 }}>
        <Column title="SL" dataIndex="SL" key="SL" align="center" />
        <Column
          title="Shop Name"
          dataIndex="ShopName"
          key="ShopName"
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
        <Column title="Seller Name" dataIndex="SellerName" key="SellerName" align="center" />
        <Column title="Seller Type" dataIndex="SellerType" key="SellerType" align="center" />
        <Column title="Seller Package" dataIndex="SellerPackage" key="SellerPackage" align="center" />
        <Column title="Contact Info" dataIndex="ContactInfo" key="ContactInfo" align="center" />
        <Column title="Total Products" dataIndex="TotalProducts" key="TotalProducts" align="center" />
        <Column title="Total Orders" dataIndex="TotalOrders" key="TotalOrders" align="center" />

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
              <Tooltip title="View">
                <Button icon={<FaEye />} type="primary" onClick={() => handleView(record)} />
              </Tooltip>
              <Tooltip title="Edit">
                <Button icon={<MdEdit />} type="primary"  onClick={() => handleEdit(record)}  />
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

export default SellerListTable