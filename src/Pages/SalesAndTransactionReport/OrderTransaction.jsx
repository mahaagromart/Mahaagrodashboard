import { Box , SimpleGrid , FormControl , FormLabel , Select , Input , Button , GridItem } from '@chakra-ui/react'
import React , {useState} from 'react'
import CardBox from "../../Component/Charts/CardBox";
import CenterBox from "../../Component/Charts/CenterBox"
import Card from "../../Component/Card";
import { MdBarChart } from 'react-icons/md';
import { LiaStoreSolid } from "react-icons/lia";
import { AiFillProduct } from "react-icons/ai";
import HistogramChart from "../../Component/Charts/HistogramChart";
import Piecharts from "../../Component/Charts/Piecharts";
import TotalTransactionTable from '../../Component/Table/TotalTransactionTable';

const OrderTransaction = () => {
    const [filterType, setFilterType] = useState("This Year");
    const [startDate, setStartDate] = useState(""); 
    const [endDate, setEndDate] = useState("");
  
  return (
   <>
        <Box>
        <Box>
          <CardBox>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 , "2xl" : 4 }} spacing={6} padding="10px">
           
                <FormControl>
                    <FormLabel>Filter Data</FormLabel>
                    <Select>
                        <option> please select </option>
                        <option> All Status </option>
                        <option> Disburse </option>
                        <option> Hold </option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>&nbsp;</FormLabel>
                    <Select>
                        <option> All </option>
                        <option> In House </option>
                        <option> Sanjeev </option>
                        <option> Himanshu </option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>&nbsp;</FormLabel>
                    <Select>
                        <option> All Customer </option>
                        <option> pavan </option>
                        <option> rahul </option>
                        <option> gautam </option>
                    </Select>
              </FormControl>

                
              <FormControl>
                    <FormLabel>&nbsp;</FormLabel>
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
                        <TotalTransactionTable/>
                    </CardBox>
                </Box>


        </Box>

   </>
  )
}

export default OrderTransaction



// Shop name	Customer name	Total product amount	Product discount	Coupon discount	Discounted amount	GST	Shipping charge	Order amount	Delivered by	Admin discount	Seller discount	Admin commission	Admin net income	Seller net income	Payment method	Payment Status	Action