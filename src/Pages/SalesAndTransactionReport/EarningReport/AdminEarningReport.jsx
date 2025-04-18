import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Select, SimpleGrid, Input, GridItem } from "@chakra-ui/react";

import CardBox from "../../../Component/Charts/CardBox";
import Card from "../../../Component/Card";
import { MdBarChart } from "react-icons/md";
import { LiaStoreSolid } from "react-icons/lia";
import { AiFillProduct } from "react-icons/ai";
import HistogramChart from "../../../Component/Charts/HistogramChart";
import Piecharts from "../../../Component/Charts/Piecharts";
import CenterBox from "../../../Component/Charts/CenterBox";
import TotalEarningTable from "../../../Component/Table/TotalEarningTable";




const AdminEarningReport = () => {
  const [filterType, setFilterType] = useState("This Year");
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");

  return (
    <>
      <Box marginTop="1%">



        <Box>
          <CardBox>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} padding="10px">
           
              <FormControl>
                <FormLabel>Filter Data</FormLabel>
                <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="This Year">This Year</option>
                  <option value="This Month">This Month</option>
                  <option value="This Week">This Week</option>
                  <option value="Custom Date">Custom Date</option>
                </Select>
              </FormControl>

         
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

          <Box marginTop="1%">


              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} padding="10px">

                  
             <GridItem>
                 <SimpleGrid columns={{ base: 1 }} spacing={6} padding="10px">

                  <CardBox>
                  <Card
                        icon={<MdBarChart />}
                        heading={"Total Sales"}
                        money={"642"}
                        ht={"100px"}
                      />
                  </CardBox>

                  
                  <CardBox>
                      <Card
                      icon={<LiaStoreSolid />}
                      heading={"Total Stores"}
                      money={"654"}
                      ht={"100px"}
                      />

                  </CardBox>
                  
                  <CardBox>
                  <Card
                      icon={<AiFillProduct />}
                      heading={"Total Products"}
                      money={"642"}
                      ht={"100px"}
                    />
                  </CardBox>

                </SimpleGrid>
             </GridItem>



                <GridItem>

                <CardBox>

                  <HistogramChart/>

                </CardBox>
                </GridItem>

                
                <GridItem>
                <CardBox>

                      <CenterBox>

                          <Piecharts/>
                      </CenterBox>
                </CardBox>

                </GridItem>


              </SimpleGrid>   
                
          </Box>


          <Box>
           <CardBox>
           <TotalEarningTable/>
           </CardBox>
          </Box>      


      </Box>
    </>
  );
};

export default AdminEarningReport;
