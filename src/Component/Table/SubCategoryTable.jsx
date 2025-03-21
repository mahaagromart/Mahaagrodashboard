// // import React, { useState, useEffect } from "react";
// // import { Button, Space, Table, Input } from "antd";
// // import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
// // import axios from "axios";
// // import { useSelector, useDispatch } from "react-redux";
// // import { startLoading, stopLoading } from "../../redux/Features/LoadingSlice";
// // import {
// //   Modal,
// //   ModalOverlay,
// //   ModalContent,
// //   ModalHeader,
// //   ModalFooter,
// //   ModalBody,
// //   ModalCloseButton,
// //   Button as ChakraButton,
// //   Input as ChakraInput,
// //   Select,
// //   FormControl,
// //   FormLabel,
// //   FormErrorMessage,
// // } from "@chakra-ui/react";
// // import Swal from "sweetalert2";
// // import * as Yup from "yup";
// // import { Formik, Form, Field } from "formik";
// // import { CloudFilled } from "@ant-design/icons";

// // const { Column } = Table;
// // const apiUrl = import.meta.env.VITE_API_URL;

// // const SubCategoryTable = ({ categoryList }) => {
// //   console.log(categoryList)
// //   const { token } = useSelector((state) => state.auth);
// //   const dispatch = useDispatch();
// //   const storedToken = token || localStorage.getItem("token");

// //   const [subCategoryData, setSubCategoryData] = useState([]);
// //   const [searchText, setSearchText] = useState("");
// //   const [isEditOpen, setIsEditOpen] = useState(false);
// //   const [editData, setEditData] = useState(null);


// //   const validationSchema = Yup.object({
// //     subcategoryName: Yup.string().required("Subcategory Name is required"),
// //     priority: Yup.number().required("Priority is required").min(0, "Priority must be 0 or greater"),
// //     categoryId: Yup.string().required("Category must be selected"),
// //   });

// //   const getSubCategory = async () => {
// //     try {
// //       const res = await axios.get(`${apiUrl}SubCategory/GetAllSubCategory`, {
// //         headers: {
// //           Authorization: `Bearer ${storedToken}`,
// //           "Content-Type": "application/json",
// //         },
// //       });
// //       if (res.data[0].message === "SUCCESS") {
// //         setSubCategoryData(res.data[0].dataset.$values)
// //       } else {
// //         Swal.fire({
// //           title: "Error!",
// //           text: "Error fetching Sub-category List.",
// //           icon: "error",
// //           confirmButtonText: "Try Again",
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Error fetching sub-categories:", error);
  
// //       Swal.fire({
// //         title: "Failed!",
// //         text: `Failed to fetch Sub-category List: ${error.message}`,
// //         icon: "error",
// //         confirmButtonText: "Close",
// //       });
// //     }
// //   };
  

  
  

// //   const handleEdit = (subcategory) => {

// //     setEditData(subcategory);
// //     setIsEditOpen(true);
// //   };

// //   const handleSubmit = async (values) => {

  
// //     try {

// //       const selectCategory = categoryList.find((category) => String(category.Category_id) === String(values.categoryId));  
// //       dispatch(startLoading());
  
 
// //       const res = await axios.post(
// //         `${apiUrl}EcommerceSubcategory/UpdateSubCategory?id=${values.id}&Category_Name=${selectCategory.Category_Name}&Subcategory_Name=${values.subcategoryName}&Priority=${values.priority}&category_id=${values.categoryId}`,
// //         {},
// //         { headers: { Authorization: `Bearer ${storedToken}` } }
// //       );
  
// //       dispatch(stopLoading());
  
// //       if (res.data.Message.toLowerCase() === "success") {
// //         await getSubCategory();
// //         await Swal.fire({
// //           title: "Success",
// //           text: "Subcategory updated successfully!",
// //           icon: "success",
// //         });
// //         setIsEditOpen(false);
// //         getSubCategory();
// //       } else {
// //         await Swal.fire({
// //           title: "Update Failed",
// //           text: "Failed to update subcategory.",
// //           icon: "error",
// //         });
// //       }
// //     } catch (error) {
// //       await Swal.fire({
// //         title: "Error",
// //         text: "Error updating subcategory. Please try again."+error,
// //         icon: "error",
// //       });
// //       dispatch(stopLoading());
// //     }
// //   };
  


// //   // Handle delete
// //   const handleDelete = async (record) => {
// //     Swal.fire({
// //       title: "Are you sure?",
// //       text: "You won't be able to recover this!",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonColor: "#d33",
// //       cancelButtonColor: "#3085d6",
// //       confirmButtonText: "Yes, delete it!",
// //       cancelButtonText: "Cancel",
// //     }).then(async (result) => {
// //       if (result.isConfirmed) {
// //         try {
// //           dispatch(startLoading());
  
// //           const deleteResponse = await axios.delete(
// //             `${apiUrl}SubCategory/DeleteSubCategory`,
// //             {
// //               headers: { Authorization: `Bearer ${storedToken}`, 'Content-Type': 'application/json' },
// //               data: {id: record.id },
// //             }
// //           );
  
// //           dispatch(stopLoading());
// //           console.log(deleteResponse)
  
// //           if (deleteResponse.status==200) {
     
// //             Swal.fire("Deleted!", "Record has been deleted.", "success");
// //           } else {
// //             Swal.fire("Error", "Failed to delete the record.", "error");
// //           }
// //         } catch (error) {
// //           dispatch(stopLoading());
// //           Swal.fire("Error", "Failed to delete the record. Please try again later.", "error");
// //         }
// //       }
// //     });
// //   };

// //   useEffect(() => {
// //     getSubCategory();
   
// //   }, []);

// //   const filteredData =
// //     subCategoryData.filter((item) =>
// //       item.subcategory_Name.toLowerCase().includes(searchText.toLowerCase())
// //     ) || [];

// //   return (
// //     <div>
// //       <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
// //         <div
// //           style={{
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "space-between",
// //             marginBottom: "20px",
// //           }}
// //         >
// //           <h2 style={{ fontWeight: "600", marginBottom: "0" }}>
// //             Sub Category List
// //           </h2>
// //           <Input
// //             placeholder="Search by sub category name"
// //             style={{ width: "300px" }}
// //             value={searchText}
// //             onChange={(e) => setSearchText(e.target.value)}
// //             prefix={<MdSearch />}
// //           />
// //         </div>
// //       </div>

// //       <Table
// //         dataSource={filteredData}
// //         columns={[
// //           { title: "ID", dataIndex: "id", key: "id", align: "center" },
// //           {
// //             title: "Category Name",
// //             dataIndex: "category_Name",
// //             key: "category_Name",
// //             align: "center",
// //           },
// //           {
// //             title: "Sub-Category Name",
// //             dataIndex: "subcategory_Name",
// //             key: "subcategory_Name",
// //             align: "center",
// //           },
// //           {
// //             title: "Priority",
// //             dataIndex: "priority",
// //             key: "priority",
// //             align: "center",
// //           },
// //           {
// //             title: "Action",
// //             key: "action",
// //             render: (_, record) => (
// //               <Space size="middle">
// //                 <Button type="primary" onClick={() => handleEdit(record)}>
// //                   <MdEdit />
// //                 </Button>
// //                 <Button
// //                   type="primary"
// //                   danger
// //                   onClick={() => handleDelete(record)}
// //                 >
// //                   <MdDelete />
// //                 </Button>
// //               </Space>
// //             ),
// //             align: "center",
// //           },
// //         ]}
// //         rowKey="id"
// //         pagination={{ pageSize: 5 }}
// //       />

// //       {/* Edit Modal */}
// //       <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} isCentered>
// //   <ModalOverlay />
// //   <ModalContent>
// //     <ModalHeader>Edit Sub-Category</ModalHeader>
// //     <ModalCloseButton />
// //     <ModalBody>
// //       <Formik
// //         initialValues={{
// //           id: editData ? editData.id : "",
// //           subcategoryName: editData ? editData.Subcategory_Name : "",
// //           priority: editData ? editData.Priority : "",
// //           categoryId: editData ? editData.Category_id : "",
// //         }}
// //         validationSchema={validationSchema}
// //         onSubmit={handleSubmit}
// //       >
// //         {({ errors, touched, values, setFieldValue }) => (
// //           <Form>
// //             <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
// //               {/* Sub-category Name Field */}
// //               <FormControl isInvalid={touched.subcategoryName && errors.subcategoryName}>
// //                 <FormLabel htmlFor="subcategoryName">Sub-Category Name</FormLabel>
// //                 <Field
// //                   as={ChakraInput}
// //                   id="subcategoryName"
// //                   name="subcategoryName"
// //                   placeholder="Enter Sub-category Name"
// //                 />
// //                 <FormErrorMessage>{errors.subcategoryName}</FormErrorMessage>
// //               </FormControl>

// //               {/* Priority Field */}
// //               <FormControl isInvalid={touched.priority && errors.priority}>
// //                 <FormLabel htmlFor="priority">Priority</FormLabel>
// //                 <Field as={Select} id="priority" name="priority" placeholder="Select Priority">
// //                   {[...Array(10).keys()].map((i) => (
// //                     <option key={i} value={i}>
// //                       {i}
// //                     </option>
// //                   ))}
// //                 </Field>
// //                 <FormErrorMessage>{errors.priority}</FormErrorMessage>
// //               </FormControl>

// //               {/* Category Field */}
// //               <FormControl isInvalid={touched.categoryId && errors.categoryId}>
// //                 <FormLabel htmlFor="categoryId">Please Select Category</FormLabel>
// //                 <Field
// //                   as={Select}
// //                   id="categoryId"
// //                   name="categoryId"
// //                   placeholder="Select Category"
// //                 >
// //                   <option value="" disabled>
// //                     Select Category
// //                   </option>
// //                   {categoryList.map((category) => (
// //                     <option key={category.Category_id} value={category.Category_id}>
// //                       {category.category_Name}
// //                     </option>
// //                   ))}
// //                 </Field>
// //                 <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
// //               </FormControl>
// //             </div>

// //             {/* Modal Footer */}
// //             <ModalFooter>
// //               <ChakraButton colorScheme="blue" mr={3} type="submit">
// //                 Update
// //               </ChakraButton>
// //               <ChakraButton variant="ghost" onClick={() => setIsEditOpen(false)}>
// //                 Cancel
// //               </ChakraButton>
// //             </ModalFooter>
// //           </Form>
// //         )}
// //       </Formik>
// //     </ModalBody>
// //   </ModalContent>
// // </Modal>

// //     </div>
// //   );
// // };

// // export default SubCategoryTable;


// // import React, { useState, useEffect } from "react";
// // import { Button, Space, Table, Input } from "antd";
// // import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
// // import axios from "axios";
// // import { useSelector, useDispatch } from "react-redux";
// // import { startLoading, stopLoading } from "../../redux/Features/LoadingSlice";
// // import {
// //   Modal,
// //   ModalOverlay,
// //   ModalContent,
// //   ModalHeader,
// //   ModalFooter,
// //   ModalBody,
// //   ModalCloseButton,
// //   Button as ChakraButton,
// //   Input as ChakraInput,
// //   Select,
// //   FormControl,
// //   FormLabel,
// //   FormErrorMessage,
// // } from "@chakra-ui/react";
// // import Swal from "sweetalert2";
// // import * as Yup from "yup";
// // import { Formik, Form, Field } from "formik";
// // import { data } from "react-router-dom";

// // const { Column } = Table;
// // const apiUrl = import.meta.env.VITE_API_URL;

// // const SubCategoryTable = ({ categoryList }) => {
// //   const { token } = useSelector((state) => state.auth);
// //   const dispatch = useDispatch();
// //   const storedToken = token || localStorage.getItem("token");

// //   const [subCategoryData, setSubCategoryData] = useState([]);
// //   const [searchText, setSearchText] = useState("");
// //   const [isEditOpen, setIsEditOpen] = useState(false);
// //   const [editData, setEditData] = useState(null);

// //   const validationSchema = Yup.object({
// //     subcategoryName: Yup.string().required("Subcategory Name is required"),
// //     priority: Yup.number().required("Priority is required").min(0, "Priority must be 0 or greater"),
// //     categoryId: Yup.string().required("Category must be selected"),
// //   });

// //   const getSubCategory = async () => {
// //     try {
// //       const res = await axios.get(`${apiUrl}SubCategory/GetAllSubCategory`, {
// //         headers: {
// //           Authorization: `Bearer ${storedToken}`,
// //           "Content-Type": "application/json",
// //         },
// //       });
// //       if (res.data[0].message === "SUCCESS") {
// //         setSubCategoryData(res.data[0].dataset.$values);
// //       } else {
// //         Swal.fire({
// //           title: "Error!",
// //           text: "Error fetching Sub-category List.",
// //           icon: "error",
// //           confirmButtonText: "Try Again",
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Error fetching sub-categories:", error);
// //       Swal.fire({
// //         title: "Failed!",
// //         text: `Failed to fetch Sub-category List: ${error.message}`,
// //         icon: "error",
// //         confirmButtonText: "Close",
// //       });
// //     }
// //   };

// //   const handleEdit = (subcategory) => {
// //     setEditData(subcategory);
// //     setIsEditOpen(true);
// //   };

// //   const handleUpdate = async (values) => {
// //     try {
// //       const selectCategory = categoryList.find((category) => String(category.Category_id) === String(values.categoryId));
// //       dispatch(startLoading());

// //       const res = await axios.post(
// //         `${apiUrl}Subcategory/UpdateSubCategory`,
// //         {data:{id:values.id,Category_Name:selectCategory.category_Name,Subcategory_Name:values.subcategoryName,Priority:values.priority}},
// //         { headers: { Authorization: `Bearer ${storedToken}` } }
// //       );

// //       dispatch(stopLoading());

// //       if (res.data.Message.toLowerCase() === "success") {
// //         await getSubCategory();
// //         await Swal.fire({
// //           title: "Success",
// //           text: "Subcategory updated successfully!",
// //           icon: "success",
// //         });
// //         setIsEditOpen(false);
// //       } else {
// //         await Swal.fire({
// //           title: "Update Failed",
// //           text: "Failed to update subcategory.",
// //           icon: "error",
// //         });
// //       }
// //     } catch (error) {
// //       await Swal.fire({
// //         title: "Error",
// //         text: "Error updating subcategory. Please try again." + error,
// //         icon: "error",
// //       });
// //       dispatch(stopLoading());
// //     }
// //   };

// //   const handleDelete = async (record) => {
// //     Swal.fire({
// //       title: "Are you sure?",
// //       text: "You won't be able to recover this!",
// //       icon: "warning",
// //       showCancelButton: true,
// //       confirmButtonColor: "#d33",
// //       cancelButtonColor: "#3085d6",
// //       confirmButtonText: "Yes, delete it!",
// //       cancelButtonText: "Cancel",
// //     }).then(async (result) => {
// //       if (result.isConfirmed) {
// //         try {
// //           dispatch(startLoading());

// //           const deleteResponse = await axios.delete(
// //             `${apiUrl}SubCategory/DeleteSubCategory`,
// //             {
// //               headers: { Authorization: `Bearer ${storedToken}`, 'Content-Type': 'application/json' },
// //               data: { id: record.$id }, // Use $id for deletion
// //             }
// //           );

// //           dispatch(stopLoading());

// //           if (deleteResponse.status === 200) {
// //             await Swal.fire("Deleted!", "Record has been deleted.", "success");
// //             getSubCategory(); // Refresh the list after deletion
// //           } else {
// //             await Swal.fire("Error", "Failed to delete the record.", "error");
// //           }
// //         } catch (error) {
// //           dispatch(stopLoading());
// //           await Swal.fire("Error", "Failed to delete the record. Please try again later.", "error");
// //         }
// //       }
// //     });
// //   };

// //   useEffect(() => {
// //     getSubCategory();
// //   }, []);

// //   const filteredData = subCategoryData.filter((item) =>
// //     item.category_Name.toLowerCase().includes(searchText.toLowerCase())
// //   ) || [];

// //   return (
// //     <div>
// //       <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
// //         <div
// //           style={{
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "space-between",
// //             marginBottom: "20px",
// //           }}
// //         >
// //           <h2 style={{ fontWeight: "600", marginBottom: "0" }}>
// //             Sub Category List
// //           </h2>
// //           <Input
// //             placeholder="Search by sub category name"
// //             style={{ width: "300px" }}
// //             value={searchText}
// //             onChange={(e) => setSearchText(e.target.value)}
// //             prefix={<MdSearch />}
// //           />
// //         </div>
// //       </div>

// //       <Table
// //         dataSource={filteredData}
// //         columns={[
// //           { title: "ID", dataIndex: "$id", key: "$id", align: "center" },
// //           {
// //             title: "Category Name",
// //             dataIndex: "category_Name",
// //             key: "category_Name",
// //             align: "center",
// //           },
// //           {
// //             title: "Sub-Category Name",
// //             dataIndex: "subcategory_Name",
// //             key: "subcategory_Name",
// //             align: "center",
// //           },
// //           {
// //             title: "Priority",
// //             dataIndex: "priority",
// //             key: "priority",
// //             align: "center",
// //           },
// //           {
// //             title: "Action",
// //             key: "action",
// //             render: (_, record) => (
// //               <Space size="middle">
// //                 <Button type="primary" onClick={() => handleEdit(record)}>
// //                   <MdEdit />
// //                 </Button>
// //                 <Button
// //                   type="primary"
// //                   danger
// //                   onClick={() => handleDelete(record)}
// //                 >
// //                   <MdDelete />
// //                 </Button>
// //               </Space>
// //             ),
// //             align: "center",
// //           },
// //         ]}
// //         rowKey="$id"
// //         pagination={{ pageSize: 5 }}
// //       />

// //       {/* Edit Modal */}
// //       <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} isCentered>
// //         <ModalOverlay />
// //         <ModalContent>
// //           <ModalHeader>Edit Sub-Category</ModalHeader>
// //           <ModalCloseButton />
// //           <ModalBody>
// //             <Formik
// //               initialValues={{
// //                 id: editData ? editData.$id : "", // Use $id from your object
// //                 subcategoryName: editData ? editData.category_Name : "", // Use category_Name
// //                 priority: editData ? editData.priority : "", // Use priority
// //                 categoryId: editData ? editData.category_id : "", // Use category_id
// //               }}
// //               validationSchema={validationSchema}
// //               onSubmit={handleUpdate}
// //             >
// //               {({ errors, touched }) => (
// //                 <Form>
// //                   <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
// //                     {/* Sub-category Name Field */}
// //                     <FormControl isInvalid={touched.subcategoryName && errors.subcategoryName}>
// //                       <FormLabel htmlFor="subcategoryName">Sub-Category Name</FormLabel>
// //                       <Field
// //                         as={ChakraInput}
// //                         id="subcategoryName"
// //                         name="subcategoryName"
// //                         placeholder="Enter Sub-category Name"
// //                       />
// //                       <FormErrorMessage>{errors.subcategoryName}</FormErrorMessage>
// //                     </FormControl>

// //                     {/* Priority Field */}
// //                     <FormControl isInvalid={touched.priority && errors.priority}>
// //                       <FormLabel htmlFor="priority">Priority</FormLabel>
// //                       <Field as={Select} id="priority" name="priority" placeholder="Select Priority">
// //                         {[...Array(10).keys()].map((i) => (
// //                           <option key={i} value={i}>
// //                             {i}
// //                           </option>
// //                         ))}
// //                       </Field>
// //                       <FormErrorMessage>{errors.priority}</FormErrorMessage>
// //                     </FormControl>

// //                     {/* Category Field */}
// //                     <FormControl isInvalid={touched.categoryId && errors.categoryId}>
// //                       <FormLabel htmlFor="categoryId">Please Select Category</FormLabel>
// //                       <Field
// //                         as={Select}
// //                         id="categoryId"
// //                         name="categoryId"
// //                         placeholder="Select Category"
// //                       >
// //                         <option value="" disabled>
// //                           Select Category
// //                         </option>
// //                         {categoryList.map((category) => (
// //                           <option key={category.Category_id} value={category.Category_id}>
// //                             {category.category_Name}
// //                           </option>
// //                         ))}
// //                       </Field>
// //                       <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
// //                     </FormControl>
// //                   </div>

// //                   {/* Modal Footer */}
// //                   <ModalFooter>
// //                     <ChakraButton colorScheme="blue" mr={3} type="submit">
// //                       Update
// //                     </ChakraButton>
// //                     <ChakraButton variant="ghost" onClick={() => setIsEditOpen(false)}>
// //                       Cancel
// //                     </ChakraButton>
// //                   </ModalFooter>
// //                 </Form>
// //               )}
// //             </Formik>
// //           </ModalBody>
// //         </ModalContent>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default SubCategoryTable;




// import React, { useState, useEffect } from "react";
// import { Button, Space, Table, Input } from "antd";
// import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { startLoading, stopLoading } from "../../redux/Features/LoadingSlice";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button as ChakraButton,
//   Input as ChakraInput,
//   Select,
//   FormControl,
//   FormLabel,
//   FormErrorMessage,
// } from "@chakra-ui/react";
// import Swal from "sweetalert2";
// import * as Yup from "yup";
// import { Formik, Form, Field } from "formik";

// const { Column } = Table;
// const apiUrl = import.meta.env.VITE_API_URL;

// const SubCategoryTable = ({ categoryList }) => {
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const storedToken = token || localStorage.getItem("token");

//   const [subCategoryData, setSubCategoryData] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [editData, setEditData] = useState(null);

//   const validationSchema = Yup.object({
//     subcategoryName: Yup.string().required("Subcategory Name is required"),
//     priority: Yup.number().required("Priority is required").min(0, "Priority must be 0 or greater"),
//     category_Name: Yup.string().required("Category must be selected"),
//   });

//   const getSubCategory = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}SubCategory/GetAllSubCategory`, {
//         headers: {
//           Authorization: `Bearer ${storedToken}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (res.data[0].message === "SUCCESS") {
//         setSubCategoryData(res.data[0].dataset.$values);
//       } else {
//         Swal.fire({
//           title: "Error!",
//           text: "Error fetching Sub-category List.",
//           icon: "error",
//           confirmButtonText: "Try Again",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching sub-categories:", error);
//       Swal.fire({
//         title: "Failed!",
//         text: `Failed to fetch Sub-category List: ${error.message}`,
//         icon: "error",
//         confirmButtonText: "Close",
//       });
//     }
//   };

//   const handleEdit = (subcategory) => {
//     setEditData(subcategory);
//     setIsEditOpen(true);
//   };

//   // const handleUpdate = async (values) => {
//   //   try {
//   //     const selectCategory = categoryList.find((category) => String(category.Category_id) === String(values.categoryId));
//   //     dispatch(startLoading());

//   //     // Create the data object to send
//   //     // const dataToSend = {
//   //     //   id: values.id,
//   //     //   Category_Name: selectCategory.category_Name,
//   //     //   Subcategory_Name: values.subcategoryName,
//   //     //   Priority: values.priority,
//   //     //   Category_id: values.categoryId,
//   //     // };
//   //     console.log({id: values.id,
//   //       Category_Name: selectCategory.category_Name,
//   //       Subcategory_Name: values.subcategoryName,
//   //       Priority: values.priority,
//   //       Category_id: values.categoryId,})

//   //     // Send the data object directly in the request body
//   //     const res = await axios.post(
//   //       `${apiUrl}Subcategory/UpdateSubCategory`,
//   //       dataToSend, // Send the data object as the request body
//   //       { headers: { Authorization: `Bearer ${storedToken}` } }
//   //     );

//   //     dispatch(stopLoading());

//   //     if (res.data.Message.toLowerCase() === "success") {
//   //       await getSubCategory();
//   //       await Swal.fire({
//   //         title: "Success",
//   //         text: "Subcategory updated successfully!",
//   //         icon: "success",
//   //       });
//   //       setIsEditOpen(false);
//   //     } else {
//   //       await Swal.fire({
//   //         title: "Update Failed",
//   //         text: "Failed to update subcategory.",
//   //         icon: "error",
//   //       });
//   //     }
//   //   } catch (error) {
//   //     await Swal.fire({
//   //       title: "Error",
//   //       text: "Error updating subcategory. Please try again." + error,
//   //       icon: "error",
//   //     });
//   //     dispatch(stopLoading());
//   //   }
//   // };
//   const handleUpdate = async (values) => {
//     try {
//       // Find the selected category based on categoryId
//       const selectCategory = categoryList.find((category) => String(category.Category_id) === String(values.categoryId));
//       console.log(selectCategory)
      
//       dispatch(startLoading());
  
//       // Create the data object to send
//       const dataToSend = {
//         id: values.id,
//         Category_Name: selectCategory.category_Name, // Get the category name
//         Subcategory_Name: values.subcategoryName,
//         Priority: values.priority,
//         category_id: values.categoryId, // Send the category ID
//       };
  
//       // Send the data object directly in the request body
//       const res = await axios.post(
//         `${apiUrl}Subcategory/UpdateSubCategory`,
//         dataToSend, // Send the data object as the request body
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );
  
//       dispatch(stopLoading());
  
//       if (res.data.Message.toLowerCase() === "success") {
//         await getSubCategory();
//         await Swal.fire({
//           title: "Success",
//           text: "Subcategory updated successfully!",
//           icon: "success",
//         });
//         setIsEditOpen(false);
//       } else {
//         await Swal.fire({
//           title: "Update Failed",
//           text: "Failed to update subcategory.",
//           icon: "error",
//         });
//       }
//     } catch (error) {
//       await Swal.fire({
//         title: "Error",
//         text: "Error updating subcategory. Please try again." + error,
//         icon: "error",
//       });
//       dispatch(stopLoading());
//     }
//   };
//   const handleDelete = async (record) => {
 
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to recover this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           dispatch(startLoading());

//           const deleteResponse = await axios.delete(
//             `${apiUrl}SubCategory/DeleteSubCategory`,
//             {
//               headers: { Authorization: `Bearer ${storedToken}`, 'Content-Type': 'application/json' },
//               data: { id: record.id }, // Use $id for deletion
//             }
//           );

//           dispatch(stopLoading());

//           if (deleteResponse.status === 200) {
//             await Swal.fire("Deleted!", "Record has been deleted.", "success");
//             getSubCategory(); // Refresh the list after deletion
//           } else {
//             await Swal.fire("Error", "Failed to delete the record.", "error");
//           }
//         } catch (error) {
//           dispatch(stopLoading());
//           await Swal.fire("Error", "Failed to delete the record. Please try again later.", "error");
//         }
//       }
//     });
//   };

//   useEffect(() => {
//     getSubCategory();
//   }, []);

//   const filteredData = subCategoryData.filter((item) =>
//     item.category_Name.toLowerCase().includes(searchText.toLowerCase())
//   ) || [];

//   return (
//     <div>
//       <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             marginBottom: "20px",
//           }}
//         >
//           <h2 style={{ fontWeight: "600", marginBottom: "0" }}>
//             Sub Category List
//           </h2>
//           <Input
//             placeholder="Search by sub category name"
//             style={{ width: "300px" }}
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             prefix={<MdSearch />}
//           />
//         </div>
//       </div>

//       <Table
//         dataSource={filteredData}
//         columns={[
//           { title: "ID", dataIndex: "$id", key: "$id", align: "center" },
//           {
//             title: "Category Name",
//             dataIndex: "category_Name",
//             key: "category_Name",
//             align: "center",
//           },
//           {
//             title: "Sub-Category Name",
//             dataIndex: "subcategory_Name",
//             key: "subcategory_Name",
//             align: "center",
//           },
//           {
//             title: "Priority",
//             dataIndex: "priority",
//             key: "priority",
//             align: "center",
//           },
//           {
//             title: "Action",
//             key: "action",
//             render: (_, record) => (
//               <Space size="middle">
//                 <Button type="primary" onClick={() => handleEdit(record)}>
//                   <MdEdit />
//                 </Button>
//                 <Button
//                   type="primary"
//                   danger
//                   onClick={() => handleDelete(record)}
//                 >
//                   <MdDelete />
//                 </Button>
//               </Space>
//             ),
//             align: "center",
//           },
//         ]}
//         rowKey="$id"
//         pagination={{ pageSize: 5 }}
//       />

//       {/* Edit Modal */}
//       <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} isCentered>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Edit Sub-Category</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Formik
//               initialValues={{
//                 id: editData ? editData.$id : "", // Use $id from your object
//                 subcategoryName: editData ? editData.category_Name : "", // Use category_Name
//                 priority: editData ? editData.priority : "", // Use priority
//                 categoryId: editData ? editData.category_id : "",
//                 Category_Name:editData ? editData.Category_Name:"" // Use category_id
//               }}
//               validationSchema={validationSchema}
//               onSubmit={handleUpdate} // Pass the handleUpdate function
//             >
//               {({ errors, touched }) => (
//                 <Form>
//                   <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
//                     {/* Sub-category Name Field */}
//                     <FormControl isInvalid={touched.subcategoryName && errors.subcategoryName}>
//                       <FormLabel htmlFor="subcategoryName">Sub-Category Name</FormLabel>
//                       <Field
//                         as={ChakraInput}
//                         id="subcategoryName"
//                         name="subcategoryName"
//                         placeholder="Enter Sub-category Name"
//                       />
//                       <FormErrorMessage>{errors.subcategoryName}</FormErrorMessage>
//                     </FormControl>

//                     {/* Priority Field */}
//                     <FormControl isInvalid={touched.priority && errors.priority}>
//                       <FormLabel htmlFor="priority">Priority</FormLabel>
//                       <Field as={Select} id="priority" name="priority" placeholder="Select Priority">
//                         {[...Array(10).keys()].map((i) => (
//                           <option key={i} value={i}>
//                             {i}
//                           </option>
//                         ))}
//                       </Field>
//                       <FormErrorMessage>{errors.priority}</FormErrorMessage>
//                     </FormControl>

//                     {/* Category Field */}
//                     {/* <FormControl isInvalid={touched.categoryId && errors.categoryId}>
//                       <FormLabel htmlFor="categoryId">Please Select Category</FormLabel>
//                       <Field
//                         as={Select}
//                         id="categoryId"
//                         name="categoryId"
//                         placeholder="Select Category"
//                       >
//                         <option value="" disabled>
//                           Select Category
//                         </option>
//                         {categoryList.map((category) => (
//                           <option key={category.Category_id} value={category.Category_id}>
//                             {category.category_Name}
//                           </option>
//                         ))}
//                       </Field>
//                       <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
//                     </FormControl> */}



// <FormControl isInvalid={touched.categoryId && errors.categoryId}>
//   <FormLabel htmlFor="categoryId">Please Select Category</FormLabel>
//   <Field
//     as={Select}
//     id="categoryId"
//     name="categoryId"
//     placeholder="Select Category"
//     onChange={(e) => {
//       const selectedCategoryId = e.target.value;
//       const selectedCategory = categoryList.find(cat => String(cat.Category_id) === selectedCategoryId);

//       // Explicitly update both categoryId and Category_Name
//       setFieldValue("categoryId", selectedCategoryId);
//       setFieldValue("Category_Name", selectedCategory ? selectedCategory.category_Name : ""); 
//     }}
//   >
//     <option value="" disabled>
//       Select Category
//     </option>
//     {categoryList.map((category) => (
//       <option key={category.Category_id} value={category.Category_id}>
//         {category.category_Name}
//       </option>
//     ))}
//   </Field>
//   <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
// </FormControl>

//                   </div>

//                   {/* Modal Footer */}
//                   <ModalFooter>
//                     <ChakraButton colorScheme="blue" mr={3} type="submit">
//                       Update
//                     </ChakraButton>
//                     <ChakraButton variant="ghost" onClick={() => setIsEditOpen(false)}>
//                       Cancel
//                     </ChakraButton>
//                   </ModalFooter>
//                 </Form>
//               )}
//             </Formik>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// };

// export default SubCategoryTable;


import React, { useState, useEffect } from "react";
import { Button, Space, Table, Input } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../redux/Features/LoadingSlice";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button as ChakraButton,
  Input as ChakraInput,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const apiUrl = import.meta.env.VITE_API_URL;

const SubCategoryTable = ({ categoryList }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const storedToken = token || localStorage.getItem("token");

  const [subCategoryData, setSubCategoryData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const validationSchema = Yup.object({
    subcategoryName: Yup.string().required("Subcategory Name is required"),
    priority: Yup.number().required("Priority is required").min(0, "Priority must be 0 or greater"),
    categoryId: Yup.string().required("Category must be selected"),
  });

  const getSubCategory = async () => {
    try {
      const res = await axios.get(`${apiUrl}SubCategory/GetAllSubCategory`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });
      if (res.data[0].message === "SUCCESS") {
        setSubCategoryData(res.data[0].dataset.$values);
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

  const handleEdit = (subcategory) => {
    console.log(subcategory)
    setEditData(subcategory);
    setIsEditOpen(true);
  };

  const handleUpdate = async (values) => {
    try {
      const selectCategory = categoryList.find(
        (category) => String(category.Category_id) === String(values.categoryId)
      );
      dispatch(startLoading());

      const dataToSend = {
        id: values.id,
        Category_Name: selectCategory.category_Name,
        Subcategory_Name: values.subcategoryName,
        Priority: values.priority,
        category_id: values.categoryId, // This will now be the selected Category_id
      };

      const res = await axios.post(`${apiUrl}Subcategory/UpdateSubCategory`, dataToSend, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      dispatch(stopLoading());

      if (res.data.Message.toLowerCase() === "success") {
        await getSubCategory();
        await Swal.fire({
          title: "Success",
          text: "Subcategory updated successfully!",
          icon: "success",
        });
        setIsEditOpen(false);
      } else {
        await Swal.fire({
          title: "Update Failed",
          text: "Failed to update subcategory.",
          icon: "error",
        });
      }
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: `Error updating subcategory: ${error}`,
        icon: "error",
      });
      dispatch(stopLoading());
    }
  };

  const handleDelete = async (record) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(startLoading());

          const deleteResponse = await axios.delete(`${apiUrl}SubCategory/DeleteSubCategory`, {
            headers: { Authorization: `Bearer ${storedToken}`, "Content-Type": "application/json" },
            data: { id: record.id },
          });

          dispatch(stopLoading());

          if (deleteResponse.status === 200) {
            await Swal.fire("Deleted!", "Record has been deleted.", "success");
            getSubCategory();
          } else {
            await Swal.fire("Error", "Failed to delete the record.", "error");
          }
        } catch (error) {
          dispatch(stopLoading());
          await Swal.fire("Error", "Failed to delete the record. Please try again later.", "error");
        }
      }
    });
  };

  useEffect(() => {
    getSubCategory();
  }, []);

  const filteredData =
    subCategoryData.filter((item) =>
      item.subcategory_Name.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", align: "center" },
    {
      title: "Category Name",
      dataIndex: "category_Name",
      key: "category_Name",
      align: "center",
    },
    {
      title: "Sub-Category Name",
      dataIndex: "subcategory_Name",
      key: "subcategory_Name",
      align: "center",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            <MdEdit />
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <MdDelete />
          </Button>
        </Space>
      ),
      align: "center",
    },
  ];

  // Helper function to find Category_id based on category_Name
  const getCategoryIdFromName = (categoryName) => {
    const category = categoryList.find(
      (cat) => cat.category_Name.toLowerCase() === categoryName.toLowerCase()
    );
    return category ? category.Category_id : "";
  };

  return (
    <div>
      <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Sub Category List</h2>
          <Input
            placeholder="Search by sub category name"
            style={{ width: "300px" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<MdSearch />}
          />
        </div>
      </div>

      <Table dataSource={filteredData} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Sub-Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              enableReinitialize
              initialValues={{
                id: editData?.id || "",
                subcategoryName: editData?.subcategory_Name || "",
                priority: editData?.priority || "",
                categoryId: editData ? getCategoryIdFromName(editData.category_Name) : "", // Use category_Name to find Category_id
              }}
              validationSchema={validationSchema}
              onSubmit={handleUpdate}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form>
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {/* Sub-category Name Field */}
                    <FormControl isInvalid={touched.subcategoryName && errors.subcategoryName}>
                      <FormLabel htmlFor="subcategoryName">Sub-Category Name</FormLabel>
                      <Field
                        as={ChakraInput}
                        id="subcategoryName"
                        name="subcategoryName"
                        placeholder="Enter Sub-category Name"
                      />
                      <FormErrorMessage>{errors.subcategoryName}</FormErrorMessage>
                    </FormControl>

                    {/* Priority Field */}
                    <FormControl isInvalid={touched.priority && errors.priority}>
                      <FormLabel htmlFor="priority">Priority</FormLabel>
                      <Field as={Select} id="priority" name="priority" placeholder="Select Priority">
                        {[...Array(10).keys()].map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </Field>
                      <FormErrorMessage>{errors.priority}</FormErrorMessage>
                    </FormControl>

                    {/* Category Field */}
                    <FormControl isInvalid={touched.categoryId && errors.categoryId}>
                      <FormLabel htmlFor="categoryId">Please Select Category</FormLabel>
                      <Field
                        as={Select}
                        id="categoryId"
                        name="categoryId"
                        placeholder="Select Category"
                        onChange={(e) => {
                          const selectedCategoryId = e.target.value;
                          setFieldValue("categoryId", selectedCategoryId);
                        }}
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        {categoryList.map((category) => (
                          <option key={category.Category_id} value={category.Category_id}>
                            {category.category_Name}
                          </option>
                        ))}
                      </Field>
                      <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
                    </FormControl>
                  </div>

                  {/* Modal Footer */}
                  <ModalFooter>
                    <ChakraButton colorScheme="blue" mr={3} type="submit">
                      Update
                    </ChakraButton>
                    <ChakraButton variant="ghost" onClick={() => setIsEditOpen(false)}>
                      Cancel
                    </ChakraButton>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SubCategoryTable;