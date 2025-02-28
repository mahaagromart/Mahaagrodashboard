import React, { useState } from "react";
import { Box, FormControl, FormLabel, Input, SimpleGrid, Button } from "@chakra-ui/react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, message, Image, Modal } from "antd";
import CardBox from "../../../Component/Charts/CardBox";

const AddNewBrand = () => {
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
      <Box mb={6} textAlign="center" fontWeight="600" fontSize="20px" color="#4A5568">
        Add Brand
      </Box>
      <CardBox>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} p={3}>
          <CardBox>
            <FormControl>
              <FormLabel>Brand Name*</FormLabel>
              <Input type="text" name="brand" placeholder="Ex: ITC" />
            </FormControl>
          </CardBox>
        </SimpleGrid>
        <SimpleGrid pt={4} pb={5} ml={2}>
          <Box width="100%">
            <CardBox>
              <FormControl>
                <FormLabel>Brand Image (1 : 1 )</FormLabel>
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
              <SimpleGrid display="flex" justifyContent="start" alignItems="center" mt={4} mr={5}>
                <Button colorScheme="gray" mr={5} size="lg" type="button">Reset</Button>
                <Button
                  type="submit"
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: "blue.600" }}
                  size="lg"
                  borderRadius="md"
                  width="auto"
                >
                  Submit
                </Button>
              </SimpleGrid>
            </CardBox>
          </Box>
        </SimpleGrid>
      </CardBox>
      {/* <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        closable={true}
        style={{ top: 40 }} // Moves modal down slightly, making close button more visible
      >
        <Image src={previewImage} alt="Image preview" style={{ width: "100%" }} />
      </Modal> */}

              {/* Preview Modal */}
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
              >
                <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
              </Modal>

    </Box>
  );
};

export default AddNewBrand;
