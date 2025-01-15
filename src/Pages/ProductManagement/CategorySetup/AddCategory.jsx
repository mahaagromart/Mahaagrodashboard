import React from "react";
import { Box, SimpleGrid, FormLabel, FormControl, Input, Button, Select, Image, useBreakpointValue } from "@chakra-ui/react";
import CardBox from "../../../Component/Charts/CardBox";
import Logo from "../../../assets/react.svg";
import TableWithToggle from "../../../Component/Table/TableWithToggle";

const AddCategory = () => {
  const logoSize = useBreakpointValue({ base: "150px", md: "200px" });

  const initialData = [
    {
      id: "1",
      categoryImage: "https://via.placeholder.com/50",
      categoryName: "Fruits",
      priority: 1,
      status: "Active",
    },
    {
      id: "2",
      categoryImage: "https://via.placeholder.com/50",
      categoryName: "Vegetables",
      priority: 2,
      status: "Inactive",
    },
    {
      id: "3",
      categoryImage: "https://via.placeholder.com/50",
      categoryName: "Dairy",
      priority: 3,
      status: "Active",
    },
  ];

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", align: "center" },
    {
      title: "Category Image",
      dataIndex: "categoryImage",
      key: "categoryImage",
      align: "center",
      render: (text) => (
        <img
          src={text}
          alt="Category"
          style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
        />
      ),
    },
    { title: "Name", dataIndex: "categoryName", key: "categoryName", align: "center" },
    { title: "Priority", dataIndex: "priority", key: "priority", align: "center" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (_, record) => (
        <Button
          style={{
            background: record.status === "Active" ? "#52c41a" : "#f5222d",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
          }}
        >
          {record.status === "Active" ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
    { title: "Action", key: "action", align: "center" },
  ];

  return (
    <>
      <Box marginTop="1%"  className="box">
        <Box mb={6}>
          <h2 className="content-title" style={{ textAlign: "center", fontWeight: "600", fontSize: "20px", color: "#4A5568" }}>
            Add New Category
          </h2>
        </Box>

        <Box mx="auto" mt={5}>
          <CardBox>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} alignItems="center">
              <Box w="100%" px={{ base: 2, md: 6 }}>
                <FormControl mb={4} mt={5}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Category Name
                  </FormLabel>
                  <Input type="text" placeholder="Enter category name" focusBorderColor="blue.500" size="lg" borderRadius="md" />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Priority
                  </FormLabel>
                  <Select placeholder="Select priority" focusBorderColor="blue.500" size="lg">
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Category Icon{" "}
                    <span style={{ color: "green", fontSize: "sm" }}>
                      (Logo must be 1:1 ratio )
                    </span>
                  </FormLabel>
                  <Input type="file" focusBorderColor="blue.500" size="lg" borderRadius="md" p={2} />
                </FormControl>

                <Box textAlign="center" mt={4} mb={5}>
                  <Button bg="blue.500" color="white" _hover={{ bg: "blue.600" }} size="lg" borderRadius="md">
                    Submit
                  </Button>
                </Box>
              </Box>

              <Box textAlign={{ base: "center", md: "right" }} display="flex" justifyContent="center" alignItems="center">
                <Image
                  src={Logo}
                  alt="Category Logo"
                  boxSize={logoSize}
                  objectFit="cover"
                  borderRadius="full"
                  border="2px solid #ccc"
                />
              </Box>
            </SimpleGrid>
          </CardBox>
        </Box>

        <Box mt={5}>
          <CardBox>
            <TableWithToggle columns={columns} dataList={initialData} />
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default AddCategory;
