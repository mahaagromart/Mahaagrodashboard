import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Select, SimpleGrid, Input } from "@chakra-ui/react";
import { Tabs } from 'antd';
import CardBox from "../../../Component/Charts/CardBox";

const items = [
  { key: '1', label: 'Admin Panel' },
  { key: '2', label: 'Seller Panel' },
];

const AdminEarningReport = () => {
  const [filterType, setFilterType] = useState("This Year"); // ✅ State for filter type
  const [startDate, setStartDate] = useState(""); // ✅ State for Start Date
  const [endDate, setEndDate] = useState(""); // ✅ State for End Date

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
            Earning Reports
          </h2>
        </Box>

        <Box>
          <Tabs defaultActiveKey="1" items={items} />
        </Box>

        <Box>
          <CardBox>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} padding="10px">
              {/* ✅ Filter Selection */}
              <FormControl>
                <FormLabel>Filter Data</FormLabel>
                <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="This Year">This Year</option>
                  <option value="This Month">This Month</option>
                  <option value="This Week">This Week</option>
                  <option value="Custom Date">Custom Date</option>
                </Select>
              </FormControl>

              {/* ✅ Show Start Date & End Date if "Custom Date" is selected */}
              {filterType === "Custom Date" && (
                <>
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
                </>
              )}
            </SimpleGrid>

            <Button margin="10px">Filter</Button>
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default AdminEarningReport;
