import {
  Box,
  SimpleGrid,
  GridItem,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import React from "react";
import CardBox from "../../../Component/Charts/CardBox";
import CustomTable from "../../../Component/Table/CustomTable";

const data = [
    {
      id: "1",
      SubCategoryName: "Fruits",
      priority: 1,
    },
    {
      id: "2",
      SubCategoryName: "Vegetables",
      priority: 2,
    },
    {
      id: "3",
      SubCategoryName: "Dairy",
      priority: 3,
    },
  ];



const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Sub-Category Name", dataIndex: "SubCategoryName", key: "SubCategoryName" },
    { title: "Priority", dataIndex: "priority", key: "priority" },
  ];



const AddSubCategory = () => {
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
            Add New Sub Category
          </h2>
        </Box>

        <Box mx="auto" mt={5}>
          <CardBox>
            <SimpleGrid
              columns={{ base: 1,  md: 2, lg: 3 }}
              spacing={6}
              alignItems="center"
              gap={10}
              p={5}
            >
              {/* Category Name Form Control */}
              <CardBox>
                <FormControl mb={4}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Category Name
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter category name"
                    focusBorderColor="blue.500"
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>
                </CardBox>

              {/* Priority Form Control */}
              <CardBox >
                <FormControl mb={4}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Priority
                  </FormLabel>
                  <Select
                    placeholder="Select priority"
                    focusBorderColor="blue.500"
                    size="lg"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </CardBox>

              {/* Select Main Category Form Control */}
              <CardBox >
                <FormControl mb={4}>
                  <FormLabel>Select Main Category</FormLabel>
                  <Select
                    placeholder="Select Category"
                    focusBorderColor="blue.500"
                    size="lg"
                  >
                    {/* Add options for categories here */}
                  </Select>
                </FormControl>
              </CardBox>

              {/* Submit Button */}
              <GridItem
                colSpan={{ base: 1, md: 2 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={4}
                mb={5}
              >
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
              </GridItem>
            </SimpleGrid>
          </CardBox>
        </Box>

        {/* Table Section */}
        <Box mt={5}>
          <CardBox>
          <CustomTable columns={columns} data={data} />
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default AddSubCategory;
