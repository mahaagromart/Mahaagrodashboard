import {
  Box,
  SimpleGrid,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import CardBox from "../../../Component/Charts/CardBox";
import SubSubCategoryTable from "./SubSubCategoryTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  startLoading,
  stopLoading,
} from "../../../redux/Features/LoadingSlice";
import Swal from "sweetalert2";

// Form validation schema using Yup
const validationSchema = Yup.object({
  SUBSUBCATEGORY_NAME: Yup.string()
    .required("Sub Sub Category Name is required")
    .min(3, "Sub Sub Category Name must be at least 3 characters"),
  CATEGORY_NAME: Yup.string().required("Main Category is required"),
  SUBCATEGORY_NAME: Yup.string().required("Sub Category is required"),
  PRIORITY: Yup.number()
    .required("Priority is required")
    .min(1, "Priority must be between 1 and 10")
    .max(10, "Priority must be between 1 and 10"),
});

const apiUrl = import.meta.env.VITE_API_URL;

const AddSubSubCategory = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubcategory] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const storedToken = token || localStorage.getItem("token");

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
        await Swal.fire({
          title: "Error in Getting Category List",
          text: "Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: `Failed to fetch the category list. Please try again later. ${error}`,
        icon: "error",
      });
    }
  };

  // Fetch subcategories based on selected category id
  const getAllSubCategory = async (Category_id) => {
    console.log(Category_id)
    try {
      const res = await axios.post(
        `${apiUrl}/EcommerceSubcategory/GetSubCategoryThroughCategoryId?Category_Id=${Category_id}`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      if (res.data.Message.toLowerCase() === "success") {
        setSubcategory(res.data.SubCategoryList);
      }
    } catch (error) {
      await Swal.fire({
        title: "Error In Fetching SubCategory",
        text:
          "Failed to fetch the category list. Please try again later." + error,
        icon: "error",
      });
    }
  };

  // Fetch data when component mounts
  useEffect(() => {

    getCategory();
  }, []);

  // Handle form submission
  const handleSubmit = async (values, { resetForm }) => {
    console.log("Form values:", values); // Log the values to make sure they are correct
    dispatch(startLoading());
    try {
      const res = await axios.post(
        `${apiUrl}/EcommerceSubSubsubCategory/InsertSubsubCategory`,
        values,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      console.log(res.data); // Check the response
      if (res.data.Message === "SUCCESS") {
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
      console.error("Error in API call:", error); // Log the error
      await Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again later.",
        icon: "error",
      });
    } finally {
      dispatch(stopLoading());
    }
  };
  

  // Handle category selection and fetch related subcategories
  const handleCategoryChange = async (e, setFieldValue) => {
    const selectedCategory = e.target.value; // Get the selected category name
    setFieldValue("CATEGORY_NAME", selectedCategory);

    // Find the category id based on the selected category name
    const selectedCategoryId = categoryList.find(
      (category) => category.Category_Name === selectedCategory
    )?.Category_id;

    // If a valid category id is found, fetch subcategories
    if (selectedCategoryId) {
      getAllSubCategory(selectedCategoryId); // Fetch subcategories based on category id
    }
  };

  return (
    <Box marginTop="1%" className="box">
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
          Add New Sub Sub Category
        </h2>
      </Box>

      <Box mx="auto" mt={5}>
        <CardBox>
          <Formik
            initialValues={{
              SUBSUBCATEGORY_NAME: "",
              CATEGORY_NAME: "",
              SUBCATEGORY_NAME: "",
              PRIORITY: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ resetForm, setFieldValue, errors, touched }) => (
              <Form>
                <SimpleGrid
                  columns={{ base: 1, sm: 1, md: 1, lg: 2 }}
                  spacing={6}
                  alignItems="center"
                  gap={7}
                  p={5}
                >
                  {/* Sub Sub Category Name Form Control */}
                  <GridItem colSpan={{ base: 1, md: 1 }}>
                    <FormControl
                      mb={4}
                      isInvalid={
                        touched.SUBSUBCATEGORY_NAME &&
                        !!errors.SUBSUBCATEGORY_NAME
                      }
                    >
                      <FormLabel fontWeight="bold" color="gray.600">
                        Sub Sub Category Name
                      </FormLabel>
                      <Field
                        name="SUBSUBCATEGORY_NAME"
                        as={Input}
                        type="text"
                        placeholder="Enter Subsub Category"
                        focusBorderColor="blue.500"
                        size="md"
                        borderRadius="md"
                      />
                      <Text color="red.500" fontSize="sm" minHeight="20px">
                        <ErrorMessage name="SUBSUBCATEGORY_NAME" />
                      </Text>
                    </FormControl>
                  </GridItem>

                  {/* Main Category Form Control */}
                  <GridItem colSpan={{ base: 1, md: 1 }}>
                    <FormControl
                      mb={4}
                      isInvalid={touched.CATEGORY_NAME && !!errors.CATEGORY_NAME}
                    >
                      <FormLabel fontWeight="bold" color="gray.600">
                        Main Category *
                      </FormLabel>
                      <Field
                        name="CATEGORY_NAME"
                        as={Select}
                        placeholder="Select Main Category"
                        focusBorderColor="blue.500"
                        size="md"
                        onChange={(e) => handleCategoryChange(e, setFieldValue)} // Update category selection
                      >
                        {categoryList.map((category) => (
                          <option
                            key={category.Category_id}
                            value={category.Category_Name}
                          >
                            {category.Category_Name}
                          </option>
                        ))}
                      </Field>

                      <Text color="red.500" fontSize="sm" minHeight="20px">
                        <ErrorMessage name="CATEGORY_NAME" />
                      </Text>
                    </FormControl>
                  </GridItem>

                  {/* Sub Category Form Control */}
                  <GridItem colSpan={{ base: 1, md: 1 }}>
                    <FormControl
                      mb={4}
                      isInvalid={
                        touched.SUBCATEGORY_NAME && !!errors.SUBCATEGORY_NAME
                      }
                    >
                      <FormLabel>Select Sub Category</FormLabel>
                      <Field
                        name="SUBCATEGORY_NAME"
                        as={Select}
                        placeholder="Select Sub Category"
                        focusBorderColor="blue.500"
                        size="md"
                        onChange={(e) =>
                          setFieldValue("SUBCATEGORY_NAME", e.target.value)
                        }
                      >
                        {subCategoryList.map((category) => (
                          <option key={category.id} value={category.Subcategory_Name}>
                            {category.Subcategory_Name}
                          </option>
                        ))}
                      </Field>
                      <Text color="red.500" fontSize="sm" minHeight="20px">
                        <ErrorMessage name="SUBCATEGORY_NAME" />
                      </Text>
                    </FormControl>
                  </GridItem>

                  {/* Priority Form Control */}
                  <GridItem colSpan={{ base: 1, md: 1 }}>
                    <FormControl mb={4} isInvalid={touched.PRIORITY && !!errors.PRIORITY}>
                      <FormLabel fontWeight="bold" color="gray.600">
                        Priority
                      </FormLabel>
                      <Field
                        name="PRIORITY"
                        as={Select}
                        placeholder="Select priority"
                        focusBorderColor="blue.500"
                        size="md"
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Field>

                      <Text color="red.500" fontSize="sm" minHeight="20px">
                        <ErrorMessage name="PRIORITY" />
                      </Text>
                    </FormControl>
                  </GridItem>

                  {/* Submit Button */}
                  <SimpleGrid
                    colSpan={{ base: 1, md: 2 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={4}
                    mb={5}
                    mr={5}
                  >
                    <Button
                      colorScheme="gray"
                      mr={5}
                      size="lg"
                      onClick={() => resetForm()}
                      type="button"
                    >
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      bg="blue.500"
                      color="white"
                      _hover={{ bg: "blue.600" }}
                      size="lg"
                      borderRadius="md"
                      width="auto"
                    >
                      Submit
                    </Button>
                  </SimpleGrid>
                </SimpleGrid>
              </Form>
            )}
          </Formik>
        </CardBox>
      </Box>

      {/* Table Section */}
      <Box mt={5}>
        <CardBox>
          <SubSubCategoryTable />
        </CardBox>
      </Box>
    </Box>
  );
};

export default AddSubSubCategory;
