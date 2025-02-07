import React, { useState, useEffect } from "react";
import { Button, Space, Table, Input, Tooltip, Modal } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { IoBarcode } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import CardBox from "../../Component/Charts/CardBox";
const { Column } = Table;


const initialData = [
  {
    Id: "1",
    customerName: "Pumpkin",
    contactInfo: "464646464",
    contactEmail: "sanjeevkrpd11@gmail.com",
    message: "this is a message",
    priority : "high"
  },
  {
    Id: "2",
    customerName: "Banana",
    contactInfo: "464646464",
    contactEmail: "sanjeevkrpd11@gmail.com",
    message: "this is a message",
    priority : "low"
  },
  {
    Id: "3",
    customerName: "Pineapple",
    contactInfo: "464646464",
    contactEmail: "sanjeevkrpd11@gmail.com",
    message: "this is a message",
    priority : "high"
  },
];




const SupportTicket = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");

  useEffect(() => {
    // getInHouseProduct();
  }, []);

  // const getInHouseProduct = async () => {
  //   try {
  //     const res = await axios.post(
  //       `${apiUrl}EcommerceProduct/GetAllProducts`,
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${storedToken}` },
  //       }
  //     );

  //     if (res.data.Message === "SUCCESS") {
  //       // Remove duplicates by using a Set and converting it back to an array
  //       const uniqueProducts = Array.from(new Set(res.data.ProductList.map(p => p.Product_id)))
  //         .map(id => {
  //           return res.data.ProductList.find(p => p.Product_id === id);
  //         });
  //       setData(uniqueProducts);
  //     } else {
  //       await Swal.fire({
  //         title: "Error in Getting Product List",
  //         text: "Please try again.",
  //         icon: "error",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     await Swal.fire({
  //       title: "Error",
  //       text: "Failed to fetch the product list. Please try again later. " + error,
  //       icon: "error",
  //     });
  //   }
  // };



  const handleViewSupprot = (record) => {
    // navigate("/GenerateBarCode", {
    //   state: {
    //     productSku: record.Product_id,
    //     productPrice: record.Price,
    //   },
    // });
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

  const filteredData = initialData.filter((item) =>
    item.customerName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
  <CardBox>
        <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Support Ticket Section</h2>
        <Input
          placeholder="Search by product name"
          style={{ width: "300px", paddingLeft: "30px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<MdSearch />}
        />
      </div>

      <Table dataSource={filteredData} rowKey="Id" pagination={{ pageSize: 5 }}>
        <Column title="ID" dataIndex="Id" key="Id" align="center" />
        <Column title="Name" dataIndex="customerName" key="customerName" align="center" />
        <Column title="Mobile" dataIndex="contactInfo" key="contactInfo" align="center" />
        <Column title="Email" dataIndex="contactEmail" key="contactEmail" align="center" />
        <Column title="Message" dataIndex="message" key="message" align="center" />
        <Column
          title="Priority"
          dataIndex="priority"
          key="priority"
          align="center"
          render={(priority) => {
            let color = "";
            if (priority === "high") {
              color = "lightcoral";
            } else {
              color = "lightgreen";
            }
            return <span style={{ backgroundColor: color, padding: "5px 10px", borderRadius: "5px" }}>{priority}</span>;
          }}
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
  </CardBox>
  );
};


export default SupportTicket
