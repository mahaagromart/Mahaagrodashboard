// import { useEffect, useState } from "react";
// import { Button, Space, Table, Input } from "antd";
// import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import axios from "axios";

// const { Column } = Table;

// const CategoryTable = () => {
//   const apiUrl = import.meta.env.VITE_API_URL; 
//   const [categoryData, setCategoryData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const { token } = useSelector((state) => state.auth);
//   const storedToken = token || localStorage.getItem("token");

//   // Fetch category data
//   const getCategoryData = async () => {
//     try {
//       const url = `${apiUrl}Category/GetAllCategory`;
//       const response = await axios.post(url, {
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//         },
//       });

//       if (response.data.code === 200 && response.data.retval === "SUCCESS") {
//         setCategoryData(response.data.categoryList.$values);
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const updateCategory=async ()=>{
//     try{
//       const url=`${apiUrl}Category/UpdateProductCategory`
//       const response=await axios.put(url,{data:{},header:{Authorization:`Bearer${storedToken}`}});
//       if(response){}

//     }
//     catch(err){

//     }
    
//   }
  
//   const handleToggleStatus = (record) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You are about to ${
//         record.status === "Active" ? "deactivate" : "activate"
//       } this category.`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, do it!",
//       cancelButtonText: "No, cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setCategoryData((prevData) =>
//           prevData.map((item) =>
//             item.Category_id === record.Category_id
//               ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" }
//               : item
//           )
//         );
//         Swal.fire(
//           "Updated!",
//             `The category is now ${record.status === "Active" ? "Inactive" : "Active"}.`,
//           "success"
//         );
//       }
//     });
//   };

//   // Handle delete category
//   const handleDelete = (record) => {
//     console.log(record.category_id)
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will not be able to recover this category!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, cancel!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         let response= axios.post(`${apiUrl}Category/DeleteProductCategory`,{Category_id:record.category_id}, {headers: {
//           Authorization: `Bearer ${storedToken}`}})
//           if(response){
//             console.log(response)
//           }
//         // setCategoryData((prevData) => prevData.filter((item) => item.Category_id !== record.Category_id));
//         // Swal.fire("Deleted!", "The category has been deleted.", "success");
//       }
//     });
//   };

//   // Filtered data based on search
//   const filteredData = categoryData.filter((item) =>
//     item.category_Name.toLowerCase().includes(searchText.toLowerCase())
//   );

//   // Fetch data on mount
//   useEffect(() => {
//     getCategoryData();
//   }, []);

//   return (
//     <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
//         {/* Category List Title */}
//         <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Category List</h2>

//         {/* Search Bar with Icon */}
//         <Input
//           placeholder="Search by category name"
//           style={{
//             width: "300px",
//             paddingLeft: "30px",
//           }}
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           prefix={<MdSearch style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />}
//         />
//       </div>

//       {/* Table */}
//       <Table
//         dataSource={filteredData}
//         rowKey="category_id"  
//         bordered={false}
//         pagination={{ pageSize: 5 }}
//         style={{
//           border: "none",
//         }}
//       >
//         <Column title="Id" dataIndex="category_id" key="category_id" align="center" />

//         {/* <Column
//           title="Category Image"
//           dataIndex="image"
//           key="image"
//           align="center"
//           render={(image) => (
//             <img
//               src={`${apiUrl}${image}`}
//               alt="Category"
//               style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px", marginLeft: "150px" }}
//             />
//           )}
//         /> */}

// <Column
//             title="Category Image"
//             dataIndex="image"
//             key="image"
//             align="center"
//             render={(images) => (
//             <div style={{ display: "flex", justifyContent: "center" }}>
//               <img
//                src={`${apiUrl}${images}`}
//                 alt="Brand Logo"
//                 style={{
//                   width: "80px",
//                   height: "80px",
//                   objectFit: "contain",
//                   borderRadius: "10px",
//                   border: "1px solid #ddd",
//                   padding: "5px",
//                   backgroundColor: "#fff",
//                 }}
//                 onError={(e) => (e.target.style.display = "none")}
//               />
//             </div>
//           )}
//         />


//         <Column title="Category" dataIndex="category_Name" key="category_Name" align="center" />

//         <Column title="Priority" dataIndex="priority" key="priority" align="center" />

//         <Column
//           title="Status"
//           dataIndex="status"
//           key="status"
//           align="center"
//           render={(_, record) => (
//             <Button
//               onClick={() => handleToggleStatus(record)}
//               style={{
//                 background: record.status === "Active" ? "#52c41a" : "#f5222d",
//                 color: "#fff",
//                 border: "none",
//                 padding: "5px 10px",
//               }}
//             >
//               {record.status === "Active" ? "Deactivate" : "Activate"}
//             </Button>
//           )}
//         />

//         <Column
//           title="Action"
//           key="action"
//           align="center"
//           render={(_, record) => (
//             <Space size="middle">
//               <Button
//                 icon={<MdEdit />}
//                 type="primary"
//                 style={{ display: "flex", alignItems: "center" }}
//                 onClick={() => alert(`Edit item with ID: ${record.Category_id}`)}
//               />
//               <Button
//                 icon={<MdDelete />}
//                 type="primary"
//                 danger
//                 style={{ display: "flex", alignItems: "center" }}
//                 onClick={() => handleDelete(record)}
//               />
//             </Space>
//           )}
//         />
//       </Table>
//     </div>
//   );
// };



// export default CategoryTable;




// import { useEffect, useState } from "react";
// import { Button, Space, Table, Input, Modal, Form } from "antd";
// import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import axios from "axios";

// const { Column } = Table;

// const CategoryTable = () => {
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const [categoryData, setCategoryData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const { token } = useSelector((state) => state.auth);
//   const storedToken = token || localStorage.getItem("token");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [form] = Form.useForm();

//   // Fetch category data
//   const getCategoryData = async () => {
//     try {
//       const url = `${apiUrl}Category/GetAllCategory`;
//       const response = await axios.post(url, {
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//         },
//       });
//       if (response.data.code === 200 && response.data.retval === "SUCCESS") {
//         setCategoryData(response.data.categoryList.$values);
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   // Open edit modal
//   const handleEdit = async(record) => {
//     setSelectedCategory(record);
//     form.setFieldsValue(record);
//     setIsModalOpen(true);

  
//   };

//   // Update category
//   // const handleUpdate = async () => {
//   //    try {
//   //   const values = form.getFieldsValue();
//   //   const url = `${apiUrl}Category/UpdateProductCategory`;
//   //   const response = await axios.put(url, { ...values, category_id: selectedCategory.category_id }, {
//   //     headers: {
//   //       Authorization: `Bearer ${storedToken}`,
//   //     },
//   //   });
//   //   console.log(response)
//   //   if (response.data.code === 200) {
//   //     Swal.fire("Success", "Category updated successfully", "success");
//   //     setIsModalOpen(false);
//   //     getCategoryData();
//   //   }
//   // } catch (err) {
//   //   console.error("Update error:", err);
//   // }
//   // };
//   const handleUpdate = async () => {
//     try {
//       console.log("Updating category...");
  
//       // Validate form fields before submission
//       const values = await form.validateFields();
//       console.log("Form Values:", values);
  
//       const url = `${apiUrl}Category/UpdateProductCategory`;
//       const response = await axios.put(
//         url,
//         { ...values, category_id: selectedCategory.category_id },
//         {
//           headers: {
//             Authorization: `Bearer ${storedToken}`,
//           },
//         }
//       );
  
//       console.log("API Response:", response);
  
//       if (response.data.code === 200) {
//         console.log("Update successful, showing success alert...");
  
//         await Swal.fire({
//           title: "Success",
//           text: "Category updated successfully",
//           icon: "success",
//           confirmButtonText: "OK",
//         });
  
//         console.log("Closing modal...");
//         setIsModalOpen(false); // Close modal after success
//         getCategoryData(); // Refresh category data
//       } else {
//         console.error("Unexpected response:", response.data);
//       }
//     } catch (err) {
//       console.error("Update error:", err);
  
//       Swal.fire({
//         title: "Error",
//         text: "Failed to update category",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };
  
  
  


//   const handleDelete=()=>{

//   }

//   useEffect(() => {
//     getCategoryData();
//   }, []);

//   return (
//     <CategoryComponent
//       categoryData={categoryData}
//       searchText={searchText}
//       setSearchText={setSearchText}
//       handleEdit={handleEdit}
//       isModalOpen={isModalOpen}
//       form={form}
//       handleUpdate={handleUpdate}
//       setIsModalOpen={setIsModalOpen}
//     />
//   );
// };

// const CategoryComponent = ({
//   categoryData,
//   searchText,
//   setSearchText,
//   handleEdit,
//   isModalOpen,
//   form,
//   handleUpdate,
//   setIsModalOpen,
// }) => {
//   return (
//     <div style={{ padding: "20px" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//         <h2>Category List</h2>
//         <Input
//           placeholder="Search by category name"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           prefix={<MdSearch />}
//           style={{ width: "250px" }}
//         />

//       </div>
//       <Table dataSource={categoryData} rowKey="category_id">
//         <Column title="Id" dataIndex="category_id" key="category_id" />
//         <Column title="Category" dataIndex="category_Name" key="category_Name" />
//         <Column title="Priority" dataIndex="priority" key="priority" />
//         <Column
//           title="Action"
//           key="action"
//           render={(_, record) => (
//             <Space size="middle">
//               <Button icon={<MdEdit />} onClick={() => handleEdit(record)} />
//               <Button icon={<MdDelete />} danger onClick={() => handleDelete(record)} />

//             </Space>
//           )}
//         />
//       </Table>
//       <Modal title="Edit Category" open={isModalOpen} onOk={handleUpdate} onCancel={() => setIsModalOpen(false)}okText="Update">
//         <Form form={form} layout="vertical">
//           <Form.Item name="category_Name" label="Category Name" rules={[{ required: true, message: "Required" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="priority" label="Priority" rules={[{ required: true, message: "Required" }]}>
//             <Input type="number" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default CategoryTable;




// import { useEffect, useState } from "react";
// import { Button, Space, Table, Input, Modal, Form } from "antd";
// import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import axios from "axios";

// const { Column } = Table;

// const CategoryTable = () => {
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const [categoryData, setCategoryData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const { token } = useSelector((state) => state.auth);
//   const storedToken = token || localStorage.getItem("token");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [form] = Form.useForm();

//   // Fetch category data
//   const getCategoryData = async () => {
//     try {
//       const url = `${apiUrl}Category/GetAllCategory`;
//       const response = await axios.post(url, {}, {
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//         },
//       });
//       if (response.data.code === 200 && response.data.retval === "SUCCESS") {
//         setCategoryData(response.data.categoryList.$values);
//         console.log(response.data.categoryList.$values)
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   // Open edit modal
//   const handleEdit = (record) => {
//     setSelectedCategory(record);
//     form.setFieldsValue(record);
//     setIsModalOpen(true);
//   };

//   // Update category
//   const handleUpdate = async () => {
//     try {
//       const values = await form.validateFields();
//       const url = `${apiUrl}Category/UpdateProductCategory`;
//       const response = await axios.put(
//         url,
//         { ...values, category_id: selectedCategory.category_id },
//         {
//           headers: {
//             Authorization: `Bearer ${storedToken}`,
//           },
//         }
//       );
//       console.log(values)

//       if (response.data.message === "SUCCESS") {
//         await Swal.fire({
//           title: "Success",
//           text: "Category updated successfully",
//           icon: "success",
//           confirmButtonText: "OK",
//         });
//         setIsModalOpen(false);
//         getCategoryData();
//       } else {
//         Swal.fire({
//           title: "Error",
//           text: "Failed to update category",
//           icon: "error",
//           confirmButtonText: "OK",
//         });
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to update category",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   const handleDelete = async (record) => {
//     try {
//       const confirm = await Swal.fire({
//         title: "Are you sure?",
//         text: "You will not be able to recover this category!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel!",
//       });
  
//       if (confirm.isConfirmed) {
//         const url = `${apiUrl}Category/DeleteProductCategory`;
//         const response = await axios.delete(url, {
          
//             headers: {
//               Authorization: `Bearer ${storedToken}`,
//             },
          
//           data: { Category_id: record.category_id },
//         });

//         if (response.status === 200) {
//           Swal.fire("Deleted!", "The category has been deleted.", "success");
        
//         } else {
//           Swal.fire("Error", "Failed to delete category.", "error");
//         }
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       Swal.fire("Error", "Failed to delete category.", "error");
//     }
//   };
  

//   useEffect(() => {
//     getCategoryData();
//   }, []);

//   return (
//     <CategoryComponent
//       categoryData={categoryData}
//       searchText={searchText}
//       setSearchText={setSearchText}
//       handleEdit={handleEdit}
//       handleDelete={handleDelete}
//       isModalOpen={isModalOpen}
//       form={form}
//       handleUpdate={handleUpdate}
//       setIsModalOpen={setIsModalOpen}
//     />
//   );
// };

// const CategoryComponent = ({
//   categoryData,
//   searchText,
//   setSearchText,
//   handleEdit,
//   isModalOpen,
//   form,
//   handleDelete,
//   handleUpdate,
//   setIsModalOpen,
// }) => {
//   return (
//     <div style={{ padding: "20px" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//         <h2>Category List</h2>
//         <Input
//           placeholder="Search by category name"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           prefix={<MdSearch />}
//           style={{ width: "250px" }}
//         />
//       </div>
//       <Table dataSource={categoryData} rowKey="category_id"  pagination={{ pageSize: 5 }} >
//         <Column title="Id" dataIndex="category_id" key="category_id" />
//         <Column title="Category" dataIndex="category_Name" key="category_Name" />
//         <Column title="Priority" dataIndex="priority" key="priority" />
//         <Column
//           title="Action"
//           key="action"
//           render={(_, record) => (
//             <Space size="middle">
//               <Button icon={<MdEdit />} onClick={() => handleEdit(record)} />
//               <Button icon={<MdDelete />} danger onClick={() => handleDelete(record)} />
//             </Space>
//           )}
//         />
//       </Table>
//       <Modal
//         title="Edit Category"
//         open={isModalOpen}
//         onOk={handleUpdate}
//         onCancel={() => setIsModalOpen(false)}
//         okText="Update"
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="category_Name" label="Category Name" rules={[{ required: true, message: "Required" }]}>
//             <Input />
//           </Form.Item>
//           <Form.Item name="priority" label="Priority" rules={[{ required: true, message: "Required" }]}>
//             <Input type="number" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default CategoryTable;
"use client";
import { useEffect, useState } from "react";
import { Button, Space, Table, Input, Modal, Form, Switch, Upload } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

const { Column } = Table;

const CategoryTable = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [categoryData, setCategoryData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const { token } = useSelector((state) => state.auth);
    const storedToken = token || localStorage.getItem("token");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    // Fetch category data
    const getCategoryData = async () => {
        try {
            const url = `${apiUrl}Category/GetAllCategory`;
            const response = await axios.post(url, {}, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            if (response.data.message === "SUCCESS" && response.data.retval === "SUCCESS") {
                setCategoryData(response.data.categoryList.$values);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Open edit modal
    const handleEdit = (record) => {
        setSelectedCategory(record);
        form.setFieldsValue({
            category_Name: record.category_Name,
            priority: record.priority,
            status: record.status === "True",
        });
        if (record.image) {
            setFileList([
                {
                    uid: "-1",
                    name: "current-image",
                    status: "done",
                    url: `${apiUrl}${record.image}`,
                },
            ]);
        } else {
            setFileList([]);
        }
        setIsModalOpen(true);
    };

    // Update category
    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            let imagePath = selectedCategory.image || null;

            if (fileList.length === 0) {
                imagePath = null; // Explicitly remove image if fileList is cleared
            } else if (fileList.length > 0 && fileList[0].originFileObj) {
                const imageUrl = `${apiUrl}Category/UploadCategoryImage`;
                const imageFormData = new FormData();
                imageFormData.append("image", fileList[0].originFileObj);
                imageFormData.append("category_id", selectedCategory.category_id);

                const imageResponse = await axios.post(imageUrl, imageFormData, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                });

                if (imageResponse.data.message === "SUCCESS") {
                    imagePath = imageResponse.data.imagePath;
                    console.log("New image path:", imagePath);
                } else {
                    throw new Error("Image upload failed");
                }
            }

            const url = `${apiUrl}Category/UpdateProductCategory`;
            const payload = {
                category_id: selectedCategory.category_id,
                category_Name: values.category_Name,
                priority: values.priority,
                status: values.status ? "True" : "False",
                image: imagePath,
            };
            console.log("Sending payload:", payload);

            const response = await axios.put(url, payload, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.data.message === "SUCCESS") {
                await Swal.fire({
                    title: "Success",
                    text: "Category updated successfully",
                    icon: "success",
                    confirmButtonText: "OK",
                });
                setIsModalOpen(false);
                setFileList([]);
                getCategoryData();
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Failed to update category",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to update category: " + error.message,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    // Delete category
    const handleDelete = async (record) => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure?",
                text: "You will not be able to recover this category!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
            });

            if (confirm.isConfirmed) {
                const url = `${apiUrl}Category/DeleteProductCategory`;
                const response = await axios.delete(url, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                    data: { category_id: record.category_id },
                });

                if (response.data.message === "SUCCESS") {
                    Swal.fire("Deleted!", "The category has been deleted.", "success");
                    getCategoryData();
                } else {
                    Swal.fire("Error", "Failed to delete category.", "error");
                }
            }
        } catch (error) {
            console.error("Delete error:", error);
            Swal.fire("Error", "Failed to delete category.", "error");
        }
    };

    // Filtered data based on search
    const filteredData = categoryData.filter((item) =>
        item.category_Name.toLowerCase().includes(searchText.toLowerCase())
    );

    useEffect(() => {
        getCategoryData();
    }, []);

    return (
        <CategoryComponent
            categoryData={filteredData}
            searchText={searchText}
            setSearchText={setSearchText}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            isModalOpen={isModalOpen}
            form={form}
            handleUpdate={handleUpdate}
            setIsModalOpen={setIsModalOpen}
            fileList={fileList}
            setFileList={setFileList}
            apiUrl={apiUrl}
        />
    );
};

const CategoryComponent = ({
    categoryData,
    searchText,
    setSearchText,
    handleEdit,
    handleDelete,
    isModalOpen,
    form,
    handleUpdate,
    setIsModalOpen,
    fileList,
    setFileList,
    apiUrl,
}) => {
    const uploadProps = {
        onRemove: () => {
            setFileList([]);
        },
        beforeUpload: (file) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
                Swal.fire("Error", "Please upload an image file!", "error");
                return false;
            }
            setFileList([file]);
            return false; // Prevent automatic upload
        },
        fileList,
        maxCount: 1, // Allow only one image
    };

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <h2>Category List</h2>
                <Input
                    placeholder="Search by category name"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    prefix={<MdSearch />}
                    style={{ width: "250px" }}
                />
            </div>
            <Table dataSource={categoryData} rowKey="category_id" pagination={{ pageSize: 5 }}>
                <Column title="Id" dataIndex="category_id" key="category_id" align="center" />
                <Column title="Category" dataIndex="category_Name" key="category_Name" align="center" />
                <Column
                    title="Image"
                    dataIndex="image"
                    key="image"
                    align="center"
                    render={(image) => (
                        image ? (
                            <img
                                src={`${apiUrl}${image}`}
                                alt="Category"
                                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                            />
                        ) : (
                            "No Image"
                        )
                    )}
                />
                <Column title="Priority" dataIndex="priority" key="priority" align="center" />
                <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    align="center"
                    render={(status) => (status === "True" ? "Active" : "Inactive")}
                />
                <Column
                    title="Action"
                    key="action"
                    align="center"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button icon={<MdEdit />} onClick={() => handleEdit(record)} />
                            <Button icon={<MdDelete />} danger onClick={() => handleDelete(record)} />
                        </Space>
                    )}
                />
            </Table>
            <Modal
                title="Edit Category"
                open={isModalOpen}
                onOk={handleUpdate}
                onCancel={() => {
                    setIsModalOpen(false);
                    setFileList([]);
                }}
                okText="Update"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="category_Name"
                        label="Category Name"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="priority"
                        label="Priority"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        valuePropName="checked"
                    >
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
                    </Form.Item>
                    <Form.Item label="Category Image" name="image">
                        {fileList.length === 0 && (
                            <p style={{ color: "#888", marginBottom: "8px" }}>No image currently set</p>
                        )}
                        <Upload {...uploadProps} listType="picture">
                            <Button icon={<UploadOutlined />}>Upload New Image</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoryTable;