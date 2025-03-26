import React, { useState, useEffect } from "react";
import { Button, Space, Table, Input, Tooltip, Modal , Rate } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { IoBarcode } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { 
  IdcardOutlined, 
  TagOutlined, 
  FileTextOutlined, 
  DollarOutlined, 
  ShoppingCartOutlined, 
  StarOutlined, 
  SafetyCertificateOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  BarcodeOutlined, 
  BoxPlotOutlined, 
  GiftOutlined, 
  GoldOutlined, 
  PercentageOutlined, 
  ContainerOutlined 
} from "@ant-design/icons";
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
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  useEffect(() => {
    getInHouseProduct();
    getCategoryData();
    getSubCategory();

  }, []);


  const getCategoryData = async () => {
    try {
      const url = `${apiUrl}Category/GetAllCategory`;
      const response = await axios.post(url, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.data.code === 200 && response.data.retval === "SUCCESS") {
        setCategoryData(response.data.categoryList.$values);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const getSubCategory = async () => {
    try {
      const res = await axios.get(`${apiUrl}SubCategory/GetAllSubCategory`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });
      if (res.data[0].message === "SUCCESS") {
        setSubCategoryData(res.data[0].dataset.$values)
      } else {
        Swal.fire({
          title: "Error!",
          text: "Error fetching Sub-category List.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      console.error("Error fetching sub-categories:", error);
  
      Swal.fire({
        title: "Failed!",
        text: `Failed to fetch Sub-category List: ${error.message}`,
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };
  


  const handleEdit =async(record)=>{

    navigate("/UpdateProduct", {
      state: {
       record : record
      },
    });
  }



  const getCategoryName = (categoryId, categoryData) => {
    const category = categoryData.find(cat => cat.category_id === Number(categoryId));
    return category ? category.category_Name : "Unknown Category";
  };


  const getSubCategoryName = (subCategoryId, subCategoryList) => {
    const subCategory = subCategoryList.find(sub => sub.id === Number(subCategoryId));
    return subCategory ? subCategory.subcategory_Name : "Unknown Subcategory";
  };
  

  const getInHouseProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}Product/GetAllProducts`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      });
      
      console.log(res.data.dataset?.$values)

      if (res.data.message === "SUCCESS") {
        const products = res.data.dataset?.$values.flatMap(product => 
            product.variants.$values.map(variant => ({
            Product_id: variant.varientS_ID,
            proD_Id : product.proD_ID,
            product_Name: product.product_Name,
            product_Description: product.product_Description,
            varient_Name: variant.varient_Name,  
            sku: variant.sku,                    
            hsn: variant.hsn || "N/A",           
            calculateD_PRICE: variant.pricing.calculateD_PRICE ,
            sellinG_PRICE: variant.pricing.sellinG_PRICE, 
            discounT_TYPE : variant.pricing.discounT_TYPE,
            discounT_AMOUNT : variant.pricing.discounT_AMOUNT,
            taX_AMOUNT : variant.pricing.taX_AMOUNT,
            taX_CALCULATION : variant.pricing.taX_CALCULATION,
            maximuM_RETAIL_PRICE : variant.pricing.maximuM_RETAIL_PRICE,
            currenT_STOCK_QUANTITY: variant.pricing.currenT_STOCK_QUANTITY,
            packagE_DIAMETER : variant.logistics.packagE_DIAMETER,
            minimuM_ORDER_QUANTITY : variant.pricing.minimuM_ORDER_QUANTITY,
            packagE_HEIGHT : variant.logistics.packagE_HEIGHT,
            packagE_LENGTH :variant.logistics.packagE_LENGTH,
            packagE_SHAPE : variant.logistics.packagE_SHAPE,
            packagE_TOTAL_VOLUME : variant.logistics.packagE_TOTAL_VOLUME,
            packagE_WEIGHT : variant.logistics.packagE_WEIGHT,
            packagE_WIDTH : variant.logistics.packagE_WIDTH,
            certification: variant.certification,
            status: variant.status,            
            rating: variant.rating || 0,      
            tags: product.tagS_INPUT || [],
            thumbnailImages : variant.imageGallery?.$values?.map(img => img.product_Images) || [product.thumbnailImage],
            categorY_ID: product.categorY_ID,
            suB_CATEGORY_ID: product.suB_CATEGORY_ID,
            unit : product.unit,
          }))
        ) || [];


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
            `${apiUrl}Product/ProductToggleStatus`,
            { varienT_ID: record.Product_id },
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );

          if (res.data.message === "SUCCESS") {
            Swal.fire({
              title: "Status Updated",
              text: "Product status updated successfully",
              icon: "success",
            });
            getInHouseProduct();
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

  const handleToggleCertification = async (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to ${
        record.certification === "True" ? "Deactivate" : "Activate"
      } certification for this product.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, do it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post(
            `${apiUrl}Product/ProductToggleCertificate`,
            { varienT_ID: record.Product_id },
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );

          if (res.data.message === "SUCCESS") {
            Swal.fire({
              title: "Certification Status Updated",
              text: "Certification status updated successfully",
              icon: "success",
            });
            getInHouseProduct();
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
        productSku: record.sku,
        productPrice: record.calculateD_PRICE,
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

      <Table dataSource={filteredData} rowKey="Product_id" pagination={{ pageSize: 10 }}>
  <Column title="ID" dataIndex="Product_id" key="Product_id" align="center" />

  <Column
  title="Product Image"
  dataIndex="thumbnailImages"
  key="thumbnailImages"
  align="center"
  render={(images) => (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={`${apiUrl}${images?.[0] || "default-image.jpg"}`} 
        alt="Product"
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
  <Column title="Variant Name" dataIndex="varient_Name" key="varient_Name" align="center" />
  <Column title="SKU" dataIndex="sku" key="sku" align="center" />
  <Column title="HSN" dataIndex="hsn" key="hsn" align="center" />
  <Column title="Price" dataIndex="calculateD_PRICE" key="calculateD_PRICE" align="center" />
  <Column title="Quantity" dataIndex="currenT_STOCK_QUANTITY" key="currenT_STOCK_QUANTITY" align="center" />

  <Column
    title="Rating"
    dataIndex="rating"
    key="rating"
    align="center"
    width={180}
    render={(rating) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Rate allowHalf value={Number(rating)} disabled />
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
      onClick={() => handleToggleCertification(record)}
      style={{
        background: record.certification === "True" ? "#52c41a" : "#f5222d",
        color: "#fff",
        border: "none",
      }}
      
    >
      {record.certification === "True" ? "Deactivate" : "Activate"}
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
              background: record.status === "True" ? "#52c41a" : "#f5222d",
              color: "#fff",
              border: "none",
            }}
          >
            {record.status === "True" ? "Deactivate" : "Activate"}
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
          <Button icon={<IoBarcode />} type="primary" onClick={() => handleGenerateCode(record)} />
        </Tooltip>
        <Tooltip title="View">
          <Button icon={<FaEye />} type="primary" onClick={() => handleView(record)} />
        </Tooltip>
        <Tooltip title="Edit">
          <Button icon={<MdEdit />} type="primary" onClick={() => handleEdit(record)}  />
        </Tooltip>
        <Tooltip title="Delete">
          <Button icon={<MdDelete />} type="primary" danger onClick={() => handleDelete(record)} />
        </Tooltip>
      </Space>
    )}
  />
</Table>


      <Modal
      title="🛍️ Product Details"
      open={isModalVisible}
      onCancel={handleModalClose}
      footer={[
        <Button key="close" type="primary" onClick={handleModalClose}>
          Close
        </Button>,
      ]}

    >
      {selectedProduct && (
        <div style={{ lineHeight: "1.8", fontSize: "16px" }}>
          <p style={{margin: "5px 0px"}}><IdcardOutlined /> <strong>ID:</strong> {selectedProduct.Product_id}</p>
          <p style={{margin: "5px 0px"}}><BarcodeOutlined /> <strong>Product ID:</strong> {selectedProduct.proD_Id}</p>
          <p style={{margin: "5px 0px"}}><TagOutlined /> <strong>Product Name:</strong> {selectedProduct.product_Name}</p>
          <p style={{margin: "5px 0px"}}><TagOutlined /> <strong>Varient Name:</strong> {selectedProduct.varient_Name}</p>
          <p style={{margin: "5px 0px"}}><GiftOutlined /> <strong>Category:</strong>   {getCategoryName(selectedProduct.categorY_ID, categoryData)}</p>
          <p style={{margin: "5px 0px"}}><GoldOutlined /> <strong>Subcategory:</strong> {getSubCategoryName(selectedProduct.suB_CATEGORY_ID, subCategoryData)}</p>
          <p style={{margin: "5px 0px"}}><ShoppingCartOutlined /> <strong>Stock Quantity:</strong> {selectedProduct.currenT_STOCK_QUANTITY}</p>
          <p style={{margin: "5px 0px"}}><ShoppingCartOutlined /> <strong>MRP</strong> {selectedProduct.maximuM_RETAIL_PRICE}</p>
          <p style={{ margin: "5px 0px" }}><ShoppingCartOutlined /> <strong>Discount:</strong> {selectedProduct.discounT_TYPE === "Flat" ? `-${selectedProduct.discounT_AMOUNT}` : `-${selectedProduct.discounT_AMOUNT}%`}</p>
          <p style={{margin: "5px 0px"}}><StarOutlined style={{ color: "#fadb14" }} /> <strong>Rating:</strong> {selectedProduct.rating} ⭐</p>
          <p style={{margin: "5px 0px"}}><PercentageOutlined /> <strong>Discount:</strong> {selectedProduct.discounT_TYPE} - ₹{selectedProduct.discounT_AMOUNT}</p>
          <p style={{margin: "5px 0px"}}><ContainerOutlined /> <strong>Packaging Weight:</strong> {selectedProduct.packagE_WEIGHT}g, {selectedProduct.packagE_SHAPE}</p>
          <p style={{margin: "5px 0px"}}><BoxPlotOutlined /> <strong>Dimensions:</strong> {selectedProduct.packagE_LENGTH}x{selectedProduct.packagE_WIDTH}x{selectedProduct.packagE_HEIGHT} cm</p>
          <p style={{margin: "5px 0px"}}><DollarOutlined /> <strong>Tax Amount:</strong> ₹{selectedProduct.taX_AMOUNT} ({selectedProduct.taX_CALCULATION})</p>
          <p style={{margin: "5px 0px"}}><DollarOutlined /> <strong>Final Price:</strong> ₹{selectedProduct.calculateD_PRICE}</p>
          <p>
            <SafetyCertificateOutlined style={{ color: selectedProduct.certification === "True" ? "green" : "red" }} />
            <strong> Certification:</strong> {selectedProduct.certification === "True" ? "Certified" : "Uncertified"}
          </p>

          <p>
            {selectedProduct.status === "True" ? (
              <CheckCircleOutlined style={{ color: "green" }} />
            ) : (
              <CloseCircleOutlined style={{ color: "red" }} />
            )}
            <strong> Status:</strong> {selectedProduct.status === "True" ? "Activated" : "Deactivated"}
          </p>

        </div>
      )}
    </Modal>
    </div>
  );
};

export default ProductListTable;