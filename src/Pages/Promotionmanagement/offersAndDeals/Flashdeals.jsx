import {
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Tooltip,
  Button,
  Select
} from "@chakra-ui/react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, message, Modal } from "antd";
import CardBox from "../../../Component/Charts/CardBox";
import { useEffect, useState } from "react";
import { MdInfo } from "react-icons/md";
import FlashdealsTable from "../../../Component/Table/FlashdealsTable";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

const Flashdeals = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const storedToken = token || localStorage.getItem("token");
  const [categoryList, setCategoryList] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || "Preview");
  };

  const handleUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const beforeUpload = (file) => {
    const sizeInMB = file.size / 1024 / 1024;
    if (sizeInMB < 2 || sizeInMB > 5) {
      message.error(`Image must be between 2MB and 5MB, but it's ${sizeInMB.toFixed(2)}MB`);
      return false;
    }
    return true;
  };

  const mockUpload = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          uid: file.uid,
          name: file.name,
          status: "done",
          url: URL.createObjectURL(file),
        });
      }, 1000);
    });
  };

  const uploadButton = (
    <Box>
      <PlusOutlined style={{ fontSize: "24px" }} />
      <Box mt={2} fontSize="14px">
        Upload
      </Box>
    </Box>
  );

  
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
        text: "Failed to fetch the category list. Please try again later.",error,
        icon: "error",
      });
    }
  };



  useEffect(()=>{
    getCategory();
  },[])




  return (
    <>
      <Box marginTop="1%">
        <Box mb={6}>
          <h2
            className="content-title"
            style={{
              textAlign: "start",
              fontWeight: "600",
              fontSize: "20px",
              color: "#4A5568",
            }}
          >
            Flash Deals
          </h2>
        </Box>

        <Box>
          <CardBox>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} alignItems="center" p={5}>
              <FormControl>
                <FormLabel fontWeight="bold" color="gray.600">
                  Title
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Ex- Winter Special"
                  focusBorderColor="blue.500"
                  size="md"
                  borderRadius="md"
                />
              </FormControl>


              <FormControl>
                <FormLabel fontWeight="bold" color="gray.600">
                  Select Category
                </FormLabel>
                <Select>
                {categoryList.map((category) => (
                            <option
                              key={category.Category_id}
                              value={category.Category_id}
                            >
                              {category.Category_Name}
                            </option>
                          ))}

                </Select>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight="bold" color="gray.600">
                  Select Product
                </FormLabel>
                <Select>
                {categoryList.map((category) => (
                            <option
                              key={category.Category_id}
                              value={category.Category_id}
                            >
                              {category.Category_Name}
                            </option>
                          ))}

                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold" color="gray.600">
                  Discount %
                </FormLabel>
                
                <Input
                  type="number"
                />
                
              </FormControl>



              <FormControl>
                <FormLabel display="flex" alignItems="center">
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
                  focusBorderColor="blue.500"
                />
              </FormControl>

              <FormControl>
                <FormLabel display="flex" alignItems="center">
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
                  focusBorderColor="blue.500"
                />
              </FormControl>
            </SimpleGrid>

            <SimpleGrid pt={4} pb={5} ml={2}>
              <Box width="100%">
                <CardBox>
                  <FormControl>
                    <FormLabel>Banner Image (2400 x 996 px)</FormLabel>
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleUpload}
                      onRemove={handleRemove}
                      beforeUpload={beforeUpload}
                      customRequest={({ file, onSuccess }) => {
                        mockUpload(file).then((response) => {
                          onSuccess(response, file);
                          message.success("File uploaded successfully");
                        });
                      }}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                  </FormControl>
                </CardBox>
              </Box>
            </SimpleGrid>

            <Box mt={6} display="flex" justifyContent="flex-start" gap={4} p={3} paddingRight={5}>
              <Button colorScheme="gray">
                Reset
              </Button>
              <Button colorScheme="blue" >
                Submit
              </Button>
            </Box>

          </CardBox>

        </Box>

        {/* Preview Modal */}
        <Modal
          visible={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewOpen(false)}
        >
          <img
            alt="Preview"
            style={{ width: "100%" }}
            src={previewImage}
          />
        </Modal>


            <Box mt={4}>
                <CardBox>
                      <FlashdealsTable/>
                </CardBox>          
             </Box>                            

      </Box>
    </>
  );
};

export default Flashdeals;
