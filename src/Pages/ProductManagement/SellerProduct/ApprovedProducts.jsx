import React from 'react'
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
import NewProductRequestTable from '../../../Component/Table/NewProductRequestTable';
import ApprovedProductsTable from '../../../Component/Table/ApprovedProductsTable';
const ApprovedProducts = () => {
  return (
    <>

<>
      <Box marginTop="1%" >
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
            Approved Products 
          </h2>
        </Box>

        <Box mx="auto" mt={5}>
          <CardBox >
            <SimpleGrid
            p={10}
              columns={{ base: 1, md : 1 , lg : 2 , "2xl": 4 }}
              gap="20px"
              mb="20px"
            >
              {/* Brand Input */}
              <CardBox>
                <FormControl mb={4}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Brand
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter category name"
                    focusBorderColor="blue.500"
                    size="md"
                    borderRadius="md"
                  />
                </FormControl>
              </CardBox>

             
              <CardBox >
                <FormControl mb={4}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Category
                  </FormLabel>
                  <Select
                    placeholder="Select Main Category"
                    focusBorderColor="blue.500"
                    size="md"
                  ></Select>
                </FormControl>
              </CardBox>

              {/* Sub Category Select */}
              <CardBox >
                <FormControl mb={4}>
                  <FormLabel>Sub Category</FormLabel>
                  <Select
                    placeholder="Select Sub Category"
                    focusBorderColor="blue.500"
                    size="md"
                  ></Select>
                </FormControl>
              </CardBox>

              {/* Sub Sub Category Select */}
              <CardBox >
                <FormControl mb={4}>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Sub Sub Category
                  </FormLabel>
                  <Select
                    placeholder="Select Sub Sub Category"
                    focusBorderColor="blue.500"
                    size="md"
                  ></Select>
                </FormControl>
              </CardBox>

   
           
               <div style={{display : "flex" , justifyContent : "space-evenly" }}>
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
            
          <ApprovedProductsTable/>
          </CardBox>
        </Box>
      </Box>
    </>

    </>
  )
}

export default ApprovedProducts