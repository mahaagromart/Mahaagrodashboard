import { useState, useEffect } from "react";
import { Button, Space, Table, Input } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/Features/LoadingSlice";
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

const SubSubCategoryTable = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const storedToken = token || localStorage.getItem("token");

  const [subCategoryData, setSubCategoryData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [subsubCategory, setSubSubCategory] = useState([]);

  const validationSchema = Yup.object({
    SUBSUBCATEGORY_NAME: Yup.string().required("Sub-Subcategory Name is required"),
    SUBCATEGORY_NAME: Yup.string().required("Sub-Category Name is required"),
    CATEGORY_NAME: Yup.string().required("Category Name is required"),
    PRIORITY: Yup.number().required("Priority is required").min(0, "Priority must be 0 or greater"),
  });
  // Fetch categories
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
        throw new Error("Error in getting Category List");
      }
    } catch (error) {
      Swal.fire({
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
      } else {
        throw new Error("Error fetching Sub-category List");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch Sub-category List"+error,
        icon: "error",
      });
    }
  };

  // Fetch subsubcategories
  const getAllSubSubCategory = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/EcommerceSubSubsubCategory/GetAllSubsubCategory`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      if (res.data.Message === "success") {
        setSubSubCategory(res.data.SubsubCategoryList);
      } else {
        throw new Error("Error fetching Sub-Subcategory List");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch Sub-Subcategory list. Please try again later."+error,
        icon: "error",
      });
    }
  };

  const handleEdit = (record) => {
    console.log(record);
    console.log(subsubCategory)
    setEditData(record);
    setIsEditOpen(true);
  
  };



//Insert subsubCategory
const handleSubmit = async (values) => {
try {
    dispatch(startLoading());

    const res = await axios.post(
      `${apiUrl}EcommerceSubSubsubCategory/UpdateSubsubCategory?id=${values.Id}&SUBSUBCATEGORY_NAME=${values.SUBSUBCATEGORY_NAME}&SUBCATEGORY_NAME=${values.SUBCATEGORY_NAME}&CATEGORY_NAME=${values.CATEGORY_NAME}&Priority=${values.PRIORITY}`,
      {},
      { headers: { Authorization: `Bearer ${storedToken}` } }
    );

    dispatch(stopLoading());

    if (res.data.Message.toLowerCase() === "success") {
      await getSubCategory();
      Swal.fire({
        title: "Success",
        text: "Subcategory updated successfully!",
        icon: "success",
      });
      setIsEditOpen(false); 
    } else {
      throw new Error("Update Failed");
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Error updating subcategory. Please try again." + error,
      icon: "error",
    });
    dispatch(stopLoading());
  }
};






//Delete subsubCategory 
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
            `${apiUrl}/EcommerceSubSubsubCategory/DeleteSubsubCategory?id=${record.Id}`,
            {},
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );
          dispatch(stopLoading());
          console.log(deleteResponse.data.Message==="success")

          if (deleteResponse.data.Message.toLowerCase() === "success") {
            setSubCategoryData(subCategoryData.filter((item) => item.id !== record.Id));
            Swal.fire("Deleted!", "Record has been deleted.", "success");
          } else {
            Swal.fire("Error", "Failed to delete the record.", "error");
          }
        } catch (error) {
          Swal.fire("Error", "Failed to delete the record. Please try again later.", + error);
        }
      }
    });
  };



  useEffect(() => {

  
    getAllSubSubCategory();
    getSubCategory();
    getCategory();
  }, []);
  
//Fiteration of Data on search Text
  const filteredData = subsubCategory.filter((item) =>
    (item.SUBSUBCATEGORY_NAME.toLowerCase().includes(searchText.toLowerCase()) || 
    item.CATEGORY_NAME.toLowerCase().includes(searchText.toLowerCase()))
  );
  
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
    


        <Table
  dataSource={filteredData.map((subcategory) => {
    const subSubCategory = subsubCategory.find(
      (subsub) => subsub.SUBCATEGORY_ID === subcategory.id
    );

    // Ensure each item has a unique key (using `subcategory.id` for the row)
    return {
      key: subcategory.id, // Unique key for the row
      ...subcategory,
      SubSubCategory_Name: subSubCategory ? subSubCategory.SUBSUBCATEGORY_NAME : "N/A", // If no sub-subcategory is found, display "N/A"
    };
  })}
  columns={[
    { title: "ID", dataIndex: "Id", key: "Id", align: "center" },
    {
      title: "Sub-Subcategory Name", 
      dataIndex: "SUBSUBCATEGORY_NAME",
      key: "SUBSUBCATEGORY_NAME",
      align: "center",
    },
    {
      title: "Sub-Category Name",
      dataIndex: "SUBCATEGORY_NAME",
      key: "SUBCATEGORY_NAME",
      align: "center",
    },
    {
      title: "Category Name",
      dataIndex: "CATEGORY_NAME",
      key: "CATEGORY_NAME",
      align: "center",
    },
    {
      title: "Priority",
      dataIndex: "PRIORITY",
      key: "PRIORITY",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            key={`edit-${record.Id}`} // Unique key for edit button
          >
            <MdEdit />
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleDelete(record)}
            key={`delete-${record.Id}`} // Unique key for delete button
          >
            <MdDelete />
          </Button>
        </Space>
      ),
      align: "center",
    },
  ]}
  rowKey="id" // Ensuring each row has a unique ID for row selection or key management.
  pagination={{ pageSize: 10 }}
/>



<Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} isCentered>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Edit Sub-Category</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Formik
        initialValues={{
          Id: editData ? editData.Id : "",
          SUBSUBCATEGORY_NAME: editData ? editData.SUBSUBCATEGORY_NAME : "",
          SUBCATEGORY_NAME: editData ? editData.SUBCATEGORY_NAME : "", 
          CATEGORY_NAME: editData ? editData.CATEGORY_NAME : "",
          PRIORITY: editData ? editData.PRIORITY : "",
        }}
  
        validationSchema={Yup.object({
          SUBSUBCATEGORY_NAME: Yup.string().required("Sub-Subcategory Name is required"),
          SUBCATEGORY_NAME: Yup.string().required("Sub-Category Name is required"),
          CATEGORY_NAME: Yup.string().required("Category Name is required"),
          PRIORITY: Yup.number().required("Priority is required").min(0, "Priority must be 0 or greater"),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {/* Sub-Subcategory Name Field */}
              <FormControl isInvalid={touched.SUBSUBCATEGORY_NAME && errors.SUBSUBCATEGORY_NAME}>
                <FormLabel htmlFor="SUBSUBCATEGORY_NAME">Sub-Subcategory Name</FormLabel>
                <Field
                  as={ChakraInput}
                  id="SUBSUBCATEGORY_NAME"
                  name="SUBSUBCATEGORY_NAME"
                  placeholder="Enter Sub-Subcategory Name"
                />
                <FormErrorMessage>{errors.SUBSUBCATEGORY_NAME}</FormErrorMessage>
              </FormControl>

              {/* Sub-category Name Field */}
              <FormControl isInvalid={touched.SUBCATEGORY_NAME && errors.SUBCATEGORY_NAME}>
                              <FormLabel htmlFor="categoryId">Please Select Category</FormLabel>
                              <Field
                                as={Select}
                                id="SUBCATEGORY_NAME"
                                name="SUBCATEGORY_NAME"
                                placeholder="Select Sub Category"
                              >
                                <option value="" disabled>
                                  Select Category
                                </option>
                                {subCategoryData.map((category) => (
                                  <option key={category.id} value={category.Subcategory_Name}>
                                    {category.Subcategory_Name}
                                  </option>
                                ))}
                              </Field>
                              <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
                            </FormControl>

              {/* Category Name Field */}
        

                <FormControl isInvalid={touched.CATEGORY_NAME && errors.CATEGORY_NAME}>
                              <FormLabel htmlFor="categoryId">Please Select Category</FormLabel>
                              <Field
                                as={Select}
                                id="CATEGORY_NAME"
                                name="CATEGORY_NAME"
                                placeholder="Select Category Name"
                              >
                                <option value="" disabled>
                                  Select Category
                                </option>
                                {categoryList.map((category) => (
                                  <option key={category.Category_id} value={category.Category_Name}>
                                    {category.Category_Name}
                                  </option>
                                ))}
                              </Field>
                              <FormErrorMessage>{errors.categoryId}</FormErrorMessage>
                            </FormControl>


              {/* Priority Field */}
              <FormControl isInvalid={touched.PRIORITY && errors.PRIORITY}>
                <FormLabel htmlFor="PRIORITY">Priority</FormLabel>
                <Field as={Select} id="PRIORITY" name="PRIORITY" placeholder="Select Priority">
                  {[...Array(10).keys()].map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage>{errors.PRIORITY}</FormErrorMessage>
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
    </div>
  );
};

export default SubSubCategoryTable;
