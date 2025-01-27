
import { 
  Box, 
  SimpleGrid, 
  FormLabel, 
  FormControl, 
  Input, 
  Button, 
  Select, 
  GridItem 
} from "@chakra-ui/react";
import React from "react";
import CardBox from "../../../Component/Charts/CardBox";
import { Table } from "antd";
import SubSubCategoryTable from "./SubSubCategoryTable";






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



const AddSubSubCagtegory = () => {
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
            Add New Sub Sub Category
          </h2>
        </Box>

        <Box mx="auto" mt={5}>
          <CardBox>
            <SimpleGrid
              columns={{ base: 1, sm: 1, md: 1, lg: 2 }}
              spacing={6}
              alignItems="center"
              gap={7}
              p={5}
            >
              {/* Category Name Form Control */}
              <GridItem colSpan={{ base: 1, md: 1 }}>
                <FormControl mb={4}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Sub Sub Category Name 
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter category name"
                    focusBorderColor="blue.500"
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>
              </GridItem>

              {/* Priority Form Control */}
              <GridItem colSpan={{ base: 1, md: 1 }}>
                <FormControl mb={4}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Main Category * 
                  </FormLabel>
                  <Select
                    placeholder="Select Main Category"
                    focusBorderColor="blue.500"
                    size="lg"
                  >
                   
                  </Select>
                </FormControl>
              </GridItem>

              {/* Select Main Category Form Control */}
              <GridItem colSpan={{ base: 1, md: 1 }}>
                <FormControl mb={4}>
                  <FormLabel>Select Sub Category</FormLabel>
                  <Select
                    placeholder="Select Category"
                    focusBorderColor="blue.500"
                    size="lg"
                  >
                    {/* Add options for categories here */}
                  </Select>
                </FormControl>
              </GridItem>

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
                 <SubSubCategoryTable/>                  
          </CardBox>
        </Box>
      </Box>

   </>
  )
}

export default AddSubSubCagtegory