import { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  FormLabel,
  FormControl,
  Button,
  Select,
} from "@chakra-ui/react";
import CardBox from "../../Component/Charts/CardBox";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../redux/Features/LoadingSlice";
import InhouseTable from "../../Component/Table/InhouseTable";

const InHouseSales = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const storedToken = token || localStorage.getItem("token");
  const [categoryList, setCategoryList] = useState([]);

  const getCategory = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/EcommerceCategory/GetAllCategory`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      if (res.data.Message === "success") {
        setCategoryList(res.data.CategoryList);
      } else {
        await Swal.fire({
          title: "Error in Getting Category List",
          text: "Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Failed to fetch the category list. Please try again later.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
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
          Inhouse Sale
        </h2>
      </Box>

      <Box mx="auto">
        <CardBox>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} p={5}>
            <FormControl>
              <FormLabel htmlFor="categoryList">Category</FormLabel>
              <Select name="categoryList">
                {categoryList.map((category) => (
                  <option key={category.Category_id} value={category.Category_id}>
                    {category.Category_Name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>&nbsp;</FormLabel> {/* This label will keep spacing consistent */}
              <Button>Filter</Button>
            </FormControl>
          </SimpleGrid>
        </CardBox>
      </Box>

      <Box mt={5}>
        <CardBox>
                  <InhouseTable/>
        </CardBox>
      </Box>
    </Box>
  );
};

export default InHouseSales;
