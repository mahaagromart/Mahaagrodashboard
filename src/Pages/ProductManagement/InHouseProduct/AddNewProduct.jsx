import React, { useEffect, useState , useCallback } from "react";
import {
  Box,
  SimpleGrid,
  Select,
  FormControl,
  FormLabel,
  Input,
  Button,
  Tooltip,
  Tag,
  TagLabel,
  TagCloseButton,
  Image,
  Text,
} from "@chakra-ui/react";
import CardBox from "../../../Component/Charts/CardBox";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdInfo, MdSettings } from "react-icons/md";
import Logo1 from "../../../assets/1.png";
import Logo2 from "../../../assets/2.png";
import CenterBox from "../../../Component/Charts/CenterBox";
import UploadImages from "./UploadImages";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import {startLoading, stopLoading} from "../../../redux/Features/LoadingSlice";
import { useDispatch , useSelector } from "react-redux";



const AddNewProduct = () => {

  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [showPrice, setShowPrice] = useState(false);
  const [volume, setVolume] = useState(null);
  const [showVolume, setShowVolume] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subSubCategory, setSubSubCategoryList] = useState([]);
  const [productAttribute, setProductAttribute] = useState([]);
  const getCategory = async () => {
    try {
      const res = await axios.get(`${apiUrl}Category/GetAllCategory`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      // Ensure correct response structure before updating state
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

  const getAllAttributes = async () => {
    try {
      const res = await axios.get(`${apiUrl}ProductAttribute/GetAllAttribute`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (res.data[0]?.retval === "SUCCESS" && res.data[0]?.dataset?.$values) {
        setProductAttribute(res.data[0].dataset.$values);
      } else {
        Swal.fire(
          "Error",
          "Error fetching attributes, please try again.",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        `Failed to fetch attributes. ${error.message}`,
        "error"
      );
    }
  };

  useEffect(() => {
    getCategory();
    getAllAttributes();
  }, []);

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

  const fetchSubSubCategoryData = async (selectedSubCategory) => {
    if (!selectedSubCategory) {
      Swal.fire({
        icon: "warning",
        title: "No Sub Category Selected",
        text: "Please select a sub category to load subcategories.",
      });
      return;
    }

    try {
  
      const res = await axios.post(
        `${apiUrl}SubCategory/GetSubCategoryThroughCategoryId`,
        { subcategory_id: selectedSubCategory },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );


      if (res.data && res.data[0]?.dataset?.$values) {
        setSubSubCategoryList(res.data[0].dataset.$values);
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

  // const handleShapeChange = (e) => {
  //   setShape(e.target.value);
  // };


  const initialValues = {
    productName: "",
    productDescription: "",
    category: "",
    subCategory: "",
    brand: "",
    sku: "",
    hsn: "",
    unit: "",
    mrp: "",
    tags: [],
    tagsInput: "",
    sellingPrice: "",
    minimumOrderQty: "",
    currentStockQty: "",
    discountType: "",
    discountAmount: "",
    taxCalculation: "Include",
    taxAmount: "",
    weight: "",
    shape: "",
    length: "",
    width: "",
    height: "",
    diameter: "",
    images: [],
    calculatedPrice: "",
    calculatedVolume: "",
  };
  const validationSchema = yup.object().shape({
    productName: yup.string().required("Product name is required"),
    productDescription: yup
      .string()
      .required("Product Description is required"),
    category: yup.string().required("Category is required"),
    subCategory: yup.string().required("Sub Category is required"),
    subSubCategory: yup.string().notRequired(),
    brand: yup.string().notRequired(),
    sku: yup.string().required("SKU is required"),
    hsn: yup
      .string() 
      .matches(/^\d{8}$/, "HSN must be exactly 8 digits") 
      .required("HSN is required"),
    unit: yup.string().required("Unit is required"),
    tags: yup.array().min(1, "At least one tag is required"),
    mrp: yup
      .number()
      .required("MRP is required")
      .min(0, "MRP must be positive"),
    sellingPrice: yup
      .number()
      .required("Selling Price is required")
      .min(0, "Selling Price must be positive"),
    minimumOrderQty: yup
      .number()
      .required("Minimum Order Quantity is required")
      .min(1, "Minimum Order Quantity must be at least 1"),
    currentStockQty: yup
      .number()
      .required("Current Stock Quantity is required")
      .min(0, "Current Stock Quantity must be positive"),
    discountType: yup.string().required("Please select the discount type"),
    discountAmount: yup.number().min(0, "Discount Amount must be positive"),
    discountPercentage: yup
      .number()
      .min(0, "Discount Percentage must be positive"),
    taxCalculation: yup.string().required("tax calculation is required"),
    taxAmount: yup.number().when("taxCalculation", {
      is: "Exclude", 
      then: (schema) =>
        schema
          .required("Tax Amount is required")
          .min(0, "Tax Amount must be positive"),
      otherwise: (schema) => schema.notRequired(), 
    }),
    shape: yup.string().required("Package shape is required"),
    length: yup
    .number()
    .typeError("Length must be a number")
    .transform((value) => (value === "" ? null : value)) // Converts empty string to null
    .when("shape", {
      is: "cuboid",
      then: (schema) =>
        schema.required("Length is required").min(0, "Must be positive"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  width: yup
    .number()
    .typeError("Width must be a number")
    .transform((value) => (value === "" ? null : value))
    .when("shape", {
      is: "cuboid",
      then: (schema) =>
        schema.required("Width is required").min(0, "Must be positive"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  height: yup
    .number()
    .typeError("Height must be a number")
    .transform((value) => (value === "" ? null : value))
    .when("shape", {
      is: "cuboid",
      then: (schema) =>
        schema.required("Height is required").min(0, "Must be positive"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  diameter: yup
    .number()
    .typeError("Diameter must be a number")
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .when("shape", {
      is: "cylinder",
      then: (schema) => schema.required("Diameter is required").min(0, "Must be positive"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  weight: yup
    .number()
    .typeError("Weight must be a number")
    .transform((value) => (value === "" ? null : value))
    .required("Weight is required")
    .min(0, "Must be positive"),
  });

  // const [errorFields, setErrorFields] = useState({
  //   mrp: false,
  //   sellingPrice: false,
  //   minimumOrderQty: false,
  //   currentStockQty: false,
  //   discountAmount: false,
  //   taxAmount: false,
  // });



  const calculateVolume = useCallback(({ shape, length, width, height, diameter }) => {
    if (shape === "cuboid" && length && width && height) {
      return Math.round(length * width * height);
    } 
    if (shape === "cylinder" && diameter && height) {
      const radius = diameter / 2;
      return Math.round(3.14 * Math.pow(radius, 2) * height);
    }
    return null;
  }, []);

  const handleVolumeCalculation = (values) => {
    const vol = calculateVolume(values);
    if (vol !== null) {
      setVolume(vol);
      values.calculatedVolume = volume;
      setShowVolume(true);
    }
  };

  const calculateDiscountedPrice = (values) => {
    let { sellingPrice, discountAmount, discountType, taxCalculation, taxAmount } = values;
    sellingPrice = Number(sellingPrice) || 0;
    discountAmount = Number(discountAmount) || 0;
    taxAmount = Number(taxAmount) || 0;
   
    let finalPrice = sellingPrice;
  
    // Apply Discount
    if (discountType === "Flat") {
      finalPrice -= discountAmount;
    } else if (discountType === "Percentage") {
      finalPrice -= (finalPrice * discountAmount) / 100;
    }
  
    // Apply Tax (Only if "Exclude with product" is selected)
    if (taxCalculation === "Exclude") {
      finalPrice += (finalPrice * taxAmount) / 100;
    }
  
    values.calculatedPrice = Math.round(finalPrice);
    return isNaN(finalPrice) ? 0 : Math.round(finalPrice);
  };
  
  const handlePriceCalculation = (values) => {
    const { mrp, sellingPrice, discountAmount, taxCalculation } = values;
  
    if ((mrp && sellingPrice && discountAmount >= 0) || taxCalculation) {
      setShowPrice(true);
      setPriceCalculated(true);
      let finalPrice = calculateDiscountedPrice(values);
    }
  };

  const generateCode = (setFieldValue) => {
    const newSku = "SKU" + Math.floor(Math.random() * 1000000);
    setFieldValue("sku", newSku);
  };




  const uploadImage = async (imageFile, folderType) => {
    try {
      if (!imageFile) {
        throw new Error("No image file selected");
      }
  
      const formData = new FormData();
      formData.append("Image", imageFile.originFileObj || imageFile); // Get the actual file object
      formData.append("folderType", folderType); // Append folder type
  
      console.log("Uploading Image:", imageFile.name); // Debugging
  
      const response = await axios.post(`${apiUrl}SaveFile/SaveImage`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
  
      if (response.data.success) {
        console.log("✅ Image uploaded successfully:", response.data.path);
        return response.data.path; // Return uploaded image path
      } else {
        throw new Error(response.data.message || "Image upload failed");
      }
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: error.message || "Failed to upload image",
      });
      return null;
    }
  };
  

  // const payload = {
  //   Product_Name: values.productName.toString(),
  //   PRODUCT_DESCRIPTION: values.productDescription.toString(),
  //   CATEGORY_ID: values.category.toString(),
  //   SUB_CATEGORY_ID: values.subCategory.toString(),
  //   Images: imagePath.toString(),
  //   BRAND: values.brand ? values.brand.toString() : "",
  //   sku: values.sku.toString(),
  //   UNIT: values.unit.toString(),
  //   TAGS_INPUT: values.tags || [],
  //   HSN: values.hsn ? values.hsn.toString() : "",
  //   PRICING: Number(values.sellingPrice) || 0,
  //   MAXIMUM_RETAIL_PRICE: Number(values.mrp) || 0,
  //   SELLING_PRICE: Number(values.sellingPrice) || 0,
  //   MINIMUM_ORDER_QUANTITY: Number(values.minimumOrderQty) || 0,
  //   CURRENT_STOCK_QUANTITY: Number(values.currentStockQty) || 0,
  
  //   DISCOUNT_TYPE: values.discountType ? values.discountType.toString() : "",
  //   DISCOUNT_AMOUNT: values.discountAmount.toString() || "0",
  //   TAX_AMOUNT: values.taxAmount.toString() || "",
  //   TAX_CALCULATION: values.taxCalculation.toString() || "",
  //   CALCULATED_PRICE: values.calculatedPrice.toString() || 0,

  //   PACKAGE_SHAPE: values.shape ? values.shape.toString() : "",
  //   PACKAGE_LENGTH: values.length ? values.length.toString() : "0",
  //   PACKAGE_WIDTH: values.width ? values.width.toString() : "0",
  //   PACKAGE_HEIGHT: values.height ? values.height.toString() : "0",
  //   PACKAGE_WEIGHT: Number(values.weight) || 0,
  //   PACKAGE_DIAMETER: values.diameter ? values.diameter.toString() : "0",
  //   PACKAGE_TOTAL_VOLUME: values.calculatedVolume ? values.calculatedVolume.toString() : "0",
  // };
  
  
  const submitFormData = async (values) => {
    try {
      dispatch(startLoading());
      
      let imagePath = "";
      if (values.images?.length > 0) {
        try {
          const uploadedImagePath = await uploadImage(values.images[0], "Products");
          if (!uploadedImagePath) {
            throw new Error("Image upload failed.");
          }
          imagePath = uploadedImagePath;
          values.images = [imagePath];  
        } catch (err) {
        
          Swal.fire({
            icon: "error",
            title: "Image Upload Failed",
            text: "Could not upload the image. Please try again.",
          });
          dispatch(stopLoading());
          return;
        }
      }
      

      const payload = {
        Product_Name: values.productName.toString(),
        PRODUCT_DESCRIPTION: values.productDescription.toString(),
        CATEGORY_ID: values.category.toString(),
        SUB_CATEGORY_ID: values.subCategory.toString(),
        Images: imagePath.toString(),
        BRAND: values.brand ? values.brand.toString() : "",
        sku: values.sku.toString(),
        UNIT: values.unit.toString(),
        TAGS_INPUT: values.tags || [],
        HSN: values.hsn ? values.hsn.toString() : "",
        PRICING: Number(values.sellingPrice) || 0,
        MAXIMUM_RETAIL_PRICE: Number(values.mrp) || 0,
        SELLING_PRICE: Number(values.sellingPrice) || 0,
        MINIMUM_ORDER_QUANTITY: Number(values.minimumOrderQty) || 0,
        CURRENT_STOCK_QUANTITY: Number(values.currentStockQty) || 0,
        DISCOUNT_TYPE: values.discountType ? values.discountType.toString() : "",
        DISCOUNT_AMOUNT: values.discountAmount.toString() || "0",
        TAX_AMOUNT: values.taxAmount.toString() || "",
        TAX_CALCULATION: values.taxCalculation.toString() || "",
        CALCULATED_PRICE: values.calculatedPrice.toString() || "",
        PACKAGE_SHAPE:  values.shape.toString() || "",
        PACKAGE_LENGTH:  values.length.toString() || "0",
        PACKAGE_WIDTH:  values.width.toString() || "0",
        PACKAGE_HEIGHT:  values.height.toString() || "0",
        PACKAGE_WEIGHT: Number(values.weight) || 0,
        PACKAGE_DIAMETER:  values.diameter.toString() || "0",
        PACKAGE_TOTAL_VOLUME: values.calculatedVolume.toString() || "0"
      };
      
     

      try {
        const res = await axios.post(`${apiUrl}Product/InsertProduct`, payload, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        });
   
        if (res.data[0].message === "SUCCESS" || res.data[0].code==200  ) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Product inserted successfully!",
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: res.data?.message || res.data?.[0]?.message || "Unexpected response from server",
          });
        }
      } catch (error) {
        console.error("❌ Error submitting form:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.response?.data?.message || error?.response?.data?.Message || "Failed to insert product",
        });
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
      });
    } finally {
      dispatch(stopLoading());
    }
  };
  
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          const finalPrice = calculateDiscountedPrice(values);
          values.calculatedPrice = finalPrice;
          const finalVolume = calculateVolume(values);
          values.calculatedVolume = finalVolume;
          await submitFormData(values);
          // resetForm();
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue, resetForm }) => {
          const handleKeyDown = (e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              e.stopPropagation();

              let tagInput = values.tagsInput?.trim().replace(/,$/, "");

              if (tagInput && !values.tags.includes(tagInput)) {
                setFieldValue("tags", [...values.tags, tagInput]);
                setFieldValue("tagsInput", "");
              }
            }
          };

          useEffect(() => {

            
            
            if(values.taxCalculation === 'Exclude'){
              setShowPrice(false);
            }



            if (values.shape === "cuboid") {
              setFieldValue("diameter", ""); 
            } else if (values.shape === "cylinder") {
              setFieldValue("length", "");
              setFieldValue("width", "");
              setFieldValue("height", "");
              setShowVolume(false);
            }
          }, [values.shape, setFieldValue , values.taxCalculation]);

          return (
            <Form>
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
                    Add New Product
                  </h2>
                </Box>

                <Box mx="auto" mt={2}>
                  <CardBox>
                    <Box mb={6}></Box>
                    <SimpleGrid
                      columns={{ base: 1 }}
                      spacing={6}
                      alignItems="center"
                      gap={10}
                      p={3}
                    >
                      <CardBox>
                        <FormControl mb={4}>
                          <FormLabel
                            htmlFor="productName"
                            fontWeight="bold"
                            color="gray.600"
                          >
                            Product Name
                          </FormLabel>
                          <Field
                            as={Input}
                            name="productName"
                            id="productName"
                            placeholder="Enter product name"
                            focusBorderColor="blue.500"
                            size="lg"
                            borderRadius="md"
                          />
                          <Text color="red.500" fontSize="sm" display="block">
                            <ErrorMessage name="productName" />
                          </Text>
                        </FormControl>
                      </CardBox>

                      {/* React Quill Editor */}
                      <CardBox>
                        <FormControl>
                          <FormLabel fontWeight="bold" color="gray.600">
                            Product Description
                          </FormLabel>

                          {/* Quill Editor */}
                          <Box
                            border="1px solid black"
                            borderRadius="10px"
                            padding="10px"
                            minHeight="200px"
                            marginBottom="16px"
                          >
                            <ReactQuill
                              value={values.productDescription}
                              onChange={(value) =>
                                setFieldValue("productDescription", value)
                              }
                              theme="snow"
                              modules={{
                                toolbar: [
                                  [
                                    { header: "1" },
                                    { header: "2" },
                                    { font: [] },
                                  ],
                                  [{ list: "ordered" }, { list: "bullet" }],
                                  [{ align: [] }],
                                  ["bold", "italic", "underline"],
                                  ["link", "image"],
                                  ["blockquote", "code-block"],
                                  ["clean"],
                                ],
                              }}
                              style={{
                                height: "160px",
                                resize: "vertical",
                                overflow: "auto",
                              }}
                            />
                          </Box>

                          {/* Error Message */}
                          <ErrorMessage name="productDescription">
                            {(msg) => (
                              <Text color="red.500" fontSize="sm">
                                {msg}
                              </Text>
                            )}
                          </ErrorMessage>
                        </FormControl>
                      </CardBox>

                      <CardBox>
                        <FormControl colSpan={2}>
                          <FormLabel htmlFor="tags">Product Tags</FormLabel>

                          {/* Input Field */}
                          <Input
                            type="text"
                            id="tags"
                            name="tagsInput"
                            value={values.tagsInput || ""}
                            onChange={(e) =>
                              setFieldValue("tagsInput", e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            placeholder="Enter tags and press Enter or ',' to add"
                          />

                          {/* Render Tags */}
                          <div style={{ marginTop: "10px" }}>
                            {values.tags.map((tag, index) => (
                              <Tag
                                key={index}
                                size="md"
                                marginRight="5px"
                                marginBottom="5px"
                                variant="solid"
                                colorScheme="blue"
                              >
                                <TagLabel>{tag}</TagLabel>
                                <TagCloseButton
                                  onClick={() =>
                                    setFieldValue(
                                      "tags",
                                      values.tags.filter((t) => t !== tag)
                                    )
                                  }
                                />
                              </Tag>
                            ))}
                          </div>

                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="tags" />
                          </Text>
                        </FormControl>
                      </CardBox>
                    </SimpleGrid>
                  </CardBox>
                </Box>

                <Box mt={4}>
                  <CardBox>
                    <div style={{ paddingTop: "10px" }}>
                      <span
                        style={{
                          marginLeft: "10px",
                          padding: "10px",
                          fontSize: "18px",
                          borderBottom: "1px solid Green",
                        }}
                      >
                        {" "}
                        General Setup{" "}
                      </span>
                    </div>

                    <SimpleGrid
                      columns={{ base: 1, md: 2 }}
                      spacing={6}
                      alignItems="center"
                      p={3}
                      mb={1}
                    >
                      <CardBox>
                        <FormControl>
                          <FormLabel htmlFor="category">Category</FormLabel>

                          <Field
                            as={Select}
                            name="category"
                            size="md"
                            borderRadius="md"
                            h="40px"
                            focusBorderColor="blue.500"
                            value={values.category}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              setFieldValue("category", selectedValue);
                              fetchSubCategoryData(selectedValue);
                           
                            }}
                          >
                            <option value="" disabled>
                              Select category
                            </option>
                            {categoryList.map((category) => (
                              <option
                                key={category.category_id}
                                value={category.category_id}
                                
                              >
                                {category.category_Name}
                              </option>
                            ))}
                          </Field>

                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="category" />
                          </Text>
                        </FormControl>
                      </CardBox>
                      <CardBox>
                        <FormControl>
                          <FormLabel htmlFor="subCategory">
                            Sub Category
                          </FormLabel>
                          <Field
                            as={Select}
                            name="subCategory"
                            size="md"
                            borderRadius="md"
                            h="40px"
                            focusBorderColor="blue.500"
                            value={values.subCategory}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              setFieldValue("subCategory", selectedValue);
                            }}
                          >
                            <option value="" disabled selected>
                              Select sub category
                            </option>
                            {subCategoryList.map((subCategory) => (
                              <option
                                key={subCategory.id}
                                value={subCategory.id}
                              >
                                {subCategory.subcategory_Name}
                              </option>
                            ))}
                          </Field>
                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="subCategory" />
                          </Text>
                        </FormControl>
                      </CardBox>
                      <CardBox>
                        <FormControl>
                          <FormLabel htmlFor="subSubCategory">
                            Sub Sub Category
                          </FormLabel>
                          <Field
                            as={Select}
                            name="subSubCategory"
                            size="md"
                            borderRadius="md"
                            h="40px"
                            focusBorderColor="blue.500"
                          >
                            <option value="" disabled selected>
                              Select Sub Sub category
                            </option>
                            {/* {categoryList.map((category) => (
                            <option
                              key={category.category_id}
                              value={category.category_id}
                            >
                              {category.category_Name}
                            </option>
                          ))} */}
                          </Field>
                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          ></Text>
                        </FormControl>
                      </CardBox>
                      <CardBox>
                        <FormControl>
                          <FormLabel htmlFor="brand">Brand</FormLabel>
                          <Field
                            as={Select}
                            name="brand"
                            size="md"
                            borderRadius="md"
                            h="40px"
                            focusBorderColor="blue.500"
                          >
                            <option value="" disabled selected>
                              Select sub category
                            </option>
                            {/* {categoryList.map((category) => (
                            <option
                              key={category.category_id}
                              value={category.category_id}
                            >
                              {category.category_Name}
                            </option>
                          ))} */}
                          </Field>
                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          ></Text>
                        </FormControl>
                      </CardBox>

                      <CardBox>
                        <FormControl>
                          <FormLabel
                            htmlFor="sku"
                            display="flex"
                            alignItems="center"
                          >
                            Product SKU{" "}
                            <Tooltip
                              label="Create a unique product code by clicking on the 'Generate Code' button"
                              aria-label="Info Tooltip"
                              hasArrow
                              placement="top"
                              style={{ marginLeft: "10% !important" }}
                            >
                              <span style={{ cursor: "pointer" }}>
                                <MdInfo />
                              </span>
                            </Tooltip>
                            <Button
                              size="sm"
                              colorScheme="blue"
                              onClick={() => generateCode(setFieldValue)}
                              style={{ marginLeft: "10%" }}
                            >
                              Generate Code
                            </Button>
                          </FormLabel>

                          <Field
                            as={Input}
                            name="sku"
                            id="sku"
                            placeholder="Click 'Generate Code'"
                            focusBorderColor="blue.500"
                            size="md"
                            borderRadius="md"
                            readOnly
                          />
                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="sku" />
                          </Text>
                        </FormControl>
                      </CardBox>
                      <CardBox>
                        <FormControl>
                          <FormLabel
                            htmlFor="hsn"
                            display="flex"
                            alignItems="center"
                            maxLength={8}
                            marginTop={2}
                          >
                            HSN Code
                            <Tooltip
                              label="Enter the Harmonized System of Nomenclature."
                              aria-label="Info Tooltip"
                              hasArrow
                              placement="top"
                              style={{ marginLeft: "10% !important" }}
                            >
                              <span
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                <MdInfo />
                              </span>
                            </Tooltip>
                          </FormLabel>
                          <Field
                            as={Input}
                            name="hsn"
                            id="hsn"
                            onChange={(e) => {
                              const value = e.target.value.trim();
                              setFieldValue("hsn", value);
                            }}
                          />
                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="hsn" />
                          </Text>
                        </FormControl>
                      </CardBox>
                      <CardBox>
                        <FormControl>
                          <FormLabel htmlFor="unit">Unit</FormLabel>
                          <Field
                            as={Select}
                            name="unit"
                            size="md"
                            borderRadius="md"
                            h="40px"
                            focusBorderColor="blue.500"
                          >
                            <option value="" disabled>
                              Select Unit
                            </option>

                            {productAttribute.map((attribut) => (
                              <option key={attribut.id} value={attribut.id}>
                                {attribut.attribute_Name}
                              </option>
                            ))}
                          </Field>

                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="unit" />
                          </Text>
                        </FormControl>
                      </CardBox>
                    </SimpleGrid>
                  </CardBox>
                </Box>
                <Box>
                  <CardBox>
                    <div style={{ paddingTop: "10px" }}>
                      <span
                        style={{
                          marginLeft: "10px",
                          padding: "10px",
                          fontSize: "18px",
                          borderBottom: "1px solid Green",
                        }}
                      >
                        Pricing & others
                      </span>
                    </div>

                    <SimpleGrid
                      columns={{ base: 1, md: 2, lg: 2, "2xl": 4 }}
                      spacing={6}
                      alignItems="center"
                      p={3}
                      mb={1}
                      pb={10}
                    >
                      {/* MRP */}
                      <CardBox>
                        <FormControl>
                          <FormLabel
                            htmlFor="mrp"
                            display="flex"
                            alignItems="center"
                          >
                            MRP ₹{" "}
                            <Tooltip
                              label="Add the purchase price for this product"
                              aria-label="Info Tooltip"
                              hasArrow
                              placement="top"
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                <MdInfo />
                              </span>
                            </Tooltip>
                          </FormLabel>
                          <Field
                            as={Input}
                            name="mrp"
                            id="mrp"
                            focusBorderColor="blue.500"
                            size="md"
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9.]/g, "");
                              if ((value.match(/\./g) || []).length > 1) return;
                              setFieldValue("mrp", value);
                            }}
                            onBlur={(e) => {
                              const finalValue = parseFloat(e.target.value) || "";
                              setFieldValue("mrp", finalValue);
                            }}
                          />
                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="mrp" />
                          </Text>
                        </FormControl>
                      </CardBox>

                      {/* Selling Price */}
                      <CardBox>
                        <FormControl>
                          <FormLabel
                            htmlFor="sellingPrice"
                            display="flex"
                            alignItems="center"
                          >
                            Selling Price ₹{" "}
                            <Tooltip
                              label="Add the selling price for this product"
                              aria-label="Info Tooltip"
                              hasArrow
                              placement="top"
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                <MdInfo />
                              </span>
                            </Tooltip>
                          </FormLabel>

                          <Field
                            as={Input}
                            name="sellingPrice"
                            id="sellingPrice"
                            focusBorderColor="blue.500"
                            size="md"
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9.]/g, "");
                              if ((value.match(/\./g) || []).length > 1) return;
                              setFieldValue("sellingPrice", value);
                            }}
                            onBlur={(e) => {
                              const finalValue = parseFloat(e.target.value) || "";
                              setFieldValue("sellingPrice", finalValue);
                            }}
                          />

                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="sellingPrice" />
                          </Text>
                        </FormControl>
                      </CardBox>

                      {/* Minimum Order Qty */}
                      <CardBox>
                        <FormControl>
                          <FormLabel
                            htmlFor="minimumOrderQty"
                            display="flex"
                            alignItems="center"
                          >
                            Minimum Order Qty{" "}
                            <Tooltip
                              label="Set the min order quantity that customer must choose"
                              aria-label="Info Tooltip"
                              hasArrow
                              placement="top"
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                <MdInfo />
                              </span>
                            </Tooltip>
                          </FormLabel>

                          <Field
                            as={Input}
                            name="minimumOrderQty"
                            id="minimumOrderQty"
                            focusBorderColor="blue.500"
                            size="md"
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9.]/g, "");
                              if ((value.match(/\./g) || []).length > 1) return;
                              setFieldValue("minimumOrderQty", value);
                            }}
                            onBlur={(e) => {
                              const finalValue = parseFloat(e.target.value) || "";
                              setFieldValue("minimumOrderQty", finalValue);
                            }}
                          />

                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="minimumOrderQty" />
                          </Text>
                        </FormControl>
                      </CardBox>

                      {/* Current Stock Qty */}
                      <CardBox>
                        <FormControl>
                          <FormLabel
                            htmlFor="currentStockQty"
                            display="flex"
                            alignItems="center"
                          >
                            Current Stock Qty{" "}
                            <Tooltip
                              label="Set the current stock quantity available"
                              aria-label="Info Tooltip"
                              hasArrow
                              placement="top"
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                <MdInfo />
                              </span>
                            </Tooltip>
                          </FormLabel>


                          <Field
                            as={Input}
                            name="currentStockQty"
                            id="currentStockQty"
                            focusBorderColor="blue.500"
                            size="md"
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9.]/g, "");
                              if ((value.match(/\./g) || []).length > 1) return;
                              setFieldValue("currentStockQty", value);
                            }}
                            onBlur={(e) => {
                              const finalValue = parseFloat(e.target.value) || "";
                              setFieldValue("currentStockQty", finalValue);
                            }}
                          />
                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="currentStockQty" />
                          </Text>
                        </FormControl>
                      </CardBox>

                      {/* Discount Type */}
                      <CardBox>
                        <FormControl>
                          <FormLabel
                            htmlFor="discountType"
                            display="flex"
                            alignItems="center"
                          >
                            Discount Type{" "}
                            <Tooltip
                              label="Select Flat or Percentage discount"
                              aria-label="Info Tooltip"
                              hasArrow
                              placement="top"
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                <MdInfo />
                              </span>
                            </Tooltip>
                          </FormLabel>

                          <Field
                            as={Select}
                            name="discountType"
                            id="discountType"
                            focusBorderColor="blue.500"
                            size="md"
                            borderRadius="md"
                            onChange={(e) => {
                              setFieldValue("discountType", e.target.value);
                            }}
                          >
                            <option value="" disabled>
                              Select Discount Type
                            </option>
                            <option value="Flat">Flat</option>
                            <option value="Percentage">Percentage</option>
                          </Field>

                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="discountType" />
                          </Text>
                        </FormControl>
                      </CardBox>

                      <CardBox>
                        <FormControl>
                          <FormLabel
                            htmlFor="discountAmount"
                            display="flex"
                            alignItems="center"
                          >
                            Discount{" "}
                            {values.discountType === "Flat" ? "₹" : "%"}{" "}
                            <Tooltip
                              label="If 'Flat', enter the amount. If 'Percentage', enter percentage."
                              aria-label="Info Tooltip"
                              hasArrow
                              placement="top"
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                <MdInfo />
                              </span>
                            </Tooltip>
                          </FormLabel>      
                          <Field
                            as={Input}
                            name="discountAmount"
                            id="discountAmount"
                            focusBorderColor="blue.500"
                            size="md"
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9.]/g, "");
                              if ((value.match(/\./g) || []).length > 1) return;
                              setFieldValue("discountAmount", value);
                            }}
                            onBlur={(e) => {
                              const finalValue = parseFloat(e.target.value) || "";
                              setFieldValue("discountAmount", finalValue);
                            }}
                          />

                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="discountAmount" />
                          </Text>
                        </FormControl>
                      </CardBox>

                      <CardBox>
                        <FormControl>
                          <FormLabel
                            htmlFor="taxCalculation"
                            display="flex"
                            alignItems="center"
                          >
                            Tax Calculation{" "}
                            <Tooltip
                              label="If Included, the price will remain the same after the discount. If Excluded, tax will be added after the discount."
                              aria-label="Info Tooltip"
                              hasArrow
                              placement="top"
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                <MdInfo />
                              </span>
                            </Tooltip>
                          </FormLabel>

                          <Field
                            as={Select}
                            name="taxCalculation"
                            id="taxCalculation"
                            onChange={(e) => {
                              setFieldValue("taxCalculation", e.target.value);
                            }}
                          >
                            <option value="" disabled hidden>
                              Select Tax Calculation
                            </option>
                            <option value="Include">
                              Include with product
                            </option>
                            <option value="Exclude">
                              Exclude with product
                            </option>
                          </Field>

                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="taxCalculation" />
                          </Text>
                        </FormControl>
                      </CardBox>

                      {/* Tax Amount */}
                      <CardBox>
                        {values.taxCalculation === "Exclude" && (
                          <FormControl>
                            <FormLabel
                              htmlFor="taxAmount"
                              display="flex"
                              alignItems="center"
                            >
                              Tax Amount (%){" "}
                              <Tooltip
                                label="Set the Tax Amount."
                                aria-label="Info Tooltip"
                                hasArrow
                                placement="top"
                              >
                                <span
                                  style={{
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <MdInfo />
                                </span>
                              </Tooltip>
                            </FormLabel>      
                          <Field
                            as={Input}
                            name="taxAmount"
                            id="taxAmount"
                            focusBorderColor="blue.500"
                            size="md"
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9.]/g, "");
                              if ((value.match(/\./g) || []).length > 1) return;
                              setFieldValue("taxAmount", value);
                            }}
                            onBlur={(e) => {
                              const finalValue = parseFloat(e.target.value) || "";
                              setFieldValue("taxAmount", finalValue);
                            }}
                          />

                            <Text
                              color="red.500"
                              fontSize="sm"
                              minH="20px"
                              display="block"
                            >
                              <ErrorMessage name="taxAmount" />
                            </Text>
                          </FormControl>
                        )}
                      </CardBox>

                      <CardBox>
                        <Box mt={8}>
                          <Button
                            onClick={() => handlePriceCalculation(values)}
                          >
                            Calculate Price
                          </Button>
                        </Box>
                      </CardBox>
                      {/* Conditionally render price and buttons */}
                      {showPrice && (
                        <CardBox>
                          <Box mt={6}>
                            <span style={{ fontWeight: "bold" }}>
                              Final Price: ₹{" "}
                              {calculateDiscountedPrice(values).toFixed(2)}
                            </span>
                          </Box>
                        </CardBox>
                      )}

                      {/* Calculate Button */}
                    </SimpleGrid>
                  </CardBox>
                </Box>

                <Box>
                  <CardBox>
                    <div style={{ paddingTop: "10px" }}>
                      <span
                        style={{
                          marginLeft: "10px",
                          padding: "10px",
                          fontSize: "18px",
                          borderBottom: "1px solid Green",
                        }}
                      >
                        {" "}
                        Logistic Setup{" "}
                      </span>
                    </div>

                    <SimpleGrid
                      columns={{ base: 1, md: 2, lg: 2 }}
                      spacing={6}
                      alignItems="center"
                      p={3}
                      pb={10}
                    >
                      {/* CardBox for Image */}
                      <CardBox>
                        <CenterBox>
                          <Image
                            src={Logo1}
                            maxW={{ base: "50%", md: "70%", lg: "50%" }}
                            objectFit="contain"
                            alt="Logo"
                          />
                        </CenterBox>
                      </CardBox>

                      <CardBox>
                        <CenterBox>
                          <Image
                            src={Logo2}
                            maxW={{ base: "50%", md: "70%", lg: "50%" }}
                            objectFit="contain"
                            alt="Logo"
                          />
                        </CenterBox>
                      </CardBox>
                    </SimpleGrid>

                    <SimpleGrid
                      columns={{ base: 1, md: 2, lg: 4 }}
                      spacing={6}
                      alignItems="center"
                      p={3}
                      pb={10}
                    >
                      {/* Shipping Details */}
                      <CardBox>
                        <FormControl>
                          <FormLabel
                            htmlFor="shape"
                            display="flex"
                            alignItems="center"
                          >
                            Package Shape
                            <Tooltip
                              label="Select the shape of the package."
                              aria-label="Info Tooltip"
                              hasArrow
                              placement="top"
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                <MdInfo />
                              </span>
                            </Tooltip>
                          </FormLabel>

                          <Field
                            as={Select}
                            name="shape"
                            id="shape"
                            focusBorderColor="blue.500"
                            size="md"
                            borderRadius="md"
                            onChange={(e) => {
                              setFieldValue("shape", e.target.value);
                            }}
                          >
                            <option value="">Select Shape</option>
                            <option value="cuboid">Cuboid</option>
                            <option value="cylinder">Cylinder</option>
                          </Field>

                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="shape" />
                          </Text>
                        </FormControl>
                      </CardBox>

                      {/* Fields for Cuboid */}
                      {values.shape === "cuboid" && (
                        <>
                          <CardBox>
                            <FormControl>
                              <FormLabel
                                htmlFor="length"
                                display="flex"
                                alignItems="center"
                              >
                                Length (cm)
                                <Tooltip
                                  label="Enter the package length in cm."
                                  aria-label="Info Tooltip"
                                  hasArrow
                                  placement="top"
                                >
                                  <span
                                    style={{
                                      marginLeft: "10px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <MdInfo />
                                  </span>
                                </Tooltip>
                              </FormLabel>

                              <Field
                            as={Input}
                            name="length"
                            id="length"
                            focusBorderColor="blue.500"
                            size="md"
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9.]/g, "");
                              if ((value.match(/\./g) || []).length > 1) return;
                              setFieldValue("length", value);
                            }}
                            onBlur={(e) => {
                              const finalValue = parseFloat(e.target.value) || "";
                              setFieldValue("length", finalValue);
                            }}
                          />
                              <Text
                                color="red.500"
                                fontSize="sm"
                                minH="20px"
                                display="block"
                              >
                                <ErrorMessage name="length" />
                              </Text>
                            </FormControl>
                          </CardBox>

                          <CardBox>
                            <FormLabel
                              htmlFor="width"
                              display="flex"
                              alignItems="center"
                            >
                              Width (cm)
                              <Tooltip
                                label="Enter the package width in cm."
                                aria-label="Info Tooltip"
                                hasArrow
                                placement="top"
                              >
                                <span
                                  style={{
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <MdInfo />
                                </span>
                              </Tooltip>
                            </FormLabel>

                            <Field
                            as={Input}
                            name="width"
                            id="width"
                            focusBorderColor="blue.500"
                            size="md"
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9.]/g, "");
                              if ((value.match(/\./g) || []).length > 1) return;
                              setFieldValue("width", value);
                            }}
                            onBlur={(e) => {
                              const finalValue = parseFloat(e.target.value) || "";
                              setFieldValue("width", finalValue);
                            }}
                          />
                            <Text
                              color="red.500"
                              fontSize="sm"
                              minH="20px"
                              display="block"
                            >
                              <ErrorMessage name="width" />
                            </Text>
                          </CardBox>
                        </>
                      )}

                      {/* Field for Cylinder */}
                      {values.shape === "cylinder" && (
                        <CardBox>
                          <FormLabel
                            htmlFor="diameter"
                            display="flex"
                            alignItems="center"
                          >
                            Diameter (cm)
                            <Tooltip
                              label="Enter the diameter of the package."
                              aria-label="Info Tooltip"
                              hasArrow
                              placement="top"
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                <MdInfo />
                              </span>
                            </Tooltip>
                          </FormLabel>

                          <Field
                            as={Input}
                            name="diameter"
                            id="diameter"
                            focusBorderColor="blue.500"
                            size="md"
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9.]/g, "");
                              if ((value.match(/\./g) || []).length > 1) return;
                              setFieldValue("diameter", value);
                            }}
                            onBlur={(e) => {
                              const finalValue = parseFloat(e.target.value) || "";
                              setFieldValue("diameter", finalValue);
                            }}
                          />
                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="diameter" />
                          </Text>
                        </CardBox>
                      )}



                <CardBox>
                            <FormControl>
                            <FormLabel
                              htmlFor="height"
                              display="flex"
                              alignItems="center"
                            >
                              Height (cm)
                              <Tooltip
                                label="Enter the package height in cm."
                                aria-label="Info Tooltip"
                                hasArrow
                                placement="top"
                              >
                                <span
                                  style={{
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <MdInfo />
                                </span>
                              </Tooltip>
                            </FormLabel>

                            <Field
                            as={Input}
                            name="height"
                            id="height"
                            focusBorderColor="blue.500"
                            size="md"
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9.]/g, "");
                              if ((value.match(/\./g) || []).length > 1) return;
                              setFieldValue("height", value);
                            }}
                            onBlur={(e) => {
                              const finalValue = parseFloat(e.target.value) || "";
                              setFieldValue("height", finalValue);
                            }}
                          />
                            <Text
                              color="red.500"
                              fontSize="sm"
                              minH="20px"
                              display="block"
                            >
                              <ErrorMessage name="height" />
                            </Text>
                            </FormControl>
                          </CardBox>


                      {/* Weight */}
                      <CardBox>
                        <FormControl>
                          <FormLabel
                            htmlFor="weight"
                            display="flex"
                            alignItems="center"
                          >
                            Weight (gram)
                            <Tooltip
                              label="Enter the package weight in grams."
                              aria-label="Info Tooltip"
                              hasArrow
                              placement="top"
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                <MdInfo />
                              </span>
                            </Tooltip>
                          </FormLabel>

                         
                          <Field
                            as={Input}
                            name="weight"
                            id="weight"
                            focusBorderColor="blue.500"
                            size="md"
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9.]/g, "");
                              if ((value.match(/\./g) || []).length > 1) return;
                              setFieldValue("weight", value);
                            }}
                            onBlur={(e) => {
                              const finalValue = parseFloat(e.target.value) || "";
                              setFieldValue("weight", finalValue);
                            }}
                          />

                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          >
                            <ErrorMessage name="weight" />
                          </Text>
                        </FormControl>
                      </CardBox>

                      {/* Volume Calculation Button */}
                      <CardBox>
                        <Box mt={3}>
                        <Button onClick={() => handleVolumeCalculation(values)}>Calculate Volume</Button>
                        </Box>
                      </CardBox>

                        {/* Sanjeev */}
                      {/* Display Volume */}
                      {showVolume && volume !== null && (
                        
                        <CardBox>
                          <Box mt={6}>
                            <span style={{ fontWeight: "bold" }}>
                            <strong>Calculated Volume: {volume} cm³</strong>
                            </span>
                          </Box>
                        </CardBox>
                      )}
                    </SimpleGrid>
                  </CardBox>
                </Box>

                <Box>
                  <CardBox>
                    <div style={{ paddingTop: "10px" }}>
                      <span
                        style={{
                          marginLeft: "10px",
                          padding: "10px",
                          fontSize: "18px",
                          borderBottom: "1px solid Green",
                        }}
                      >
                        {" "}
                        Image Setup{" "}
                      </span>
                    </div>
                    <SimpleGrid
                      columns={{ base: 1, md: 2 }}
                      spacing={6}
                      alignItems="center"
                      p={3}
                      pb={10}
                      mt={10}
                    >
                      <UploadImages
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                    </SimpleGrid>

                    <SimpleGrid
                      colSpan={{ base: 1, md: 2 }}
                      display="flex"
                      justifyContent="start"
                      alignItems="center"
                      gap={6}
                      p={5}
                    >
                      {/* Reset Button */}
                      <Button
                        colorScheme="gray"
                        mr={5}
                        size="lg"
                        onClick={() => resetForm()}
                        type="button"
                      >
                        Reset
                      </Button>

                      {/* Submit Button */}
                      <Button
                        bg="blue.500"
                        color="white"
                        _hover={{ bg: "blue.600" }}
                        size="lg"
                        borderRadius="md"
                        width="auto"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </SimpleGrid>
                  </CardBox>
                </Box>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddNewProduct;
