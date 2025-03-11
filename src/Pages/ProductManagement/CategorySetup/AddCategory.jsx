import { useState } from "react";
import { 
  Box, SimpleGrid, FormLabel, FormControl, Input, Button, 
  Select, Image, useBreakpointValue, Text 
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CardBox from "../../../Component/Charts/CardBox";
import CategoryTable from "../../../Component/Table/CategoryTable";
import { useDispatch , useSelector } from "react-redux";
import { startLoading , stopLoading } from "../../../redux/Features/LoadingSlice";
import Swal from "sweetalert2";
import axios from "axios";
const AddCategory = () => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");

  const [previewImage, setPreviewImage] = useState(null);
  const logoSize = useBreakpointValue({ base: "150px", md: "200px" });
 const dispatch = useDispatch();
  const initialValues = {
    categoryName: "",
    priority: "",
    categoryIcon: null, 
  };
  
  const validationSchema = Yup.object().shape({
    categoryName: Yup.string().required("Category Name is required"),
    priority: Yup.string().required("Priority is required"),
    categoryIcon: Yup.mixed().required("Category Icon is required"),
  });
  
  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setFieldValue("categoryIcon", file); 
      };
      reader.readAsDataURL(file);
    }
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
  
      const response = await axios.post(`${apiUrl}SaveFile/SaveImage`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "multipart/form-data", 
        },
      });
  
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


  const submitFormData = async (values) => {
    try {
      dispatch(startLoading());
  
      let imagePath = "";
      if (values.categoryIcon) {
        try {
        
          imagePath = await uploadImage(values.categoryIcon, "CategoryIcon");
          if (!imagePath) {
            throw new Error("Image upload failed.");
          }
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
        Category_Name: values.categoryName || "",
        priority: Number(values.priority) || 0,
        Image: imagePath || "", 
      };
  
      try {
        const res = await axios.post(`${apiUrl}Category/InsertProductCategory`, payload, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (res.data.message === "SUCCESS" || res.data.code == 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "category inserted successfully!",
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
          text: error?.response?.data?.message || error?.response?.data?.Message || "Failed to insert  category",
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
  

  const handleSubmit = async (values, { resetForm }) => {

    await submitFormData(values);

    setPreviewImage(null);
  };

  return (
    <Box marginTop="1%">
      <Box mb={6}>
        <h2 className="content-title" style={{ textAlign: "center", fontWeight: "600", fontSize: "20px", color: "#4A5568" }}>
          Add New Category
        </h2>
      </Box>

      <Box mx="auto" mt={5}>
        <CardBox>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ setFieldValue }) => (
              <Form>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} alignItems="center">
                  <Box w="100%" px={{ base: 2, md: 6 }}>
                    
                    {/* Category Name */}
                    <FormControl mb={4} mt={5}>
                      <FormLabel fontWeight="bold" color="gray.600">Category Name</FormLabel>
                      <Field 
                        as={Input}
                        type="text"
                        name="categoryName"
                        placeholder="Enter category name"
                        focusBorderColor="blue.500"
                        size="lg"
                        borderRadius="md"
                      />
                      <Text color="red.500" fontSize="sm" minH="20px" display="block">
                        <ErrorMessage name="categoryName" />
                      </Text>
                    </FormControl>

                    {/* Priority */}
                    <FormControl mb={4}>
                      <FormLabel fontWeight="bold" color="gray.600">Priority</FormLabel>
                      <Field 
                        as={Select}
                        name="priority"
                        placeholder="Select priority"
                        focusBorderColor="blue.500"
                        size="lg"
                      >
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={i} value={i}>{i}</option>
                        ))}
                      </Field>
                      <Text color="red.500" fontSize="sm" minH="20px" display="block">
                        <ErrorMessage name="priority" />
                      </Text>
                    </FormControl>

                    {/* Category Icon */}
                    <FormControl mb={4}>
                      <FormLabel fontWeight="bold" color="gray.600">
                        Category Icon{" "}
                        <span style={{ color: "green", fontSize: "sm" }}>
                          (Logo must be 1:1 ratio)
                        </span>
                      </FormLabel>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageChange(event, setFieldValue)}
                        focusBorderColor="blue.500"
                        size="lg"
                        borderRadius="md"
                        p={2}
                      />
                      <Text color="red.500" fontSize="sm" minH="20px" display="block">
                        <ErrorMessage name="categoryIcon" />
                      </Text>
                    </FormControl>

                    {/* Buttons */}
                    <Box textAlign="center" mt={4} mb={5}>
                      <Button type="submit" bg="blue.500" color="white" _hover={{ bg: "blue.600" }} size="lg" borderRadius="md" mr={3}>
                        Submit
                      </Button>
                      <Button type="reset" bg="gray.500" color="white" _hover={{ bg: "gray.600" }} size="lg" borderRadius="md">
                        Reset
                      </Button>
                    </Box>
                  </Box>

                  {/* Image Preview */}
                  <Box textAlign={{ base: "center", md: "right" }} display="flex" justifyContent="center" alignItems="center">
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt="Preview"
                        boxSize={logoSize}
                        objectFit="cover"
                        borderRadius="full"
                        border="2px solid #ccc"
                      />
                    ) : (
                      <p style={{ color: "#aaa" }}>No image selected</p>
                    )}
                  </Box>
                </SimpleGrid>
              </Form>
            )}
          </Formik>
        </CardBox>
      </Box>

      {/* Category Table */}
      <Box mt={5}>
        <CardBox>
          <CategoryTable />
        </CardBox>
      </Box>
    </Box>
  );
};

export default AddCategory;
