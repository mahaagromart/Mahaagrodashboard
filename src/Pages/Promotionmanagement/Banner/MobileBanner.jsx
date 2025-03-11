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

const MobileBanner = () => {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

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
         Mobile Banner Section
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

      <CardBox> */}
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} p={4}>
          <FormControl>
            <FormLabel>Banner Type</FormLabel>
            <Select>
              <option>Main Banner</option>
              <option>Pop Banner</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Banner URL</FormLabel>
            <Input placeholder="Enter URL if applicable" />
          </FormControl>
        </SimpleGrid>

        <SimpleGrid pt={4} pb={5} px={4}>
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
        </SimpleGrid>

        <Box mt={4} display="flex" justifyContent="flex-start" gap={4} px={4} >
          <Button colorScheme="gray" style={{ margin: "1%" }}>Reset</Button>
          <Button colorScheme="blue" style={{ margin: "1%" }} >Submit</Button>
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
          <BannerTable />
        </CardBox>
      </Box>
    </Box>
  );
};

export default MobileBanner;
