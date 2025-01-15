import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, SimpleGrid ,  Select, } from "@chakra-ui/react";
import CardBox from "../../../Component/Charts/CardBox";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 


const AddNewProduct = () => {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  return (
    <>
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
            <SimpleGrid
              columns={{ base: 1 }}
              spacing={6}
              alignItems="center"
              gap={10}
              p={3}
            >
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

              {/* React Quill Editor */}
              <CardBox>
                <FormControl>
                  <FormLabel fontWeight="bold" color="gray.600">
                    Product Description
                  </FormLabel>
                  <div style={{ marginBottom: "16px" , paddingBottom : "10px" , minHeight : "200px"}}>
                    <ReactQuill
                      value={description}
                      onChange={handleDescriptionChange}
                      theme="snow"
                      modules={{
                        toolbar: [
                          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                          [{ 'align': [] }],
                          ['bold', 'italic', 'underline'],
                          ['link', 'image'],
                          ['blockquote', 'code-block'],
                          ['clean'],
                        ],
                      }}
                      style={{
                        height : "200px",
                        resize: "vertical", 
                        overflow: "auto", 
                        border : "1px solid black",
                        borderRadius : "10px"
                        
                      }}
                    />
                  </div>
                </FormControl>
              </CardBox>
            </SimpleGrid>
          </CardBox>
        </Box>

        <Box mt={4}>
             <CardBox>
             <h1 style={{marginLeft : "10px" }}>General Setup</h1>

                <SimpleGrid
                 columns={{ base: 1, md: 2 }} 
                 spacing={6}
                  alignItems="center"
                  p={3}
                >
                  <CardBox>
                    <FormControl>
                      <FormLabel htmlFor="category">Category</FormLabel>
                      <Select
                        placeholder="Select category"
                      >
                        
                      </Select>
                    </FormControl>
                  </CardBox>

                </SimpleGrid>

              </CardBox>       
        </Box>
      </Box>
    </>
  );
};

export default AddNewProduct;
