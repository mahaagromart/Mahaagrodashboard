import React, { useEffect, useState, useCallback } from "react";
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
  GridItem,
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
import {
  startLoading,
  stopLoading,
} from "../../../redux/Features/LoadingSlice";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "antd";

const AddNewProduct = () => {
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [showPrice, setShowPrice] = useState(false);
  const [volume, setVolume] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subSubCategoryList, setSubSubCategoryList] = useState([]);
  const [productAttribute, setProductAttribute] = useState([]);
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
        title: "No SubCategory Selected",
        text: "Please select a Sub category to load sub-subcategories.",
      });
      return;
    }

    try {
      const res = await axios.post(
        `${apiUrl}SubsubCategory/GetSubSubCategoryBySubCategoryId`,
        { id: selectedSubCategory },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

   

      if (res.data[0].message === "SUCCESS") {
        setSubSubCategoryList(res.data[0].dataset.$values);
      } else {
        throw new Error("No sub-subcategories found");
      }
    } catch (error) {
      console.error("Error fetching sub-subcategory data:", error);
      // Swal.fire({
      //   icon: "error",
      //   title: "Error Fetching Sub-Subcategories",
      //   text:
      //     error.response?.data?.message ||
      //     error.message ||
      //     "Something went wrong.",
      // });
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
    subSubCategory: "",
    brand: "",
    tags: [],
    tagsInput: "",
    varients: [],
    varientsInput: "",
    varientsData: [],
    images: ""
  };

  // sku: yup.string().required("SKU is required"),
  // hsn: yup
  //   .string()
  //   .matches(/^\d{8}$/, "HSN must be exactly 8 digits")
  //   .required("HSN is required"),
  // unit: yup.string().required("Unit is required"),
  // tags: yup.array().min(1, "At least one tag is required"),
  // mrp: yup
  //   .number()
  //   .required("MRP is required")
  //   .min(0, "MRP must be positive"),
  // sellingPrice: yup
  //   .number()
  //   .required("Selling Price is required")
  //   .min(0, "Selling Price must be positive"),
  // minimumOrderQty: yup
  //   .number()
  //   .required("Minimum Order Quantity is required")
  //   .min(1, "Minimum Order Quantity must be at least 1"),
  // currentStockQty: yup
  //   .number()
  //   .required("Current Stock Quantity is required")
  //   .min(0, "Current Stock Quantity must be positive"),
  // discountType: yup.string().required("Please select the discount type"),
  // discountAmount: yup.number().min(0, "Discount Amount must be positive"),
  // discountPercentage: yup
  //   .number()
  //   .min(0, "Discount Percentage must be positive"),
  // taxCalculation: yup.string().required("tax calculation is required"),

  // shape: yup.string().required("Package shape is required"),
  // length: yup
  //   .number()
  //   .typeError("Length must be a number")
  //   .transform((value) => (value === "" ? null : value))
  //   .when("shape", {
  //     is: "cuboid",
  //     then: (schema) =>
  //       schema.required("Length is required").min(0, "Must be positive"),
  //     otherwise: (schema) => schema.notRequired().nullable(),
  //   }),

  // width: yup
  //   .number()
  //   .typeError("Width must be a number")
  //   .transform((value) => (value === "" ? null : value))
  //   .when("shape", {
  //     is: "cuboid",
  //     then: (schema) =>
  //       schema.required("Width is required").min(0, "Must be positive"),
  //     otherwise: (schema) => schema.notRequired().nullable(),
  //   }),

  // height: yup
  //   .number()
  //   .typeError("Height must be a number")
  //   .transform((value) => (value === "" ? null : value))
  //   .when("shape", {
  //     is: "cuboid",
  //     then: (schema) =>
  //       schema.required("Height is required").min(0, "Must be positive"),
  //     otherwise: (schema) => schema.notRequired().nullable(),
  //   }),

  // diameter: yup
  //   .number()
  //   .typeError("Diameter must be a number")
  //   .transform((value) => (value === "" ? null : value))
  //   .nullable()
  //   .when("shape", {
  //     is: "cylinder",
  //     then: (schema) =>
  //       schema.required("Diameter is required").min(0, "Must be positive"),
  //     otherwise: (schema) => schema.notRequired().nullable(),
  //   }),

  // weight: yup
  //   .number()
  //   .typeError("Weight must be a number")
  //   .transform((value) => (value === "" ? null : value))
  //   .required("Weight is required")
  //   .min(0, "Must be positive"),
  const validationSchema = yup.object().shape({
    productName: yup.string().required("Product name is required"),
    productDescription: yup
      .string()
      .required("Product Description is required"),
    category: yup.string().required("Category is required"),
    subCategory: yup.string().required("Sub Category is required"),
    subSubCategory: yup.string().notRequired(),
    brand: yup.string().notRequired(),
    unit : yup.string().required(),
    varients: yup
    .array()
    .of(yup.string().required("Each variant must be a valid string"))
    .min(1, "At least one variant is required"),
    varientsData: yup.array().of(
      yup.object().shape({
        variantName: yup.string().required("Variant Name is required"),
        sku: yup.string().required("SKU is required"),
        hsn: yup.string().matches(/^\d{8}$/, "HSN must be exactly 8 digits"),
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

        discountType: yup
          .string()
          .required("Discount Type is required")
          .oneOf(["Flat", "Percentage"], "Invalid Discount Type"),
        discountAmount: yup.number().when("discountType", {
          is: (val) => val === "Flat" || val === "Percentage",
          then: (schema) => schema.required("Discount Amount is required"),
          otherwise: (schema) => schema.notRequired(),
        }),
        discountPercentage: yup
          .number()
          .min(0, "Discount Percentage must be positive"),

        taxAmount: yup.number().when("taxCalculation", {
          is: "Exclude",
          then: (schema) =>
            schema
              .required("Tax Amount is required")
              .min(0, "Tax Amount must be positive"),
          otherwise: (schema) => schema.notRequired().nullable(),
        }),

        // **Logistic Setup Validation**
        shape: yup.string().required("Shape is required"),
        length: yup.number().when("shape", {
          is: "cuboid",
          then: (schema) =>
            schema
              .min(1, "Length must be greater than 0")
              .required("Length is required"),
        }),
        width: yup.number().when("shape", {
          is: "cuboid",
          then: (schema) =>
            schema
              .min(1, "Width must be greater than 0")
              .required("Width is required"),
        }),
        height: yup
          .number()
          .min(1, "Height must be greater than 0")
          .required("Height is required"),
        diameter: yup.number().when("shape", {
          is: "cylinder",
          then: (schema) =>
            schema
              .min(1, "Diameter must be greater than 0")
              .required("Diameter is required"),
        }),
        weight: yup
          .number()
          .min(1, "Weight must be greater than 0")
          .required("Weight is required"),
      })
    ),
  });

  const handleVolumeCalculation = (index, values) => {
    const variant = values.varientsData[index];

    if (
      (variant.shape === "cuboid" &&
        variant.length &&
        variant.width &&
        variant.height) ||
      (variant.shape === "cylinder" && variant.diameter && variant.height)
    ) {
      setShowVolume((prev) => ({ ...prev, [index]: true }));
    }
  };

  // Calculate Volume
  const calculateVolume = (variant) => {
    if (!variant) return 0; // Prevent undefined errors

    let { shape, length, width, height, diameter } = variant;

    length = Number(length) || 0;
    width = Number(width) || 0;
    height = Number(height) || 0;
    diameter = Number(diameter) || 0;

    let volume = 0;

    if (shape === "cuboid" && length && width && height) {
      volume = length * width * height;
    } else if (shape === "cylinder" && diameter && height) {
      const radius = diameter / 2;
      volume = Math.PI * Math.pow(radius, 2) * height;
    }

    return isNaN(volume) ? 0 : Math.round(volume);
  };

  // const calculateDiscountedPrice = (values) => {
  //   let {
  //     sellingPrice,
  //     discountAmount,
  //     discountType,
  //     taxCalculation,
  //     taxAmount,
  //   } = values;
  //   sellingPrice = Number(sellingPrice) || 0;
  //   discountAmount = Number(discountAmount) || 0;
  //   taxAmount = Number(taxAmount) || 0;

  //   let finalPrice = sellingPrice;

  //   // Apply Discount
  //   if (discountType === "Flat") {
  //     finalPrice -= discountAmount;
  //   } else if (discountType === "Percentage") {
  //     finalPrice -= (finalPrice * discountAmount) / 100;
  //   }

  //   // Apply Tax (Only if "Exclude with product" is selected)
  //   if (taxCalculation === "Exclude") {
  //     finalPrice += (finalPrice * taxAmount) / 100;
  //   }

  //   values.calculatedPrice = Math.round(finalPrice);
  //   return isNaN(finalPrice) ? 0 : Math.round(finalPrice);
  // };

  // const handlePriceCalculation = (values) => {
  //   const { mrp, sellingPrice, discountAmount, taxCalculation } = values;

  //   if ((mrp && sellingPrice && discountAmount >= 0) || taxCalculation) {
  //     setShowPrice(true);

  //     let finalPrice = calculateDiscountedPrice(values);
  //   }
  // };

  const calculateDiscountedPrice = (variant) => {
    let {
      sellingPrice,
      discountAmount,
      discountType,
      taxCalculation,
      taxAmount,
    } = variant;

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

    return isNaN(finalPrice) ? 0 : Math.round(finalPrice);
  };

  // Handle Price Calculation for a specific variant
  const handlePriceCalculation = (index, values) => {
    const variant = values.varientsData[index];

    if (
      (variant.mrp && variant.sellingPrice && variant.discountAmount >= 0) ||
      variant.taxCalculation
    ) {
      setShowPrice((prev) => ({ ...prev, [index]: true }));
    }
  };

  const generateCode = (variantIndex, setFieldValue) => {
    const newSku = "SKU" + Math.floor(Math.random() * 1000000);
    setFieldValue(`varientsData[${variantIndex}].sku`, newSku);
  };

  const handleRemoveVariant = (variantName, values, setFieldValue) => {
    // Ensure values and setFieldValue are available
    setFieldValue(
      "varientsData",
      values.varientsData.filter(
        (variant) => variant.variantName !== variantName
      )
    );
  };

  const uploadImage = async (imageFile, folderType) => {
    try {
      if (!imageFile) {
        throw new Error("No image file selected");
      }

      const formData = new FormData();
      formData.append("Image", imageFile.originFileObj || imageFile);
      formData.append("folderType", folderType);

      console.log("Uploading Image:", imageFile.name);

      const response = await axios.post(
        `${apiUrl}SaveFile/SaveImage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        return response.data.path;
      } else {
        throw new Error(response.data.message || "Image upload failed");
      }
    } catch (error) {
      console.error(" Error uploading image:", error);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: error.message || "Failed to upload image",
      });
      return null;
    }
  };

  const handleNumericInput = (e, field, setFieldValue) => {
    let value = e.target.value.replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    if ((value.match(/\./g) || []).length > 1) return;

    // Set the field value in Formik
    setFieldValue(field, value);
  };

  const submitFormData = async (values) => {
    try {
      dispatch(startLoading());
  
      for (let i = 0; i < values.varientsData.length; i++) {
        let variant = values.varientsData[i];
  
       
        let imagePathString = "";
        if (variant.images?.length > 0) {
          try {
            let uploadedImagePaths = [];
            for (const image of variant.images) {
              const uploadedImagePath = await uploadImage(image, "Products");
              if (!uploadedImagePath) {
                throw new Error("Image upload failed.");
              }
              uploadedImagePaths.push(uploadedImagePath);
            }
            imagePathString = uploadedImagePaths.join(",");
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "Image Upload Failed",
              text: "Could not upload one or more images. Please try again.",
            });
            dispatch(stopLoading());
            return;
          }
        }
  
        // // ✅ Step 2: Prepare API Payload
        // let payload = {
        //   productName: values.productName,
        //   productDescription: values.productDescription,
        //   category: values.category,
        //   subCategory: values.subCategory,
        //   subSubCategory : values.subSubCategory,
        //   brand: values.brand,
        //   variantName: variant.variantName,
        //   sku: variant.sku,
        //   hsn: variant.hsn,
        //   unit: variant.unit,
        //   mrp: variant.mrp,
        //   sellingPrice: variant.sellingPrice,
        //   minimumOrderQty: variant.minimumOrderQty,
        //   currentStockQty: variant.currentStockQty,
        //   discountType: variant.discountType,
        //   discountAmount: variant.discountAmount,
        //   taxCalculation: variant.taxCalculation,
        //   taxAmount: variant.taxAmount,
        //   shape: variant.shape,
        //   length: variant.length,
        //   width: variant.width,
        //   height: variant.height,
        //   diameter: variant.diameter,
        //   weight: variant.weight,
        //   calculatedVolume: variant.calculatedVolume,
        //   calculatedPrice: variant.calculatedPrice,
        //   minimumCalculatePrice : variant.calculatedPrice*variant.minimumOrderQty,
        //   images: imagePathString, 
        // };

        debugger

        let payload = {

          CATEGORY_ID: values.category.toString(),
          SUB_CATEGORY_ID: values.subCategory.toString(),
          SUB_SUB_CATEGORY_ID : values.subSubCategory.toString() || "",
          Product_Name: values.productName.toString(),
          Product_Description: values.productDescription.toString(),
          Images: imagePathString.toString(),
          BRAND: values.brand.toString() || "",
          sku: variant.sku.toString(),
          UNIT: values.unit.toString()  || "",
          TAGS_INPUT: values.tags || [],  // Assuming tags input comes from values
          HSN: variant.hsn.toString(),
      
          // Pricing
          PRICING: Number(variant.mrp),  // Assuming PRICING is equivalent to MRP
          MAXIMUM_RETAIL_PRICE: Number(variant.mrp),
          SELLING_PRICE: Number(variant.sellingPrice),
          MINIMUM_ORDER_QUANTITY: Number(variant.minimumOrderQty),
          CURRENT_STOCK_QUANTITY: Number(variant.currentStockQty),
          CALCULATED_MINIMUM_ORDER_PRICE : Number(variant.minimumOrderQty*variant.calculatedPrice).toString(),

          // Logistics
          PACKAGE_WEIGHT: Number(variant.weight),
          PACKAGE_SHAPE: variant.shape.toString() ,
          PACKAGE_LENGTH: variant.length.toString() || "",
          PACKAGE_WIDTH: variant.width.toString() || "",
          PACKAGE_HEIGHT: variant.height.toString() || "",
          PACKAGE_DIAMETER: variant.diameter.toString() || "",
          PACKAGE_TOTAL_VOLUME: variant.calculatedVolume.toString(),
          DISCOUNT_TYPE: variant.discountType.toString(),
          DISCOUNT_AMOUNT: variant.discountAmount.toString(),
          TAX_AMOUNT: variant.taxAmount.toString(),
          TAX_CALCULATION: variant.taxCalculation.toString(),
          CALCULATED_PRICE: variant.calculatedPrice.toString(),
      
          // Variants
          VAREINTS_NAME: variant.variantName.toString(),
       
      };
      


  
        try {
          const res = await axios.post(`${apiUrl}Product/InsertProduct`, payload, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          });
  
          if (res.data[0].message === "SUCCESS" || res.data[0].code === 200) {
            console.log(`✅ Variant ${variant.variantName} inserted successfully!`);
          } else {
            console.warn(`⚠️ Variant ${variant.variantName} failed:`, res.data);
          }
        } catch (error) {
          console.error(`❌ Error submitting variant ${variant.variantName}:`, error);
        }
      }
  
      // ✅ Success Message After All Variants Are Processed
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product and variants inserted successfully!",
      });
  
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
  



  // const payload = {
  //   Product_Name: values.productName.toString(),
  //   PRODUCT_DESCRIPTION: values.productDescription.toString(),
  //   CATEGORY_ID: values.category.toString(),
  //   SUB_CATEGORY_ID: values.subCategory.toString(),
  //   IMAGES: values.images.toString(),
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
  //   DISCOUNT_TYPE: values.discountType
  //     ? values.discountType.toString()
  //     : "",
  //   DISCOUNT_AMOUNT: values.discountAmount.toString() || "0",
  //   TAX_AMOUNT: values.taxAmount.toString() || "",
  //   TAX_CALCULATION: values.taxCalculation.toString() || "",
  //   CALCULATED_PRICE: values.calculatedPrice.toString() || "",
  //   PACKAGE_SHAPE: values.shape.toString() || "",
  //   PACKAGE_LENGTH: values.length.toString() || "0",
  //   PACKAGE_WIDTH: values.width.toString() || "0",
  //   PACKAGE_HEIGHT: values.height.toString() || "0",
  //   PACKAGE_WEIGHT: Number(values.weight) || 0,
  //   PACKAGE_DIAMETER: values.diameter.toString() || "0",
  //   PACKAGE_TOTAL_VOLUME: values.calculatedVolume.toString() || "0",
  // };



  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log(values); 
          await submitFormData(values);
          // resetForm(); 
        }}
      >
    {({ values, errors, touched, setFieldValue, resetForm, isValid, dirty }) => {
            // console.log("Form Values:", values);
            // console.log("Form Errors:", errors);
            // console.log("Touched Fields:", touched);
            // console.log("Is Form Valid?", isValid);
            // console.log("Is Form Dirty?", dirty);

          const handleKeyDown = (e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              e.stopPropagation();

              let tagInput = values.tagsInput?.trim().replace(/,$/, "");
              let varientsInput = values.varientsInput
                ?.trim()
                .replace(/,$/, "");

              if (varientsInput && !values.varients.includes(varientsInput)) {
                setFieldValue("varients", [...values.varients, varientsInput]);

                setFieldValue("varientsData", [
                  ...(values.varientsData || []),
                  {
                    variantName: varientsInput,
                    mrp: "",
                    sku: "",
                    hsn: "",
                    sellingPrice: "",
                    minimumOrderQty: "",
                    currentStockQty: "",
                    discountType: "",
                    discountAmount: "",
                    taxCalculation: "Include",
                    taxAmount: "",
                    calculatedPrice: "",
                    weight: "",
                    shape: "",
                    length: "",
                    width: "",
                    height: "",
                    diameter: "",
                    calculatedVolume: "",
                    images : [],
                  },
                ]);

                setFieldValue("varientsInput", "");
              }

              if (tagInput && !values.tags.includes(tagInput)) {
                setFieldValue("tags", [...values.tags, tagInput]);
                setFieldValue("tagsInput", "");
              }
            }
          };

         

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
                              fetchSubSubCategoryData(selectedValue);
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
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              setFieldValue("subSubCategory", selectedValue);
                              fetchSubCategoryData(selectedValue);
                            }}
                          >
                            <option value="" disabled selected>
                              Select Sub Sub category
                            </option>
                            {subSubCategoryList.map((r) => (
                              <option key={r.id} value={r.id}>
                                {r.subsubcategorY_NAME}
                              </option>
                            ))}
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
                          </Field>
                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="20px"
                            display="block"
                          ></Text>
                        </FormControl>
                      </CardBox>
                    </SimpleGrid>
                  </CardBox>
                </Box>

                {/* For Loop */}

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
                        Product Varient Setup{" "}
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
                              <FormLabel htmlFor="unit">Unit</FormLabel>
                              <Field
                                as={Select}
                                name="unit"
                                size="md"
                                borderRadius="md"
                                h="40px"
                                focusBorderColor="blue.500"
                              >
                                <option value="" disabled selected>
                                  Select Unit
                                </option>

                                {productAttribute?.map((attribut) => (
                                  <option key={attribut.id} value={attribut.attribute_Name}>
                                    {attribut.attribute_Name}
                                  </option>
                                ))}
                              </Field>

                              <Text color="red.500" fontSize="sm" minH="20px" display="block">
                                <ErrorMessage name="unit" />
                              </Text>
                            </FormControl>
                          </CardBox>


                      <GridItem colSpan={2}>
                        <FormControl>
                          <FormLabel htmlFor="varients">Add Varients</FormLabel>

                          <Field
                            as={Input}
                            name="varientsInput"
                            size="md"
                            borderRadius="md"
                            h="40px"
                            focusBorderColor="blue.500"
                            value={values.varientsInput || ""}
                            onChange={(e) =>
                              setFieldValue("varientsInput", e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(e)}
                            placeholder="Enter Variants and press Enter or ',' to add"
                          />

                          {/* Render Tags */}
                          <div style={{ marginTop: "10px" }}>
                            {values.varients.map((varient, index) => (
                              <Tag
                                key={index}
                                size="md"
                                marginRight="5px"
                                marginBottom="5px"
                                variant="solid"
                                colorScheme="blue"
                              >
                                <TagLabel>{varient}</TagLabel>
                                <TagCloseButton
                                  onClick={() =>
                                    setFieldValue(
                                      "varients",
                                      values.varients.filter(
                                        (t) => t !== varient
                                      )
                                    )
                                  }
                                />
                              </Tag>
                            ))}
                          </div>

                          <Text
                            color="red.500"
                            fontSize="sm"
                            minH="10px"
                            display="block"
                          >
                            <ErrorMessage name="varients" />
                          </Text>
                        </FormControl>
                      </GridItem>
                    </SimpleGrid>
                  </CardBox>
                </Box>

                {/* First Loop  */}
                {(values.varientsData || []).map((variant, index) => (
                  <Box key={index} mt="5px">
                    {/* Pricing & others */}
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
                            Pricing & others for{" "}
                            <b style={{ color: "green" }}>
                              {" "}
                              {variant.variantName}{" "}
                            </b>
                          </span>
                        </div>

                        <SimpleGrid
                          columns={{ base: 1, md: 2, lg: 3, "2xl": 5 }}
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
                                htmlFor={`varientsData[${index}].mrp`}
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
                                name={`varientsData[${index}].mrp`}
                                focusBorderColor="blue.500"
                                size="md"
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /[^0-9.]/g,
                                    ""
                                  );
                                  if ((value.match(/\./g) || []).length > 1)
                                    return;
                                  setFieldValue(
                                    `varientsData[${index}].mrp`,
                                    value
                                  );
                                }}
                                onBlur={(e) => {
                                  const finalValue =
                                    parseFloat(e.target.value) || "";
                                  setFieldValue(
                                    `varientsData[${index}].mrp`,
                                    finalValue
                                  );
                                }}
                              />

                              <Text
                                color="red.500"
                                fontSize="sm"
                                minH="20px"
                                display="block"
                              >
                                <ErrorMessage
                                  name={`varientsData[${index}].mrp`}
                                />
                              </Text>
                            </FormControl>
                          </CardBox>
                          {/* Selling Price */}
                          <CardBox>
                            <FormControl>
                              <FormLabel
                                htmlFor={`varientsData[${index}].sellingPrice`}
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
                                name={`varientsData[${index}].sellingPrice`}
                                focusBorderColor="blue.500"
                                size="md"
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /[^0-9.]/g,
                                    ""
                                  );
                                  if ((value.match(/\./g) || []).length > 1)
                                    return;
                                  setFieldValue(
                                    `varientsData[${index}].sellingPrice`,
                                    value
                                  );
                                }}
                                onBlur={(e) => {
                                  const finalValue =
                                    parseFloat(e.target.value) || "";
                                  setFieldValue(
                                    `varientsData[${index}].sellingPrice`,
                                    finalValue
                                  );
                                }}
                              />

                              <Text
                                color="red.500"
                                fontSize="sm"
                                minH="20px"
                                display="block"
                              >
                                <ErrorMessage
                                  name={`varientsData[${index}].sellingPrice`}
                                />
                              </Text>
                            </FormControl>
                          </CardBox>

                          {/* Minimum Order Qty */}
                          <CardBox>
                            <FormControl>
                              <FormLabel
                                htmlFor={`varientsData[${index}].minimumOrderQty`}
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
                                name={`varientsData[${index}].minimumOrderQty`}
                                focusBorderColor="blue.500"
                                size="md"
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  ); // Only allow whole numbers
                                  setFieldValue(
                                    `varientsData[${index}].minimumOrderQty`,
                                    value
                                  );
                                }}
                                onBlur={(e) => {
                                  const finalValue =
                                    parseInt(e.target.value, 10) || "";
                                  setFieldValue(
                                    `varientsData[${index}].minimumOrderQty`,
                                    finalValue
                                  );
                                }}
                              />

                              <Text
                                color="red.500"
                                fontSize="sm"
                                minH="20px"
                                display="block"
                              >
                                <ErrorMessage
                                  name={`varientsData[${index}].minimumOrderQty`}
                                />
                              </Text>
                            </FormControl>
                          </CardBox>

                          {/* Current Stock Qty */}
                          <CardBox>
                            <FormControl>
                              <FormLabel
                                htmlFor={`varientsData[${index}].currentStockQty`}
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
                                name={`varientsData[${index}].currentStockQty`}
                                focusBorderColor="blue.500"
                                size="md"
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  setFieldValue(
                                    `varientsData[${index}].currentStockQty`,
                                    value
                                  );
                                }}
                                onBlur={(e) => {
                                  const finalValue =
                                    parseInt(e.target.value, 10) || "";
                                  setFieldValue(
                                    `varientsData[${index}].currentStockQty`,
                                    finalValue
                                  );
                                }}
                              />

                              <Text
                                color="red.500"
                                fontSize="sm"
                                minH="20px"
                                display="block"
                              >
                                <ErrorMessage
                                  name={`varientsData[${index}].currentStockQty`}
                                />
                              </Text>
                            </FormControl>
                          </CardBox>
                          {/* Discount Type */}
                          <CardBox>
                            <FormControl>
                              <FormLabel
                                htmlFor={`varientsData[${index}].discountType`}
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
                                name={`varientsData[${index}].discountType`}
                                focusBorderColor="blue.500"
                                size="md"
                                borderRadius="md"
                                onChange={(e) => {
                                  setFieldValue(
                                    `varientsData[${index}].discountType`,
                                    e.target.value
                                  );
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
                                <ErrorMessage
                                  name={`varientsData[${index}].discountType`}
                                />
                              </Text>
                            </FormControl>
                          </CardBox>
                          {/* Discount Amount */}
                          <CardBox>
                            <FormControl>
                              <FormLabel
                                htmlFor={`varientsData[${index}].discountAmount`}
                                display="flex"
                                alignItems="center"
                              >
                                Discount{" "}
                                {values.varientsData[index]?.discountType ===
                                "Flat"
                                  ? "₹"
                                  : "%"}{" "}
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
                                name={`varientsData[${index}].discountAmount`}
                                focusBorderColor="blue.500"
                                size="md"
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /[^0-9.]/g,
                                    ""
                                  );
                                  if ((value.match(/\./g) || []).length > 1)
                                    return;
                                  setFieldValue(
                                    `varientsData[${index}].discountAmount`,
                                    value
                                  );
                                }}
                                onBlur={(e) => {
                                  const finalValue =
                                    parseFloat(e.target.value) || "";
                                  setFieldValue(
                                    `varientsData[${index}].discountAmount`,
                                    finalValue
                                  );
                                }}
                              />

                              <Text
                                color="red.500"
                                fontSize="sm"
                                minH="20px"
                                display="block"
                              >
                                <ErrorMessage
                                  name={`varientsData[${index}].discountAmount`}
                                />
                              </Text>
                            </FormControl>
                          </CardBox>

                          <CardBox>
                            <FormControl>
                              <FormLabel
                                htmlFor={`varientsData[${index}].taxCalculation`}
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
                                name={`varientsData[${index}].taxCalculation`}
                                id="taxCalculation"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setFieldValue(
                                    `varientsData[${index}].taxCalculation`,
                                    value
                                  );
                                  values.varientsData.forEach((_, index) => {
                                    setFieldValue(
                                      `varientsData[${index}].taxCalculation`,
                                      value
                                    );
                                  });
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

                          {values.varientsData[index]?.taxCalculation ===
                            "Exclude" && (
                            <CardBox>
                              <FormControl>
                                <FormLabel
                                  htmlFor={`varientsData[${index}].taxAmount`}
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
                                  name={`varientsData[${index}].taxAmount`}
                                  focusBorderColor="blue.500"
                                  size="md"
                                  onChange={(e) => {
                                    const value = e.target.value.replace(
                                      /[^0-9.]/g,
                                      ""
                                    );
                                    if ((value.match(/\./g) || []).length > 1)
                                      return;
                                    setFieldValue(
                                      `varientsData[${index}].taxAmount`,
                                      value
                                    );
                                  }}
                                  onBlur={(e) => {
                                    const finalValue =
                                      parseFloat(e.target.value) || "";
                                    setFieldValue(
                                      `varientsData[${index}].taxAmount`,
                                      finalValue
                                    );
                                  }}
                                />

                                <Text
                                  color="red.500"
                                  fontSize="sm"
                                  minH="20px"
                                  display="block"
                                >
                                  <ErrorMessage
                                    name={`varientsData[${index}].taxAmount`}
                                  />
                                </Text>
                              </FormControl>
                            </CardBox>
                          )}

                          {/* Product SKU */}
                          <CardBox>
                            <FormControl>
                              <FormLabel
                                htmlFor={`varientsData[${index}].sku`}
                                display="flex"
                                alignItems="center"
                              >
                                Product SKU{" "}
                                <Tooltip
                                  label="Create a unique product code by clicking on the 'Generate Code' button"
                                  aria-label="Info Tooltip"
                                  hasArrow
                                  placement="top"
                                >
                                  <span style={{ cursor: "pointer" }}>
                                    <MdInfo />
                                  </span>
                                </Tooltip>
                                <Button
                                  size="sm"
                                  colorScheme="blue"
                                  onClick={() =>
                                    generateCode(index, setFieldValue)
                                  }
                                  style={{ marginLeft: "10%" }}
                                >
                                  Generate Code
                                </Button>
                              </FormLabel>

                              <Field
                                as={Input}
                                name={`varientsData[${index}].sku`}
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
                                <ErrorMessage
                                  name={`varientsData[${index}].sku`}
                                />
                              </Text>
                            </FormControl>
                          </CardBox>

                          {/* HSN Code */}
                          <CardBox>
                            <FormControl>
                              <FormLabel
                                htmlFor={`varientsData[${index}].hsn`}
                                display="flex"
                                alignItems="center"
                                marginTop={2}
                              >
                                HSN Code
                                <Tooltip
                                  label="Enter the Harmonized System of Nomenclature."
                                  aria-label="Info Tooltip"
                                  hasArrow
                                  placement="top"
                                >
                                  <span style={{ cursor: "pointer" }}>
                                    <MdInfo />
                                  </span>
                                </Tooltip>
                              </FormLabel>

                              <Field
                                as={Input}
                                name={`varientsData[${index}].hsn`}
                                maxLength={8}
                                onChange={(e) => {
                                  const value = e.target.value.trim();
                                  setFieldValue(
                                    `varientsData[${index}].hsn`,
                                    value
                                  );
                                }}
                              />

                              <Text
                                color="red.500"
                                fontSize="sm"
                                minH="20px"
                                display="block"
                              >
                                <ErrorMessage
                                  name={`varientsData[${index}].hsn`}
                                />
                              </Text>
                            </FormControl>
                          </CardBox>

                          {/* Price Calculation Button */}
                          <CardBox>
                            <Box mt={5}>
                              <Button
                                onClick={() =>
                                  handlePriceCalculation(index, values)
                                }
                              >
                                Calculate Price
                              </Button>
                            </Box>
                          </CardBox>

                          {/* Conditionally render price and buttons */}
                          {showPrice[index] && (
                            <CardBox>
                              <Box
                                mt={6}
                                p={4}
                                borderRadius="md"
                                backgroundColor="gray.100"
                              >
                                <Text
                                  fontWeight="bold"
                                  fontSize="lg"
                                  color="blue.600"
                                >
                                  💰 1 Piece Final Price: ₹{" "}
                                  {
                                    (values.varientsData[
                                      index
                                    ].calculatedPrice =
                                      calculateDiscountedPrice(
                                        values.varientsData[index]
                                      ).toFixed(2))
                                  }
                                </Text>

                                <Text
                                  fontWeight="bold"
                                  fontSize="lg"
                                  color="green.600"
                                  mt={2}
                                >
                                  💰 Gross Total Price: ₹{" "}
                                  {(
                                    values.varientsData[index].minimumOrderQty *
                                    calculateDiscountedPrice(
                                      values.varientsData[index]
                                    )
                                  ).toFixed(2)}
                                </Text>
                              </Box>
                            </CardBox>
                          )}
                        </SimpleGrid>

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
                              Logistic Setup
                            </span>
                          </div>

                          <SimpleGrid
                            columns={{ base: 1, md: 2, lg: 3 }}
                            spacing={6}
                            p={3}
                            pb={10}
                          >
                            {/* Package Shape */}
                            <CardBox>
                              <FormControl>
                                <FormLabel
                                  htmlFor={`varientsData[${index}].shape`}
                                  display="flex"
                                  alignItems="center"
                                >
                                  Package Shape

                                </FormLabel>

                                <Field
                                  as={Select}
                                  name={`varientsData[${index}].shape`}
                                  focusBorderColor="blue.500"
                                  size="md"
                                  borderRadius="md"
                                  onChange={(e) =>
                                    setFieldValue(
                                      `varientsData[${index}].shape`,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="">Select Shape</option>
                                  <option value="cuboid">Cuboid</option>
                                  <option value="cylinder">Cylinder</option>
                                </Field>
                                <ErrorMessage
                                  name={`varientsData[${index}].shape`}
                                  component={Text}
                                  color="red.500"
                                  fontSize="sm"
                                />
                              </FormControl>
                            </CardBox>

                            {/* Fields for Cuboid */}
                            {variant.shape === "cuboid" && (
                              <>
                                {["length", "width"].map((field) => (
                                  <CardBox key={field}>
                                    <FormControl>
                                      <FormLabel
                                        display="flex"
                                        alignItems="center"
                                      >
                                        {field.charAt(0).toUpperCase() +
                                          field.slice(1)}{" "}
                                        (cm)
                                       
                                      </FormLabel>

                                      <Field
                                        as={Input}
                                        name={`varientsData[${index}].${field}`}
                                        focusBorderColor="blue.500"
                                        size="md"
                                        onChange={(e) => {
                                          const value = e.target.value.replace(
                                            /[^0-9.]/g,
                                            ""
                                          );
                                          if (
                                            (value.match(/\./g) || []).length >
                                            1
                                          )
                                            return;
                                          setFieldValue(
                                            `varientsData[${index}].${field}`,
                                            value
                                          );
                                        }}
                                      />
                                      <ErrorMessage
                                        name={`varientsData[${index}].${field}`}
                                        component={Text}
                                        color="red.500"
                                        fontSize="sm"
                                      />
                                    </FormControl>
                                  </CardBox>
                                ))}
                              </>
                            )}

                            {/* Fields for Cylinder */}
                            {variant.shape === "cylinder" && (
                              <CardBox>
                                <FormControl>
                                  <FormLabel display="flex" alignItems="center">
                                    Diameter (cm)
                                  </FormLabel>

                                  <Field
                                    as={Input}
                                    name={`varientsData[${index}].diameter`}
                                    focusBorderColor="blue.500"
                                    size="md"
                                    onChange={(e) => {
                                      const value = e.target.value.replace(
                                        /[^0-9.]/g,
                                        ""
                                      );
                                      if ((value.match(/\./g) || []).length > 1)
                                        return;
                                      setFieldValue(
                                        `varientsData[${index}].diameter`,
                                        value
                                      );
                                    }}
                                  />
                                  <ErrorMessage
                                    name={`varientsData[${index}].diameter`}
                                    component={Text}
                                    color="red.500"
                                    fontSize="sm"
                                  />
                                </FormControl>
                              </CardBox>
                            )}

                            {/* Height Field */}
                            <CardBox>
                              <FormControl>
                                <FormLabel display="flex" alignItems="center">
                                  Height (cm)
                                </FormLabel>

                                <Field
                                  as={Input}
                                  name={`varientsData[${index}].height`}
                                  focusBorderColor="blue.500"
                                  size="md"
                                  onChange={(e) => {
                                    const value = e.target.value.replace(
                                      /[^0-9.]/g,
                                      ""
                                    );
                                    if ((value.match(/\./g) || []).length > 1)
                                      return;
                                    setFieldValue(
                                      `varientsData[${index}].height`,
                                      value
                                    );
                                  }}
                                />
                                <ErrorMessage
                                  name={`varientsData[${index}].height`}
                                  component={Text}
                                  color="red.500"
                                  fontSize="sm"
                                />
                              </FormControl>
                            </CardBox>

                            {/* Weight Field */}
                            <CardBox>
                              <FormControl>
                                <FormLabel display="flex" alignItems="center">
                                  Weight (gram)

                                </FormLabel>

                                <Field
                                  as={Input}
                                  name={`varientsData[${index}].weight`}
                                  focusBorderColor="blue.500"
                                  size="md"
                                  onChange={(e) => {
                                    const value = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                    setFieldValue(
                                      `varientsData[${index}].weight`,
                                      value
                                    );
                                  }}
                                />
                                <ErrorMessage
                                  name={`varientsData[${index}].weight`}
                                  component={Text}
                                  color="red.500"
                                  fontSize="sm"
                                />
                              </FormControl>
                            </CardBox>

                            {/* Volume Calculation Button */}
                            <CardBox>
                              <Box mt={8}>
                                <Button
                                  onClick={() =>
                                    handleVolumeCalculation(index, values)
                                  }
                                >
                                  Calculate Volume
                                </Button>
                              </Box>
                            </CardBox>

                            {/* Display Volume */}
                            <GridItem colSpan={{ base: 1, md: 3 }}>
                              {showVolume[index] && (
                                <Box mt={10}>
                                  <Text
                                    fontWeight="bold"
                                    fontSize="xl"
                                    color="blue.700"
                                  >
                                    📦 Calculated Volume:{" "}
                                    <Text as="span" color="red.500">
                                      {
                                        (values.varientsData[
                                          index
                                        ].calculatedVolume = calculateVolume(
                                          values.varientsData[index]
                                        ))
                                      }{" "}
                                      cm³
                                    </Text>
                                  </Text>
                                </Box>
                              )}
                            </GridItem>
                          </SimpleGrid>
                        </CardBox>

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
                              {/* come here */}
                              <UploadImages
                                values={values}  // Pass the entire values object
                                index={index} // Pass the index of the variant
                                setFieldValue={setFieldValue} // Pass Formik's setFieldValue directly
                              />


                            </SimpleGrid>
                          </CardBox>
                        </Box>

                        {/* Delete Variant Button */}
                        <Box
                          key={index}
                          display="flex"
                          alignItems="center"
                          gap={2}
                          padding="10px"
                          marginLeft="1%"
                        >
                          <Button
                            colorScheme="red"
                            size="sm"
                            padding="15px"
                            onClick={() =>
                              handleRemoveVariant(
                                variant.variantName,
                                values,
                                setFieldValue
                              )
                            }
                          >
                            ✖ Delete {variant.variantName}
                          </Button>
                        </Box>
                      </CardBox>
                    </Box>
                  </Box>
                ))}
                <CardBox>
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
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddNewProduct;
