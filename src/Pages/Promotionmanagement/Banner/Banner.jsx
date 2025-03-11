import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, message, Modal } from "antd";
import CardBox from "../../../Component/Charts/CardBox";
import BannerTable from "./BannerTable";
import { Image } from "@chakra-ui/react";
import BannerImage from "../../../assets/banner/bannerDemo.png"
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Spinner } from "@chakra-ui/react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
// import { height } from "@mui/system";

const Banner = () => {
  const [fileList, setFileList] = useState([]);
  const [fileUploadData, setFileUploadData] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [bannerType, setBannerType] = useState("Banner 1");
  const [bannerURL, setBannerURL] = useState("");
  const [submitClick, setSubmitClick] = useState(false);
  const [tableReload,setTableReload] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const { token } = useSelector((state) => state.auth);
  const storedToken = token || localStorage.getItem("token");

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
  const handleSubmit = () => {
    if (!(fileUploadData.length <= 0) && !(bannerURL == "")) {
      setSubmitClick(true);
      axios
        .post(`${apiUrl}Banner/InsertBanner`, {
          Data: [
            {
              BannerType: bannerType,
              BannerUrl: bannerURL,
              StartDate: dateRange[0],
              EndDate: dateRange[1],
              BannerList: fileUploadData.map(item => item.path)
            }
          ]
        }, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.data[0].code == 200) {
            Swal.fire({
              title: "Success",
              text: "Your action was successful!",
              icon: "success",
              confirmButtonText: "OK"
            }).then((result) => {
              if (result.isConfirmed) {
                setFileList([]);
                setFileUploadData([]);
                setBannerURL("")
              }
            });
            setTableReload(!tableReload);
          }else{
            Swal.fire({
              title: "Failed to upload Banner",
              text: "Due to a network error, the upload failed.",
              icon: "error",
            });
            setFileList([]);
            setFileUploadData([]);
            setBannerURL("")
      
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Failed to upload image",
            text: "Due to a network error, the upload failed.",
            icon: "error",
          });
        }).finally(() => {
          setSubmitClick(false);
        })
    } else {
      Swal.fire({
        title: "Incomplete Data",
        text: "Please upload a banner image and enter a valid URL.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const { RangePicker } = DatePicker;

  const onOk = (value) => {
    if (value && value.length === 2 && value[0] && value[1]) {
      const startDate = dayjs(value[0]).format("YYYY-MM-DD HH:mm:ss");
      const endDate = dayjs(value[1]).format("YYYY-MM-DD HH:mm:ss");
      setDateRange([startDate, endDate]);
    } else {
    };
    console.warn("Invalid date range selected:", value);
  }


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
    if (sizeInMB < 1 || sizeInMB > 5) {
      message.warning(`Image must be between 2MB and 5MB, but it's ${sizeInMB.toFixed(2)}MB`);
      return false;
    }
    return true;
  };

  const uploadButton = (
    <Box>
      <PlusOutlined style={{ fontSize: "24px" }} />
      <Box mt={2} fontSize="14px">Upload</Box>
    </Box>
  );

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
          Website Banner Section
        </h2>
      </Box>

      <CardBox>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap={6}
          p={4}
          display="flex"
          justifyContent="center"
          alignItems="center">
          <Image
            src={BannerImage}
          />
        </SimpleGrid>
        {/* </CardBox>
      <Img src={{api.link?? "content/def.jpg":api.link}} ></Img>
      <CardBox> */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} p={4}>
          <FormControl>
            <FormLabel>Banner Type</FormLabel>
            <Select value={bannerType} onChange={(e) => { setBannerType(e.target.value); setFileList([]); setFileUploadData([]); setBannerURL("") }}>
              <option value="Banner 1">Banner 1</option>
              <option value="Banner 2">Banner 2</option>
              <option value="Banner 3">Banner 3</option>
              <option value="Banner 4">Banner 4</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Banner URL</FormLabel>
            <Input placeholder="Enter URL if applicable" value={bannerURL} onChange={(e) => { setBannerURL(e.target.value) }} />
          </FormControl>

          <FormControl>
            <FormLabel>Select Date Range </FormLabel>
            <Space direction="vertical" size={12} >
              <RangePicker
                showTime={{
                  format: 'HH:mm',
                }}
                format="YYYY-MM-DD HH:mm"
                // onChange={(value, dateString) => {
                //   console.log('Selected Time: ', value);
                //   console.log('Formatted Selected Time: ', dateString);
                // }}
                onOk={onOk}
                style={{ height: "2.5rem" }}
              />
            </Space>
          </FormControl>

        </SimpleGrid>


        <SimpleGrid pt={4} pb={5} px={4}>
          <FormControl>
            <FormLabel> <b>{bannerType}</b> Image </FormLabel>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleUpload}
              onRemove={handleRemove}
              beforeUpload={beforeUpload}
              customRequest={({ file, onSuccess, onError }) => {
                const formData = new FormData();
                formData.append("folderType", "banners");
                formData.append("image", file);
                axios
                  .post(`${apiUrl}savefile/saveimage`, formData, {
                    headers: {
                      Authorization: `Bearer ${storedToken}`,
                      "Content-Type": "multipart/form-data",
                    },
                  })
                  .then((response) => {
                    if (response.data.code == 200) {
                      setFileUploadData([...fileUploadData, {
                        bannertype: bannerType,
                        path: response.data.path
                      }])
                      onSuccess(response.data, file);
                      message.success("File uploaded successfully!");
                    } else {
                      onError(new Error("network Error"));
                    }
                  })
                  .catch((error) => {
                    console.error("Upload Error:", error);
                    onError(error); // Call onError on failure
                    Swal.fire({
                      title: "Failed to upload image",
                      text: "Due to a network error, the upload failed.",
                      icon: "error", // "failed" is incorrect, use "error"
                    });
                  });

              }}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
          </FormControl>
        </SimpleGrid>

        <Box mt={4} display="flex" justifyContent="flex-start" gap={4} px={4} >
          <Button colorScheme="gray" style={{ margin: "1%" }} onClick={() => { setFileList([]); setFileUploadData([]); setBannerURL("") }} >Reset</Button>
          <Button
            colorScheme="blue"
            style={{ margin: "1%" }}
            onClick={handleSubmit}
            isLoading={submitClick}
            spinner={<Spinner />}
          >
            Submit
          </Button>
        </Box>
      </CardBox>

      {/* Preview Modal */}
      <Modal
        visible={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>

      <Box mt={6}>
        <CardBox>
          <BannerTable reload={tableReload}/>
        </CardBox>
      </Box>
    </Box>
  );
};

export default Banner;
