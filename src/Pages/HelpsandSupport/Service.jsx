import { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  GridItem,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  Textarea
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../redux/Features/LoadingSlice";
import CardBox from "../../Component/Charts/CardBox";
import ServiceTable from "../../Component/Table/ServiceTable";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";

// ✅ Validation Schema using Yup
const validationSchema = yup.object().shape({
  Service_name: yup.string().required("Service Name is required").min(3, "Must be at least 3 characters"),
  Price: yup.number().required("Price is required").positive("Price must be positive").typeError("Price must be a number"),
  Description: yup.string().required("Description is required").min(10, "Must be at least 10 characters"),
  Image: yup.mixed().required("Image is required"),
});

const Service = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const storedToken = token || localStorage.getItem("token");

  // ✅ State for Image Upload & Preview
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  // ✅ Handle Image Preview
  const handlePreview = async (file) => {
    setPreviewImage(file.url || URL.createObjectURL(file.originFileObj));
    setPreviewOpen(true);
  };

  // ✅ Handle Image Upload Change
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // ✅ Upload Button UI
  const uploadButton = (
    <button
      style={{
        fontSize: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#999",
        borderRadius: 8,
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  // ✅ Handle Form Submission
  const handleSubmit = async (values, { resetForm }) => {
    dispatch(startLoading());

    try {
      // ✅ Prepare form data including image
      const formData = new FormData();
      formData.append("Service_name", values.Service_name);
      formData.append("Price", values.Price);
      formData.append("Description", values.Description);

      // ✅ Append image if available
      if (fileList.length > 0) {
        formData.append("Image", fileList[0].originFileObj);
      }

      // ✅ API Request
      const res = await axios.post(
        `${apiUrl}/EcommerceSubcategory/InsertSubCategory`,
        formData,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (res.data.Message.toLowerCase() === "success") {
        await Swal.fire({
          title: "Success",
          text: "Sub-category added successfully!",
          icon: "success",
        });

        resetForm();
        setFileList([]); // ✅ Clear uploaded images after reset
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

  return (
    <>
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
            Add New Service
          </h2>
        </Box>

        <Box mx="auto">
          <CardBox>
          <Formik
  initialValues={{
    Service_name: "",
    Price: "",
    Description: "",
    Image: null,
  }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ setFieldValue, resetForm }) => (
    <Form>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} p={5}>
        {/* ✅ Service Name */}
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel fontWeight="bold" color="gray.600">
              Service Name
            </FormLabel>
            <Field
              as={Input}
              name="Service_name"
              type="text"
              placeholder="Enter Service name"
              focusBorderColor="blue.500"
              size="md"
              borderRadius="md"
            />
            <Text color="red.500" fontSize="sm">
              <ErrorMessage name="Service_name" />
            </Text>
          </FormControl>
        </GridItem>

        {/* ✅ Price */}
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel fontWeight="bold" color="gray.600">
              Price
            </FormLabel>
            <Field
              as={Input}
              name="Price"
              type="text"
              placeholder="Enter Price"
              focusBorderColor="blue.500"
              size="md"
              borderRadius="md"
            />
            <Text color="red.500" fontSize="sm">
              <ErrorMessage name="Price" />
            </Text>
          </FormControl>
        </GridItem>

        {/* ✅ Description */}
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel fontWeight="bold" color="gray.600">
              Description
            </FormLabel>
            <Field
              as={Textarea}
              name="Description"
              placeholder="Enter Description"
              focusBorderColor="blue.500"
              size="md"
              borderRadius="md"
            />
            <Text color="red.500" fontSize="sm">
              <ErrorMessage name="Description" />
            </Text>
          </FormControl>
        </GridItem>

        {/* ✅ Image Upload Section (Now Below Description) */}
        <GridItem colSpan={2} display="flex" flexDirection="column" alignItems="center">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false} 
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Image
            preview={{
              visible: previewOpen,
              src: previewImage,
              onVisibleChange: (visible) => setPreviewOpen(visible),
            }}
          />
          <Text color="red.500" fontSize="sm">
            <ErrorMessage name="Image" />
          </Text>
        </GridItem>

        {/* ✅ Buttons Section */}
        <GridItem colSpan={2} display="flex" justifyContent="center" alignItems="center" mt={4} mb={5}>
          <Box display="flex" gap={5} mr={5} mt={6}>
            <Button
              colorScheme="gray"
              onClick={() => {
                resetForm();
                setFileList([]); // Clears image selection
              }}
            >
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

        {/* ✅ Table Section */}
        <Box mt={5}>
          <CardBox>
            <ServiceTable />
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default Service;
