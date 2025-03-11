import { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  GridItem,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import CardBox from "../../../Component/Charts/CardBox";

import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/Features/LoadingSlice";
import SubCategoryTable from "../../../Component/Table/SubCategoryTable";

const validationSchema = yup.object().shape({
  Subcategory_Name: yup
    .string()
    .required("Sub Category Name is required")
    .min(3, "Must be at least 3 characters"),
  priority: yup
    .number()
    .required("Priority is required")
    .typeError("Priority must be a number"),
  category_id: yup.string().required("Main Category is required"),
});

const AddSubCategory = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);

  const getCategoryName = (id) => {
    if (!categoryList || categoryList.length === 0) {
      return "Unknown Category"; 
    }

    const category = categoryList.find((cat) => cat.category_id === Number(id));
    return category ? category.category_Name : "Unknown Category"; 
  };

  const getCategory = async () => {
    try {
      const res = await axios.get(`${apiUrl}Category/GetAllCategory`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      const categories = res.data.categoryList?.$values || res.data.categoryList;
      if (res.data.message === "SUCCESS" && categories) {
        setCategoryList(categories);
      } else {
        await Swal.fire({
          title: "Error in Getting Category List",
          text: "Invalid response format. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      await Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to fetch the category list. Please try again later.",
        icon: "error",
      });
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    dispatch(startLoading());

    const c_name = getCategoryName(values.category_id);

    try {
      const data = {
        Subcategory_Name: values.Subcategory_Name.toString() || "",
        Category_id: Number(values.category_id) || 0,
        Category_Name: c_name.toString(),
        Priority: Number(values.priority) || 0,
      };

      const res = await axios.post(
        `${apiUrl}SubCategory/InsertSubCategory`,
        data,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );


      if (res.data[0].message === "SUCCESS" && res.data[0].code === 200) {
        await Swal.fire({
          title: "Success",
          text: "Sub-category added successfully!",
          icon: "success",
        });

        resetForm();
      } else {
        await Swal.fire({
          title: "Error",
          text: res.data.Message || "Failed to add sub-category.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error adding sub-category:", error);
      await Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Box marginTop="1%">
        <Box mb={6}>
          <h2
            className="content-title"
            style={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "20px",
              color: "#4A5568",
            }}
          >
            Add New Sub Category
          </h2>
        </Box>

        <Box mx="auto">
          <CardBox>
            <Formik
              initialValues={{
                Category_Name: "",
                Subcategory_Name: "",
                priority: "",
                category_id: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ resetForm, setFieldValue }) => (
                <Form>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} p={5}>
                    <CardBox>
                      <FormControl>
                        <FormLabel fontWeight="bold" color="gray.600">
                          Sub Category Name
                        </FormLabel>
                        <Field
                          as={Input}
                          name="Subcategory_Name"
                          type="text"
                          placeholder="Enter Sub category name"
                          focusBorderColor="blue.500"
                          size="md"
                          borderRadius="md"
                        />
                        <Text color="red.500" fontSize="sm" minHeight="20px">
                          <ErrorMessage name="Subcategory_Name" />
                        </Text>
                      </FormControl>
                    </CardBox>

                    <CardBox>
                      <FormControl>
                        <FormLabel fontWeight="bold" color="gray.600">
                          Priority
                        </FormLabel>
                        <Field
                          as={Select}
                          name="priority"
                          placeholder="Select priority"
                          focusBorderColor="blue.500"
                          size="md"
                        >
                          {Array.from({ length: 10 }, (_, i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </Field>
                        <Text color="red.500" fontSize="sm" minHeight="20px">
                          <ErrorMessage name="priority" />
                        </Text>
                      </FormControl>
                    </CardBox>

                    <CardBox>
                      <FormControl>
                        <FormLabel fontWeight="bold" color="gray.600">
                          Select Main Category
                        </FormLabel>
                        <Field
                          as={Select}
                          name="category_id"
                          placeholder="Select Category"
                          focusBorderColor="blue.500"
                          size="md"
                          onChange={(e) => {
                            setFieldValue("category_id", e.target.value);
                          }}
                        >
                          {categoryList.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                              {category.category_Name}
                            </option>
                          ))}
                        </Field>
                        <Text color="red.500" fontSize="sm" minHeight="20px">
                          <ErrorMessage name="category_id" />
                        </Text>
                      </FormControl>
                    </CardBox>

                    <GridItem display="flex" justifyContent="center" alignItems="center" mt={4} mb={5}>
                      <Box display="flex" gap={5} mr={5} mt={6}>
                        <Button colorScheme="gray" onClick={() => resetForm()} type="button">
                          Reset
                        </Button>
                        <Button colorScheme="blue" type="submit">
                          Submit
                        </Button>
                      </Box>
                    </GridItem>
                  </SimpleGrid>
                </Form>
              )}
            </Formik>
          </CardBox>
        </Box>

        {/* Table Section */}
        <Box mt={5}>
          <CardBox>
            <SubCategoryTable />
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default AddSubCategory;
