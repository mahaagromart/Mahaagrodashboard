import React, { useState } from "react";
import { Card,Box,SimpleGrid,Select, FormControl, FormLabel, Input, Button, Tooltip, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';
import CardBox from "../../../Component/Charts/CardBox";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MdInfo, MdSettings } from "react-icons/md";

const AddNewProduct = () => {
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    }
  };

 
  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag.trim()]);
      setInputValue(''); 
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const generateCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000);
    setSku(randomCode.toString());
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
          <Box mb={6}>
         
        </Box>
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
                  <div
                    style={{
                      marginBottom: "16px",
                      paddingBottom: "10px",
                      minHeight: "200px",
                    }}
                  >
                    <ReactQuill
                      value={description}
                      onChange={handleDescriptionChange}
                      theme="snow"
                      modules={{
                        toolbar: [
                          [{ header: "1" }, { header: "2" }, { font: [] }],
                          [{ list: "ordered" }, { list: "bullet" }],
                          [{ align: [] }],
                          ["bold", "italic", "underline"],
                          ["link", "image"],
                          ["blockquote", "code-block"],
                          ["clean"],
                        ],
                      }}
                      style={{
                        height: "200px",
                        resize: "vertical",
                        overflow: "auto",
                        border: "1px solid black",
                        borderRadius: "10px",
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
            <div style={{paddingTop : "10px"}}>
             
            <span style={{ marginLeft: "10px" , padding : "10px" , fontSize : "18px" , borderBottom : "1px solid Green"}}> General Setup </span>

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
                  <Select
                    placeholder="Select category"
                    name="category"
                    id="category"
                  ></Select>
                </FormControl>
              </CardBox>
              <CardBox>
                <FormControl>
                  <FormLabel htmlFor="subCategory">Sub Category</FormLabel>
                  <Select
                    placeholder="Select Sub category"
                    name="subCategory"
                    id="subCategory"
                  ></Select>
                </FormControl>
              </CardBox>
              <CardBox>
                <FormControl>
                  <FormLabel htmlFor="subSubCategory">Sub Category</FormLabel>
                  <Select
                    placeholder="Select Sub category"
                    name="subSubCategory"
                    id="subSubCategory"
                  ></Select>
                </FormControl>
              </CardBox>
              <CardBox>
                <FormControl>
                  <FormLabel htmlFor="brand">Brand</FormLabel>
                  <Select
                    placeholder="Select Brand"
                    name="brand"
                    id="brand"
                  ></Select>
                </FormControl>
              </CardBox>

              <CardBox>
                <FormControl>
                  <FormLabel htmlFor="sku" display="flex" alignItems="center">
                    Product SKU{" "}
                    <Tooltip
                      label="Create a unique product code by clicking on the 'Generate Code' button"
                      aria-label="Info Tooltip"
                      hasArrow
                      placement="top"
                    >
                      <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                        <MdInfo />
                      </span>
                    </Tooltip>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={generateCode}
                      style={{ marginLeft: "50%" }}
                    >
                      Generate Code
                    </Button>
                  </FormLabel>
                  <Input
                    type="text"
                    id="sku"
                    name="sku"
                    value={sku}
                    readOnly
                    placeholder="Click 'Generate Code' to create a unique SKU"
                  />
                </FormControl>
              </CardBox>
              <CardBox>
                <FormControl>
                  <FormLabel htmlFor="unit">Unit</FormLabel>
                  <Select
                    placeholder="Select Unit"
                    name="unit"
                    id="unit"
                  ></Select>
                </FormControl>
              </CardBox>

              <CardBox>
      <FormControl>
        <FormLabel htmlFor="tags" display="flex" alignItems="center">
          Product Tags{' '}
          <Tooltip
            label="Enter Tags Separated by ',' so that customers will be able to find the products easily"
            aria-label="Info Tooltip"
            hasArrow
            placement="top"
          >
            <span style={{ marginLeft: '10px', cursor: 'pointer' }}>
              <MdInfo />
            </span>
          </Tooltip>
        </FormLabel>
        <Input
          type="text"
          id="tags"
          name="tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter tags and press Enter or ',' to add"
        />
        <div style={{ marginTop: '10px' }}>
          {tags.map((tag, index) => (
            <Tag size="md" key={index} marginRight="5px" marginBottom="5px" variant="solid" colorScheme="blue">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => removeTag(tag)} />
            </Tag>
          ))}
        </div>
      </FormControl>
    </CardBox>

            </SimpleGrid>
          </CardBox>
        </Box>

        <Box>
          <CardBox>
            
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default AddNewProduct;
