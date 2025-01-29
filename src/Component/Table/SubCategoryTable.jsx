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
import { CloudFilled } from "@ant-design/icons";

const { Column } = Table;
const apiUrl = import.meta.env.VITE_API_URL;

const SubCategoryTable = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const storedToken = token || localStorage.getItem("token");

  const [subCategoryData, setSubCategoryData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  const validationSchema = Yup.object({
    subcategoryName: Yup.string().required("Subcategory Name is required"),
    priority: Yup.number().required("Priority is required").min(0, "Priority must be 0 or greater"),
    categoryId: Yup.string().required("Category must be selected"),
  });



  const getCategory = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/EcommerceCategory/GetAllCategory`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      if (res.data.Message === "success") {
        setCategoryList(res.data.CategoryList);
      } else {
        await Swal.fire({
          title: "Error in Getting Category List",
          text: "Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Failed to fetch the category list. Please try again later."+error,
        icon: "error",
      });
    }
  };

  // Fetch subcategories
  const getSubCategory = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}EcommerceSubcategory/GetAllSubCategory`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      if (res.data.Message.toLowerCase() === "success") {
        setSubCategoryData(res.data.SubCategoryList);
        console.log(res.data.SubCategoryList)
      } else {
        alert("Error fetching Sub-category List");
      }
    } catch (error) {
      alert("Failed to fetch Sub-category List"+error);
    }
  };


  const handleEdit = (subcategory) => {

    setEditData(subcategory);
    setIsEditOpen(true);
  };

  const handleSubmit = async (values) => {

  
    try {

      const selectCategory = categoryList.find((category) => String(category.Category_id) === String(values.categoryId));  
      dispatch(startLoading());
  
 
      const res = await axios.post(
        `${apiUrl}EcommerceSubcategory/UpdateSubCategory?id=${values.id}&Category_Name=${selectCategory.Category_Name}&Subcategory_Name=${values.subcategoryName}&Priority=${values.priority}&category_id=${values.categoryId}`,
        {},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
  
      dispatch(stopLoading());
  
      if (res.data.Message.toLowerCase() === "success") {
        await getSubCategory();
        await Swal.fire({
          title: "Success",
          text: "Subcategory updated successfully!",
          icon: "success",
        });
        setIsEditOpen(false);
        getSubCategory();
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
        text: "Error updating subcategory. Please try again."+error,
        icon: "error",
      });
      dispatch(stopLoading());
    }
  };
  


  // Handle delete
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

          const deleteResponse = await axios.post(
            `${apiUrl}/EcommerceSubcategory/DeleteSubcategory?id=${record.id}`,
            {},
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );
          dispatch(stopLoading());

          if (deleteResponse.data.Message.toLowerCase() === "success") {
            setSubCategoryData(
              subCategoryData.filter((item) => item.id !== record.id)
            );
            Swal.fire("Deleted!", "Record has been deleted.", "success");
          } else {
            Swal.fire("Error", "Failed to delete the record.", "error");
          }
        } catch (error) {
          Swal.fire(
            "Error",
            "Failed to delete the record. Please try again later."+error,
            "error"
          );
        }
      }
    });
  };

  useEffect(() => {
    getSubCategory();
    getCategory();
   
  }, []);

  const filteredData =
    subCategoryData.filter((item) =>
      item.Subcategory_Name.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

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
          <h2 style={{ fontWeight: "600", marginBottom: "0" }}>
            Sub Category List
          </h2>
          <Input
            placeholder="Search by sub category name"
            style={{ width: "300px" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<MdSearch />}
          />
        </div>
      </div>

      <Table
        dataSource={filteredData}
        columns={[
          { title: "ID", dataIndex: "id", key: "id", align: "center" },
          {
            title: "Category Name",
            dataIndex: "Category_Name",
            key: "Category_Name",
            align: "center",
          },
          {
            title: "Sub-Category Name",
            dataIndex: "Subcategory_Name",
            key: "Subcategory_Name",
            align: "center",
          },
          {
            title: "Priority",
            dataIndex: "Priority",
            key: "Priority",
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
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDelete(record)}
                >
                  <MdDelete />
                </Button>
              </Space>
            ),
            align: "center",
          },
        ]}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} isCentered>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Edit Sub-Category</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Formik
        initialValues={{
          id: editData ? editData.id : "",
          subcategoryName: editData ? editData.Subcategory_Name : "",
          priority: editData ? editData.Priority : "",
          categoryId: editData ? editData.Category_id : "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
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
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categoryList.map((category) => (
                    <option key={category.Category_id} value={category.Category_id}>
                      {category.Category_Name}
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
