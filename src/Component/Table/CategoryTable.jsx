import { useEffect, useState } from "react";
import { Button, Space, Table, Input } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";

const { Column } = Table;

const CategoryTable = () => {
  const apiUrl = import.meta.env.VITE_API_URL; 
  const [categoryData, setCategoryData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");

  // Fetch category data
  const getCategoryData = async () => {
    try {
      const url = `${apiUrl}Category/GetAllCategory`;
      const response = await axios.get(url, {
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

  // Handle toggle status of category
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
        setCategoryData((prevData) =>
          prevData.map((item) =>
            item.Category_id === record.Category_id
              ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
              : item
          )
        );
        Swal.fire(
          "Updated!",
            `The category is now ${record.status === "Active" ? "Inactive" : "Active"}.`,
          "success"
        );
      }
    });
  };

  // Handle delete category
  const handleDelete = (record) => {
    console.log(record.category_id)
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        let response= axios.post(`${apiUrl}Category/DeleteProductCategory`,{Category_id:record.category_id}, {headers: {
          Authorization: `Bearer ${storedToken}`}})
          if(response){
            console.log(response)
          }
        // setCategoryData((prevData) => prevData.filter((item) => item.Category_id !== record.Category_id));
        // Swal.fire("Deleted!", "The category has been deleted.", "success");
      }
    });
  };

  // Filtered data based on search
  const filteredData = categoryData.filter((item) =>
    item.category_Name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Fetch data on mount
  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        {/* Category List Title */}
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Category List</h2>

        {/* Search Bar with Icon */}
        <Input
          placeholder="Search by category name"
          style={{
            width: "300px",
            paddingLeft: "30px",
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<MdSearch style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />}
        />
      </div>

      {/* Table */}
      <Table
        dataSource={filteredData}
        rowKey="category_id"  
        bordered={false}
        pagination={{ pageSize: 5 }}
        style={{
          border: "none",
        }}
      >
        <Column title="Id" dataIndex="category_id" key="category_id" align="center" />

        {/* <Column
          title="Category Image"
          dataIndex="image"
          key="image"
          align="center"
          render={(image) => (
            <img
              src={`${apiUrl}${image}`}
              alt="Category"
              style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px", marginLeft: "150px" }}
            />
          )}
        /> */}

<Column
            title="Category Image"
            dataIndex="image"
            key="image"
            align="center"
            render={(images) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
               src={`${apiUrl}${images}`}
                alt="Brand Logo"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  padding: "5px",
                  backgroundColor: "#fff",
                }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}
        />


        <Column title="Category" dataIndex="category_Name" key="category_Name" align="center" />

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
                onClick={() => alert(`Edit item with ID: ${record.Category_id}`)}
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



export default CategoryTable;
