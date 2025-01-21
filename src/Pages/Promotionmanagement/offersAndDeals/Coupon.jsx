import { useState } from "react";
import CardBox from "../../../Component/Charts/CardBox";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import TableWithToggle from "../../../Component/Table/TableWithToggle";
import { MdInfo } from "react-icons/md";
import CouponListTable from "../../../Component/Table/CouponListTable";

const Coupon = () => {
  const [sku, setSku] = useState("");
  const [discountType, setDiscountType] = useState("Flat");
  const [discountAmount, setDiscountAmount] = useState();
  const [couponBearer, setCouponBearer] = useState("admin");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();


  const handleReset = () => {
    setSku("");
    setDiscountType("Flat");
    setDiscountAmount("");
    setCouponBearer("admin");
    setStartDate("");
    setEndDate("");
    setCouponTitle("");
    setMinPurchase("");
    setCouponType("Discount On Purchase");
  };
  const handleSubmit = () => {
    const couponData = {
      sku,
      discountType,
      discountAmount,
      couponBearer,
      startDate,
      endDate,
      couponTitle,
      minPurchase,
      couponType,
    };

    console.log("Submitted Coupon Data:", couponData);
    alert("Coupon submitted successfully!");
  };




  const generateCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let randomCode = "";
    for (let i = 0; i < 10; i++) {
      randomCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setSku(randomCode);
  };

  const handleCouponBearerChange = (e) => {
    setCouponBearer(e.target.value);
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
            Coupon Type
          </h2>
        </Box>

        <Box mx="auto" mt={5}>
          <CardBox>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={6}
              alignItems="center"
              p={5}
            >
              <FormControl>
                <FormLabel
                  fontWeight="bold"
                  color="gray.600"
                  htmlFor="couponType"
                >
                  Coupon Type
                </FormLabel>
                <Select id="couponType" name="couponType" placeholder="Please Select">
                  <option>Discount On Purchase</option>
                  <option>First Order</option>
                  <option>Free Delivery</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel
                  fontWeight="bold"
                  color="gray.600"
                  htmlFor="couponTitle"
                >
                  Coupon Title
                </FormLabel>
                <Input
                  id="couponTitle"
                  name="couponTitle"
                  placeholder="title"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="sku" display="flex" alignItems="center">
                  Coupon Code{" "}
                  <Tooltip
                    label="Create a unique product code by clicking on the 'Generate Code' button"
                    aria-label="Info Tooltip"
                    hasArrow
                    placement="top"
                  >
                    <span style={{ marginLeft: "5px", cursor: "pointer" }}>
                      <MdInfo />
                    </span>
                  </Tooltip>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={generateCode}
                    style={{ marginLeft: "20%" }}
                  >
                    Get Code
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

              <FormControl mt={2}>
                <FormLabel htmlFor="couponBearer">Coupon Bearer</FormLabel>
                <Select
                  id="couponBearer"
                  name="couponBearer"
                  value={couponBearer}
                  onChange={handleCouponBearerChange}
                  placeholder="Please Select"
                >
                  <option value="admin">Admin</option>
                  <option value="seller">Seller</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>
                  {couponBearer === "admin"
                    ? "Admin Options"
                    : "Seller Options"}
                </FormLabel>
                <Select
                  id="dynamicCouponBearer"
                  name="dynamicCouponBearer"
                  placeholder="Please Select"
                >
                  {couponBearer === "admin" ? (
                    <>
                      <option value="admin1">Admin Option 1</option>
                      <option value="admin2">Admin Option 2</option>
                    </>
                  ) : (
                    <>
                      <option value="seller1">Seller Option 1</option>
                      <option value="seller2">Seller Option 2</option>
                    </>
                  )}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="discountType"
                  display="flex"
                  alignItems="center"
                >
                  Discount Type{" "}
                  <Tooltip
                    label="Select Flat or Percentage discount"
                    aria-label="Info Tooltip"
                    hasArrow
                    placement="top"
                  >
                    <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <MdInfo />
                    </span>
                  </Tooltip>
                </FormLabel>
                <Select
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                  placeholder="Please Select"
                >
                  <option>Flat</option>
                  <option>Percentage</option>
                </Select>
              </FormControl>

              <FormControl mt={2}>
                <FormLabel
                  htmlFor="discountAmount"
                  display="flex"
                  alignItems="center"
                >
                  Discount {discountType === "Flat" ? "₹" : "%"}{" "}
                  <Tooltip
                    label="If 'flat' then enter the amount if 'Percentage' then enter percentage"
                    aria-label="Info Tooltip"
                    hasArrow
                    placement="top"
                  >
                    <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <MdInfo />
                    </span>
                  </Tooltip>
                </FormLabel>
                <Input
                  type="number"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="minPurchase">Minimum Purchase</FormLabel>
                <Input type="number" id="minPurchase" name="minPurchase" placeholder="Ex:- 100" />
              </FormControl>

              <FormControl mt={2}>
                <FormLabel
                  htmlFor="startDate"
                  display="flex"
                  alignItems="center"
                >
                  Start Date{" "}
                  <Tooltip
                    label="Select the date from which the discount starts"
                    aria-label="Start Date Tooltip"
                    hasArrow
                    placement="top"
                  >
                    <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <MdInfo />
                    </span>
                  </Tooltip>
                </FormLabel>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </FormControl>

              <FormControl mt={2}>
                <FormLabel htmlFor="endDate" display="flex" alignItems="center">
                  End Date{" "}
                  <Tooltip
                    label="Select the date on which the discount ends"
                    aria-label="End Date Tooltip"
                    hasArrow
                    placement="top"
                  >
                    <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                      <MdInfo />
                    </span>
                  </Tooltip>
                </FormLabel>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </FormControl>
            </SimpleGrid>

            <Box mt={6} display="flex" justifyContent="flex-end" gap={4} p={3} paddingRight={5}>
              <Button colorScheme="gray" onClick={handleReset}>
                Reset
              </Button>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </CardBox>
        </Box>

        <Box mt={5}>
          <CardBox>
                  <CouponListTable/>
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default Coupon;
