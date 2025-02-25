import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Select,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  GridItem,
} from "@chakra-ui/react";
import { Upload, message } from "antd";
import CardBox from "../../../Component/Charts/CardBox";
import qrCode from "../../../assets/qrcode.png";
import { PlusOutlined } from "@ant-design/icons";

const AddNewDeliveryman = () => {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [sellerType, setSellerType] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);




  const handleUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)); // Allow only one image
  };

  const handlePreview = (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  const handleRemove = (file) => {
    setFileList([]); // Remove the image
  };

  useEffect(() => {
    let timer;
    if (otpSent && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, resendTimer]);

  const handleVerifyEmail = () => {
    setOtpSent(true);
    setResendTimer(30);
    alert(`Verification email sent to ${email}`);
  };

  return (
    <Box marginTop="1%">
      <h2
        className="content-title"
        style={{
          textAlign: "center",
          fontWeight: "600",
          fontSize: "20px",
          color: "#4A5568",
        }}
      >
        Add New Delivery Man
      </h2>

      <Box mx="auto" mt={2}>
        <CardBox>
          <Box mb={6}>
            <div style={{ paddingTop: "10px" }}>
              <span
                style={{
                  marginLeft: "10px",
                  padding: "10px",
                  fontSize: "18px",
                  borderBottom: "1px solid Green",
                }}
              >
                {" "}
                General Information{" "}
              </span>
            </div>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} p={5}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="Ex: Pavan"
                focusBorderColor="blue.500"
                size="md"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder="Ex: Bagwe"
                focusBorderColor="blue.500"
                size="md"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                type="number"
                placeholder="Ex: +9112345678"
                focusBorderColor="blue.500"
                size="md"
              />
            </FormControl>


                <FormControl>
                    <FormLabel>Select Identification</FormLabel>
                    <Select>
                        <option>Aadhar Card</option>
                        <option>Pan Card</option>
                        <option>VoterId Card</option>
                        <option>Passport</option>
                        <option>Driving Licence</option>
                        <option>Other Government Id </option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Identification Number</FormLabel>
                    <Input type="text" />
                </FormControl>


            <FormControl>
              <FormLabel> Image (500 x 500 px)</FormLabel>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUpload}
                onPreview={handlePreview}
                onRemove={handleRemove}
                beforeUpload={() => false} 
              >
                {fileList.length >= 1 ? null : (
                  <Box>
                    <PlusOutlined style={{ fontSize: "24px" }} />
                    <Box mt={2} fontSize="14px">
                      Upload
                    </Box>
                  </Box>
                )}
              </Upload>
            </FormControl>
          </SimpleGrid>
        </CardBox>
      </Box>

      <Box marginTop="1%">
        <CardBox>
          <Box mb={6}>
            <div style={{ paddingTop: "10px" }}>
              <span
                style={{
                  marginLeft: "10px",
                  padding: "10px",
                  fontSize: "18px",
                  borderBottom: "1px solid Green",
                }}
              >
                Account Information
              </span>
            </div>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} p={5}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Ex: xyz@gmail.com"
                focusBorderColor="blue.500"
                size="md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                mt={2}
                colorScheme="blue"
                onClick={handleVerifyEmail}
                isDisabled={otpSent && resendTimer > 0}
              >
                {otpSent && resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Verify Email"}
              </Button>
            </FormControl>

            {otpSent && (
              <FormControl>
                <FormLabel>Enter OTP</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  focusBorderColor="blue.500"
                  size="md"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </FormControl>
            )}

            

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Ex : 8+ character"
                focusBorderColor="blue.500"
                size="md"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Ex : 8+ character"
                focusBorderColor="blue.500"
                size="md"
              />
            </FormControl>


            <GridItem
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2.5}
              mb={5}
            >
              <Box display="flex" gap={5} mr={5} mt={6}>
                <Button colorScheme="gray" type="button">
                  Reset
                </Button>
                <Button colorScheme="blue" type="submit">
                  Submit
                </Button>
              </Box>
            </GridItem>

          </SimpleGrid>
        </CardBox>
      </Box>


      <Modal isOpen={previewOpen} onClose={() => setPreviewOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Image src={previewImage} alt="Preview" w="100%" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddNewDeliveryman;
