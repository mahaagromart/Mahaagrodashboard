import { useState } from "react";
import { Box, SimpleGrid, FormLabel, FormControl, Input, Button, Select, Image, useBreakpointValue } from "@chakra-ui/react";
import CardBox from "../../../Component/Charts/CardBox";
import TableWithToggle from "../../../Component/Table/TableWithToggle";

const AddCategory = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const logoSize = useBreakpointValue({ base: "150px", md: "200px" });
  const [category,setCategory]=useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

const getAllCategory=()=>{

}









  return (
    <>
      <Box marginTop="1%">
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
                      (Logo must be 1:1 ratio)
                    </span>
                  </FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    focusBorderColor="blue.500"
                    size="lg"
                    borderRadius="md"
                    p={2}
                  />
                </FormControl>

                <Box textAlign="center" mt={4} mb={5}>
                  <Button bg="blue.500" color="white" _hover={{ bg: "blue.600" }} size="lg" borderRadius="md">
                    Submit
                  </Button>
                </Box>
              </Box>

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
          </CardBox>
        </Box>

        <Box mt={5}>
          <CardBox>
            <TableWithToggle />
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default AddCategory;
