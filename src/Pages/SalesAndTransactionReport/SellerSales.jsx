import React, { useState } from "react";
import CardBox from "../../Component/Charts/CardBox";
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Input,
  Button,
  GridItem,
} from "@chakra-ui/react";
import Card from "../../Component/Card";
import CenterBox from "../../Component/Charts/CenterBox";
import { AiFillProduct } from "react-icons/ai";
import { IoIosCart, IoIosMan } from "react-icons/io";
import HistogramChart from "../../Component/Charts/HistogramChart";
import { MdBarChart } from "react-icons/md";
import { TbCancel } from "react-icons/tb";

import TotalSeller from "../../Component/Table/TotalSeller";
const SellerSales = () => {
  const [filterType, setFilterType] = useState("This Year");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <>
      <Box marginTop="1%">
        <Box>
          <CardBox>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
              spacing={6}
              padding="10px"
            >
              <FormControl>
                <FormLabel>Filter Data</FormLabel>
                <Select>
                  <option value="all seller">all seller</option>
                  <option value="This Month">sanjeev</option>
                  <option value="This Week">himanshu</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>&nbsp;</FormLabel>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
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
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={6}
            padding="10px"
          >
            <GridItem>
              <SimpleGrid columns={{ base: 1 }} spacing={6} padding="10px">
                <CardBox>
                  <Card
                    icon={<AiFillProduct />}
                    heading={"Total Products"}
                    money={"642"}
                    ht={"100px"}
                  />
                </CardBox>

                <CardBox>
                  <Card
                    icon={<IoIosCart />}
                    heading={"Total Orders"}
                    money={"1642"}
                    ht={"100px"}
                  />
                </CardBox>

                <CardBox>
                  <Card
                    icon={<IoIosMan />}
                    heading={"Total Orders"}
                    money={"1642"}
                    ht={"100px"}
                  />
                </CardBox>
              </SimpleGrid>
            </GridItem>

            <GridItem>
              <CardBox>
                <HistogramChart />
              </CardBox>
            </GridItem>

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
                    icon={<MdBarChart />}
                    heading={"Earnings"}
                    money={"₹642"}
                    ht={"100px"}
                  />
                </CardBox>

                <CardBox>
                  <Card
                    icon={<TbCancel />}
                    heading={"Order Cancel"}
                    money={"₹350.04"}
                    ht={"100px"}
                  />
                </CardBox>
              </SimpleGrid>
            </GridItem>
          </SimpleGrid>
        </Box>

        <Box>
          <CardBox>
            <TotalSeller/>
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default SellerSales;
