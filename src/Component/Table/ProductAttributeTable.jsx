import React, { useState, useEffect } from "react";
import { Table, Button, Space, Input } from "antd";
import { MdDelete, MdEdit, MdRemoveRedEye, MdSearch } from "react-icons/md";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button as ChakraButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

const { Column } = Table;

const ProductAttributeTable = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const validationSchema = Yup.object({
    attribute_Name: Yup.string().required("Attribute Name is required"),
  });

  // Fetch Attributes on Mount
  useEffect(() => {
    getAllAttributes();
  }, []);

  // Fetch All Attributes
  const getAllAttributes = async () => {
    try {
      const res = await axios.get(`${apiUrl}ProductAttribute/GetAllAttribute`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });


      if (res.data[0]?.retval === "SUCCESS" && res.data[0]?.dataset?.$values) {
        setData(res.data[0].dataset.$values);
      } else {
        Swal.fire("Error", "Error fetching attributes, please try again.", "error");
      }
    } catch (error) {
      Swal.fire("Error", `Failed to fetch attributes. ${error.message}`, "error");
    }
  };

  // Delete Attribute
  const handleDelete = async (record) => {
    console.log("Deleting:", record);

    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${apiUrl}ProductAttribute/DeleteAttribute`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
            data: { id: record.id },
          });

          console.log("Deleted Token:", storedToken);

          setData((prevData) => prevData.filter((item) => item.id !== record.id));

          Swal.fire("Deleted!", "The attribute has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", `Failed to delete attribute. ${error.message}`, "error");
        }
      }
    });
  };

  // Edit Attribute
  const handleEdit = (record) => {
    setEditData(record);
    setIsEditOpen(true);
  };

  // Submit Edit Form (Update Attribute)
  const handleSubmit = async (values) => {
    try {
      console.log("Submitting Update Request with:", values);

      const res = await axios.put(
        `${apiUrl}ProductAttribute/UpdateAttribute`,
        {
          id: values.id,
          Attribute_Name: values.attribute_Name, 
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data[0]?.retval === "SUCCESS") {
        Swal.fire("Success", "Attribute updated successfully!", "success");
        setIsEditOpen(false);
        getAllAttributes();
      } else {
        Swal.fire("Error", "Failed to update attribute.", "error");
      }
    } catch (error) {
      Swal.fire("Error", `Error updating attribute. ${error.message}`, "error");
    }
  };

  // View Attribute
  const handleView = (record) => {
    Swal.fire("Attribute Details", `ID: ${record.id}\nName: ${record.attribute_Name}`, "info");
  };

  // Search Filter
  const filteredData = data.filter((item) =>
    item.attribute_Name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", maxWidth: "100%", overflowX: "auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontWeight: "600", marginBottom: "0" }}>Attribute List</h2>

        <Input
          placeholder="Search by attribute name"
          style={{ width: "300px", paddingLeft: "30px" }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Table */}
      <Table dataSource={filteredData} rowKey="id" bordered={false} pagination={{ pageSize: 5 }}>
        <Column title="No" dataIndex="id" key="id" align="center" />
        <Column title="Attribute Name" dataIndex="attribute_Name" key="attribute_Name" align="center" />

        {/* Actions */}
        <Column
          title="Action"
          key="action"
          align="center"
          render={(_, record) => (
            <Space size="middle">
              <Button icon={<MdRemoveRedEye />} type="primary" onClick={() => handleView(record)} />
              <Button icon={<MdEdit />} type="primary" onClick={() => handleEdit(record)} />
              <Button icon={<MdDelete />} type="primary" danger onClick={() => handleDelete(record)} />
            </Space>
          )}
        />
      </Table>

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} isCentered>
  <ModalOverlay />
  <ModalContent maxW="600px"> {/* Adjust width as needed */}
    <ModalHeader>Edit Product Attribute</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Formik
        enableReinitialize
        initialValues={{
          id: editData?.id || "",
          attribute_Name: editData?.attribute_Name || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <FormControl isInvalid={errors.attribute_Name && touched.attribute_Name}>
              <FormLabel>Attribute Name</FormLabel>
              <Field name="attribute_Name" className="chakra-input" />
              <FormErrorMessage>{errors.attribute_Name}</FormErrorMessage>
            </FormControl>

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
  );
};

export default ProductAttributeTable;

