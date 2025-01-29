import { useState, useEffect } from "react";
import { Button, Space, Table, Input } from "antd";
import { MdDelete, MdEdit, MdSearch } from "react-icons/md";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/Features/LoadingSlice";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, Button as ChakraButton, Select,
  FormControl, FormLabel, FormErrorMessage , Input as ChakraInput
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
        text: "Failed to fetch the category list. Please try again later.",
        icon: "error",
      });
    }
  };

  const getSubCategory = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/EcommerceSubcategory/GetAllSubCategory`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      if (res.data.Message.toLowerCase() === "success") {
        setSubCategoryData(res.data.SubCategoryList);
      } else {
        await Swal.fire({
          title: "Error in Getting Sub-Category List",
          text: "Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Failed to fetch the sub-category list. Please try again later.",
        icon: "error",
      });
    }
  };

  const getSubSubCategory = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/EcommerceSubSubsubCategory/GetAllSubsubCategory`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      if (res.data.Message.toLowerCase() === "success") {
        setSubSubCategory(res.data.SubsubCategoryList);
      } else {
        await Swal.fire({
          title: "Error in Getting Sub-Subcategory List",
          text: "Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Failed to fetch the sub-subcategory list. Please try again later.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getCategory();
    getSubCategory();
    getSubSubCategory();
  }, []);

  const handleEdit = (record) => {
    setEditData(record);
    setIsEditOpen(true);
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(startLoading());
          const res = await axios.post(`${apiUrl}/EcommerceSubSubsubCategory/DeleteSubsubCategory`, null, {
            headers: { Authorization: `Bearer ${storedToken}` },
            params: { id: record.Id },
          });
          dispatch(stopLoading());

          if (res.data.Message.toLowerCase() === "success") {
            setSubSubCategory(subsubCategory.filter((item) => item.Id !== record.Id));
            Swal.fire("Deleted!", "Record has been deleted.", "success");
          } else {
            Swal.fire("Error", "Failed to delete the record.", "error");
          }
        } catch (error) {
          Swal.fire("Error", `Failed to delete the record: ${error}`, "error");
          dispatch(stopLoading());
        }
      }
    });
  };

  const handleUpdate = async (values) => {
    try {
      dispatch(startLoading());
      const res = await axios.post(
        `${apiUrl}/EcommerceSubSubsubCategory/UpdateSubsubCategory`,
        {
          Id: values.Id,
          SUBSUBCATEGORY_NAME: values.SUBSUBCATEGORY_NAME,
          SUBCATEGORY_NAME: values.SUBCATEGORY_NAME,
          CATEGORY_NAME: values.CATEGORY_NAME,
          PRIORITY: values.PRIORITY,
        },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      dispatch(stopLoading());

      if (res.data.Message.toLowerCase() === "success") {
        setSubSubCategory(
          subsubCategory.map((item) =>
            item.Id === values.Id ? { ...item, ...values } : item
          )
        );
        Swal.fire("Updated!", "The sub-subcategory has been updated.", "success");
        setIsEditOpen(false); // Close the modal
      } else {
        Swal.fire("Error", "Failed to update the sub-subcategory.", "error");
      }
    } catch (error) {
      dispatch(stopLoading());
      Swal.fire("Error", `Failed to update: ${error}`, "error");
    }
  };

  const filteredData = subsubCategory.filter((item) =>
    item.SUBSUBCATEGORY_NAME.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Sub-Subcategory Name",
      dataIndex: "SUBSUBCATEGORY_NAME",
      key: "SUBSUBCATEGORY_NAME",
    },
    {
      title: "Sub-Category Name",
      dataIndex: "SUBCATEGORY_NAME",
      key: "SUBCATEGORY_NAME",
    },
    {
      title: "Category Name",
      dataIndex: "CATEGORY_NAME",
      key: "CATEGORY_NAME",
    },
    {
      title: "Priority",
      dataIndex: "PRIORITY",
      key: "PRIORITY",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)} icon={<MdEdit />} />
          <Button danger onClick={() => handleDelete(record)} icon={<MdDelete />} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Sub-Subcategory List</h2>
        <Input
          placeholder="Search by sub-subcategory name"
          style={{ width: "300px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<MdSearch />}
        />
      </div>

      <Table dataSource={filteredData} columns={columns} rowKey="Id" pagination={{ pageSize: 10 }} />

      {/* Edit Modal */}
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
              validationSchema={validationSchema}
              onSubmit={handleUpdate}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {/* Sub-Subcategory Name */}
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

                    {/* Sub-category Name */}
                    <FormControl isInvalid={touched.SUBCATEGORY_NAME && errors.SUBCATEGORY_NAME}>
                      <FormLabel htmlFor="SUBCATEGORY_NAME">Sub-Category Name</FormLabel>
                      <Field
                        as={Select}
                        id="SUBCATEGORY_NAME"
                        name="SUBCATEGORY_NAME"
                        placeholder="Select Sub Category"
                      >
                        <option value="" disabled>
                          Select Sub Category
                        </option>
                        {subCategoryData.map((category) => (
                          <option key={category.id} value={category.Subcategory_Name}>
                            {category.Subcategory_Name}
                          </option>
                        ))}
                      </Field>
                      <FormErrorMessage>{errors.SUBCATEGORY_NAME}</FormErrorMessage>
                    </FormControl>

                    {/* Category Name */}
                    <FormControl isInvalid={touched.CATEGORY_NAME && errors.CATEGORY_NAME}>
                      <FormLabel htmlFor="CATEGORY_NAME">Category Name</FormLabel>
                      <Field
                        as={Select}
                        id="CATEGORY_NAME"
                        name="CATEGORY_NAME"
                        placeholder="Select Category"
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
                      <FormErrorMessage>{errors.CATEGORY_NAME}</FormErrorMessage>
                    </FormControl>

                    {/* Priority */}
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

export default SubSubCategoryTable;
