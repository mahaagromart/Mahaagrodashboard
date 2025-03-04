import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import CardBox from "../../../Component/Charts/CardBox";
import ProductListTable from "../../../Component/Table/ProductListTable";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subSubCategoryList, setSubSubCategoryList] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");

  const apiUrl = import.meta.env.VITE_API_URL;

  const getCategory = async () => {
    try {
      const res = await axios.get(`${apiUrl}Category/GetAllCategory`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
    
      if (res.data.message === "SUCCESS" && res.data.categoryList?.$values) {
        setCategoryList(res.data.categoryList.$values);
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
        text:
          error.response?.data?.message ||
          "Failed to fetch the category list. Please try again later.",
        icon: "error",
      });
    }
  };

  const fetchSubCategoryData = async (selectedCategory) => {
    if (!selectedCategory) {
      Swal.fire({
        icon: "warning",
        title: "No Category Selected",
        text: "Please select a category to load subcategories.",
      });
      return;
    }

    try {


      const res = await axios.post(
        `${apiUrl}SubCategory/GetSubCategoryThroughCategoryId`,
        { category_id: selectedCategory },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      if (res.data && res.data[0]?.dataset?.$values) {
        setSubCategoryList(res.data[0].dataset.$values);
      } else {
        throw new Error("No subcategories found");
      }
    } catch (error) {
      console.error("Error fetching subcategory data:", error);
      Swal.fire({
        icon: "error",
        title: "Error Fetching Subcategories",
        text:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong.",
      });
    }
  };
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
        setSubCategoryList(res.data.SubCategoryList);

      } else {
        await Swal.fire({
          title: "Error in Getting Sub Category List",
          text: "Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Failed to fetch the Sub category list. Please try again later.",
        icon: "error",
      });
    }
  };

  const getSubSubSubCategory = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/EcommerceSubSubsubCategory/GetAllSubsubCategory`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      if (res.data.Message.toLowerCase() === "success") {
        setSubSubCategoryList(res.data.CategoryList);
      } else {
        await Swal.fire({
          title: "Error in Getting Sub Sub Category List",
          text: "Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Failed to fetch the sub sub category list. Please try again later.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getCategory();
  

    // getSubSubSubCategory();
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
            In House Product List
          </h2>
        </Box>
        <Box>
          <CardBox>

          <SimpleGrid
              p={10}
              columns={{ base: 1, md: 1, lg: 2, "2xl": 4 }}
              gap="20px"
              mb="20px"
            >
              {/* Brand Input */}
              <CardBox>
                <FormControl mb={4}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Brand
                  </FormLabel>
                  <Select
                    placeholder="Select Brand"
                    focusBorderColor="blue.500"
                    size="md"
                  ></Select>
                </FormControl>
              </CardBox>

              <CardBox>
                <FormControl mb={4}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Category
                  </FormLabel>
                  <Select
                    placeholder="Select Main Category"
                    focusBorderColor="blue.500"
                    size="md"
                    onChange={(e) => fetchSubCategoryData(e.target.value)}

                  >
                    {categoryList.map((category) => (
                              <option
                                key={category.category_id}
                                value={category.category_id}
                                
                              >
                                {category.category_Name}
                              </option>
                            ))}
                  </Select>
                </FormControl>
              </CardBox>

              {/* Sub Category Select */}
              <CardBox>
                <FormControl mb={4}>
                  <FormLabel>Sub Category</FormLabel>
                  <Select
                    placeholder="Select Sub Category"
                    focusBorderColor="blue.500"
                    size="md"
                  >
                    {subCategoryList.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.subcategory_Name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </CardBox>

              {/* Sub Sub Category Select */}
              <CardBox>
                <FormControl mb={4}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Sub Sub Category
                  </FormLabel>
                  <Select
                    placeholder="Select Sub Sub Category"
                    focusBorderColor="blue.500"
                    size="md"
                  >
                    {subCategoryList.map((subCategory) => {
                      <option key={subCategory.id} value={subCategory.id}>
                        {subCategory.Subcategory_Name}
                      </option>;
                    })}
                  </Select>
                </FormControl>
              </CardBox>

              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                  bg="gray.300"
                  color="black"
                  size="lg"
                  border="1px"
                  borderRadius="md"
                  width="auto"
                  _hover={{ bg: "gray.400" }}
                  marginRight="5%"
                >
                  Reset
                </Button>

                <Button
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: "blue.600" }}
                  size="lg"
                  borderRadius="md"
                  width="auto"
                >
                  Submit
                </Button>
              </div>
            </SimpleGrid>
          </CardBox>
        </Box>

        <Box mt={5}>
          <CardBox>
            <ProductListTable />
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default ProductList;
