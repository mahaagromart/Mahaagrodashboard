import React from 'react';
import {
  Heading, Box, FormControl, FormLabel, Input, Button, SimpleGrid, Text
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CardBox from "../../../Component/Charts/CardBox";

import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../../redux/Features/LoadingSlice";
import Swal from "sweetalert2";
import ProductListTable from '../../../Component/Table/ProductListTable';
import ProductAttributeTable from '../../../Component/Table/ProductAttributeTable';

const ProductAttribute = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const storedToken = token || localStorage.getItem("token");

  // Validation Schema (Updated to match "Attribute_Name")
  const validationSchema = Yup.object().shape({
    Attribute_Name: Yup.string()
      .min(3, "Attribute name must be at least 3 characters")
      .required("Attribute name is required"),
  });

  // Function to handle API call
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    dispatch(startLoading());
    try {
      const response = await axios.post(`${apiUrl}ProductAttribute/InsertAttribute`, values, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });


      if (response.status === 200 || response.status === 201) {
        Swal.fire("Success", "Attribute added successfully!", "success");
        resetForm();
      } else {
        Swal.fire("Error", "Submission unsuccessful. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", error.response?.data?.message || "Something went wrong.", "error");
    } finally {
      setSubmitting(false);
      dispatch(stopLoading());
    }
  };

  return (
    <Box>
      {/* Page Title */}
      <Heading textAlign="center" size="lg" color="gray.700" mb={6}>
        Product Attributes
      </Heading>

      {/* Form Section */}
      <Box mx="auto" mt={5}>
        <CardBox>
          <Formik
            initialValues={{ Attribute_Name: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} alignItems="center">
                  <Box w="100%" px={{ base: 2, md: 6 }}>
                    <FormControl mb={4} mt={5} isInvalid={errors.Attribute_Name && touched.Attribute_Name}>
                      <FormLabel fontWeight="bold" color="gray.600">
                        Attribute Name
                      </FormLabel>
                      <Field
                        as={Input}
                        type="text"
                        name="Attribute_Name"
                        placeholder="Enter Attribute name"
                        focusBorderColor="blue.500"
                        size="lg"
                        borderRadius="md"
                      />
                      {errors.Attribute_Name && touched.Attribute_Name && (
                        <Text color="red.500" fontSize="sm">
                          {errors.Attribute_Name}
                        </Text>
                      )}
                    </FormControl>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      bg="blue.500"
                      color="white"
                      _hover={{ bg: "blue.600" }}
                      size="lg"
                      borderRadius="md"
                      isLoading={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Box>
                </SimpleGrid>
              </Form>
            )}
          </Formik>
        </CardBox>
      </Box>

      {/* Attribute Table Section */}
      <Box w="100%" mt={8}>
        <CardBox>
            <ProductAttributeTable/>
        </CardBox>
      </Box>
    </Box>
  );
};

export default ProductAttribute;