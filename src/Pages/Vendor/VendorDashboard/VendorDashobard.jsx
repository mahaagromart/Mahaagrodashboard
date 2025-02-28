import React from "react";
import Card from "../../../Component/Card";
import { Box, SimpleGrid, GridItem } from "@chakra-ui/react";
import { MdBarChart, MdCurrencyRupee, MdPendingActions } from "react-icons/md";
import { LiaStoreSolid } from "react-icons/lia";
import { AiFillProduct } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import {
  GiBoxUnpacking,
  GiConfirmed,
  GiFoodTruck,
  GiTakeMyMoney,
} from "react-icons/gi";
import { CiDeliveryTruck, CiRoute } from "react-icons/ci";
import { PiKeyReturnBold } from "react-icons/pi";
import { TbCancel, TbTax } from "react-icons/tb";
import HistogramChart from "../../../Component/Charts/HistogramChart";
import CardBox from "../../../Component/Charts/CardBox";
import LineChart from "../../../Component/Charts/LineChart";
import TopUser from "../../../Component/Table/TopUser";

import Piecharts from "../../../Component/Charts/Piecharts";
import CenterBox from "../../../Component/Charts/CenterBox";

import TopSeller from "../../../Component/Table/TopSeller";
import MyCalendar from "../../../Component/MyCalender";
import TopSellingProductTable from "../../../Component/VendorTable/TopSellingProductTable";
import MostPopularProductTable from "../../../Component/VendorTable/MostPopularProductTable";

const VendorDashobard = () => {
  return (
    <>
      <div>
        <h2
          className="content-title"
          style={{ fontSize: "24px", fontWeight: 500, marginBottom: "10px" }}
        >
          {" "}
          Business analytics
        </h2>

        <Box>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
            gap="20px"
            mb="20px"
          >
            <Card
              icon={<AiFillProduct />}
              heading={"Total Products"}
              money={"642"}
            />
            <Card
              icon={<FaPeopleGroup />}
              heading={"Total Customers"}
              money={"154"}
            />
          </SimpleGrid>

          <SimpleGrid
            columns={{ base: 1, md: 3, lg: 3, "2xl": 7 }}
            gap="20px"
            mb="20px"
          >
            <Card
              icon={<MdPendingActions />}
              heading={"Pending"}
              money={"₹350.04"}
              ht={"90px"}
            />
            <Card
              icon={<CiDeliveryTruck />}
              heading={"Delivered"}
              money={"₹350.04"}
            />
            <Card
              icon={<GiBoxUnpacking />}
              heading={"Packaging"}
              money={"₹350.04"}
            />
            <Card
              icon={<PiKeyReturnBold />}
              heading={"Returned"}
              money={"₹350.04"}
            />
            <Card
              icon={<GiConfirmed />}
              heading={"Confirmed"}
              money={"₹350.04"}
            />
            <Card
              icon={<CiRoute />}
              heading={"Out for Delivery"}
              money={"₹350.04"}
            />
            <Card
              icon={<TbCancel />}
              heading={"Order Cancel"}
              money={"₹350.04"}
            />
          </SimpleGrid>

          <Box>
            <SimpleGrid
              columns={{ base: 1, md: 1, lg: 1, "2xl": 2 }}
              gap="20px"
              mb="20px"
              style={{ backgroundColor: "#F4F7FE" }}
            >
              <CardBox>
                <HistogramChart />
              </CardBox>
              <CardBox>
                <LineChart />
              </CardBox>
            </SimpleGrid>
          </Box>

          <h2
            className="content-title"
            style={{ fontSize: "24px", fontWeight: 500, marginBottom: "10px" }}
          >
            Seller Wallet
          </h2>

          <Box>
            <SimpleGrid
              columns={{ base: 1, md: 3, lg: 3, "2xl": 5 }}
              gap="20px"
              mb="20px"
            >
              <Card
                icon={<MdBarChart style={{ color: "green" }} />}
                heading={"Earnings"}
                money={"₹642"}
                ht={"80px"}
              />
              <Card
                icon={<MdCurrencyRupee style={{ color: "green" }} />}
                heading={"Commission Earned"}
                money={"₹642.39"}
                ht={"90px"}
              />
              <Card
                icon={<GiFoodTruck />}
                heading={"Delivery charge earned"}
                money={"₹642.39"}
              />
              <Card
                icon={<GiTakeMyMoney />}
                heading={"Total Tax Collected"}
                money={"₹642.39"}
              />
              <Card
                icon={<TbTax style={{ color: "yellowgreen" }} />}
                heading={"Pending Amount"}
                money={"₹642.39"}
              />
            </SimpleGrid>

            <Box mx="auto" bg="#F4F7FE">
              <SimpleGrid
                columns={{ base: 1, md: 2, }}
                gap="20px"
                mb="20px"
              >
                <GridItem>
                  <CardBox>
                    <TopSellingProductTable />
                  </CardBox>
                </GridItem>

                <GridItem>
                <CardBox>
                    <MostPopularProductTable />
                  </CardBox>

                </GridItem>

              </SimpleGrid>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default VendorDashobard;
