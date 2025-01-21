import {
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, message, Modal } from "antd";
import CardBox from "../../../Component/Charts/CardBox";
import { useState } from "react";
import { MdInfo } from "react-icons/md";

const Flashdeals = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
      <Box mt={2} fontSize="14px">
        Upload
      </Box>
    </Box>
  );

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
      </Box>
    </>
  );
};

export default Flashdeals;
