import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Button,
  VStack,
} from "@chakra-ui/react";

import CardBox from "../../../Component/Charts/CardBox";
import OrderListTable from "../../../Component/VendorTable/OrderListTable";

const OutForDelivery = () => {
  const [filterType, setFilterType] = useState("This Year");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <Box marginTop="1%">
      <Box mb={6} textAlign="center">
        <h2
          className="content-title"
          style={{ fontWeight: "600", fontSize: "20px", color: "#4A5568" }}
        >
          Filter Orders
        </h2>
      </Box>

      <CardBox>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} p={4}>


          <FormControl>
            <FormLabel>Customer</FormLabel>
            <Select>
              <option>Sanjeev Kumar</option>
              <option>Rahul Kumar</option>
              <option>Amar Kumar</option>
              <option>Himanshu Kumar</option>
            </Select>
          </FormControl>
        </SimpleGrid>

        {/* Filter Date Section */}
        <CardBox>
          <VStack spacing={4} align="stretch" p={4}>
            <FormControl >
              <FormLabel>Select Date</FormLabel>
              <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="This Year">This Year</option>
                <option value="This Month">This Month</option>
                <option value="This Week">This Week</option>
                <option value="Custom Date">Custom Date</option>
              </Select>
            </FormControl>

            {filterType === "Custom Date" && (
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <FormControl>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>End Date</FormLabel>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </FormControl>
              </SimpleGrid>
            )}

            {/* Filter Button aligned properly */}
            <Box display="flex" justifyContent="flex-end">
              <Button colorScheme="blue">Filter</Button>
            </Box>
          </VStack>
        </CardBox>
      </CardBox>


            <Box>
            <CardBox>

              <OrderListTable type="OutForDelivery"/>

            </CardBox>
            </Box>

    </Box>
  );
};



export default OutForDelivery