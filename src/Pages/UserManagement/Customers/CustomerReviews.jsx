import {
  Box,
  FormControl,
  FormLabel,
  SimpleGrid,
  Select,
  GridItem,
  Button,
} from "@chakra-ui/react";
import React from "react";
import CardBox from "../../../Component/Charts/CardBox";
import CustomerReviewTable from "../../../Component/Table/CustomerReviewTable";

const CustomerReviews = () => {
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
            Customer Reviews
          </h2>
        </Box>

        <Box>
          <CardBox>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} p={5}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select>
                  <option>Noga</option>
                  <option>Fertilizer</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Product</FormLabel>
                <Select>
                  <option>Apple</option>
                  <option>Banana</option>
                </Select>
              </FormControl>
            </SimpleGrid>

            {/* Button Section */}
            <GridItem display="flex" justifyContent="end" alignItems="center">
              <Box display="flex" gap={4} pr={5} marginBottom="1%">
                <Button
                  colorScheme="gray"
                  size="lg"
                  borderRadius="8px"
                  px={6}
                  _hover={{ bg: "gray.500", color: "white" }}
                >
                  Reset
                </Button>
                <Button
                  colorScheme="blue"
                  size="lg"
                  borderRadius="8px"
                  px={6}
                  _hover={{ bg: "blue.600" }}
                >
                  Submit
                </Button>
              </Box>
            </GridItem>
          </CardBox>
        </Box>

        <Box>
          <CardBox>
            <CustomerReviewTable />
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default CustomerReviews;
