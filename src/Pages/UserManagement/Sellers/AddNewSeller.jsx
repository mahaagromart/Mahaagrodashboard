import React, { useState , useEffect } from "react";
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
} from "@chakra-ui/react";
import { Upload, message } from "antd";
import CardBox from "../../../Component/Charts/CardBox";
import qrCode from "../../../assets/qrcode.png";
import { PlusOutlined } from "@ant-design/icons";

const AddNewSeller = () => {
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
  const packageOptions = {
    GoldPackage: { label: "Gold Package", price: 3000 },
    CommercialVendors: { label: "Commercial Vendors", price: 1000 },
    Concessional: { label: "Concessional Registration", price: 500 },
    Free: { label: "Free Registration", price: 0 },
  };

  const sellerTypeOptions = {
    GoldPackage: [
      "Business", "Mil", "Fertilizers", "Pesticides", "FP0/FPC", "SHG", "Mahila Bachat Gat",
      "Khadi Udyog", "Blind Organisation", "Handicap Organization", "Prison Organization",
      "NGO", "Distressed Farmers", "Government Organization"
    ],
    CommercialVendors: ["Business", "Mil", "Fertilizers", "Pesticides"],
    Concessional: ["FP0/FPC", "SHG", "Mahila Bachat Gat", "Khadi Udyog"],
    Free: [
      "Blind Organisation", "Handicap Organization", "Prison Organization", "NGO",
      "Distressed Farmers", "Government Organization"
    ],
  };

  const handlePackageChange = (event) => {
    const value = event.target.value;
    setSelectedPackage(value);
    setSelectedPrice(packageOptions[value]?.price || "");
    setSellerType("");
  };

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
     <h2 className="content-title" style={{ textAlign: "center", fontWeight: "600", fontSize: "20px", color: "#4A5568" }}>
            Add New Seller
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
               Seller Information{" "}
              </span>
            </div>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} p={5}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input placeholder="Ex: Himanshu" focusBorderColor="blue.500" size="md" />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input placeholder="Ex: Vishwakarma" focusBorderColor="blue.500" size="md" />
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input type="number" placeholder="Ex: +9112345678" focusBorderColor="blue.500" size="md" />
            </FormControl>

            <FormControl>
              <FormLabel>Seller Package</FormLabel>
              <Select onChange={handlePackageChange} value={selectedPackage}>
                {Object.entries(packageOptions).map(([key, { label, price }]) => (
                  <option key={key} value={key}>{`${label} (₹${price})`}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Seller Type</FormLabel>
              <Select onChange={(e) => setSellerType(e.target.value)} value={sellerType}>
                {(sellerTypeOptions[selectedPackage] || []).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Seller Image (500 x 500 px)</FormLabel>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUpload}
                onPreview={handlePreview}
                onRemove={handleRemove}
                beforeUpload={() => false} // Prevent auto upload
              >
                {fileList.length >= 1 ? null : (
                  <Box>
                    <PlusOutlined style={{ fontSize: "24px" }} />
                    <Box mt={2} fontSize="14px">Upload</Box>
                  </Box>
                )}
              </Upload>
            </FormControl>

            {selectedPrice > 0 && (
              <FormControl>
                <Image src={qrCode} alt="QR Code" width={150} />
                <Input value={`₹${selectedPrice}`} isReadOnly mt={2} />
                <FormLabel mt={2}>Transaction ID</FormLabel>
                <Input
                  placeholder="Enter Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </FormControl>
            )}
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
              <Input type="email" placeholder="Ex: himanshu123@gmail.com" focusBorderColor="blue.500" size="md" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button mt={2} colorScheme="blue" onClick={handleVerifyEmail} isDisabled={otpSent && resendTimer > 0}>
                {otpSent && resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Verify Email"}
              </Button>
            </FormControl>

            {otpSent && (
              <FormControl>
                <FormLabel>Enter OTP</FormLabel>
                <Input type="text" placeholder="Enter OTP" focusBorderColor="blue.500" size="md" value={otp} onChange={(e) => setOtp(e.target.value)} />
              </FormControl>
            )}

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Ex : 8+ character" focusBorderColor="blue.500" size="md" />
            </FormControl>

            <FormControl>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" placeholder="Ex : 8+ character" focusBorderColor="blue.500" size="md" />
            </FormControl>
          </SimpleGrid>
        </CardBox> 
    </Box>

                {/* shop information */}

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
                {" "}
                Shop Information{" "}
              </span>
            </div>
            
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} p={5}>
            <FormControl>
              <FormLabel>Shop Name</FormLabel>
              <Input type="text" placeholder="Ex: Noga Store " focusBorderColor="blue.500" size="md" />
            </FormControl>

            <FormControl>
              <FormLabel>Shop Pincode</FormLabel>
              <Input type="number" placeholder="Ex : 400062" focusBorderColor="blue.500" size="md" />
            </FormControl>

            <FormControl>
              <FormLabel>Shop City</FormLabel>
              <Input type="text" placeholder="Ex : mumbai" focusBorderColor="blue.500" size="md" />
            </FormControl>

            <FormControl>
              <FormLabel>Shop State</FormLabel>
              <Input type="text" placeholder="Ex : maharastra" focusBorderColor="blue.500" size="md" />
            </FormControl>        
            
            <FormControl>
              <FormLabel>Shop Address</FormLabel>
              <Input type="text" placeholder="Ex:  Krishi udyog Goregawon east MAIDC Mumbai Maharastra 400061" focusBorderColor="blue.500" size="md" />
            </FormControl>
            <FormControl>
              <FormLabel>Shop About</FormLabel>
              <Input type="text" placeholder="Ex: Krishi related products " focusBorderColor="blue.500" size="md" />
            </FormControl>
            <FormControl>
              <FormLabel>Shop Logo (Ratio 1 :1 )</FormLabel>
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
                    <Box mt={2} fontSize="14px">Upload</Box>
                  </Box>
                )}
              </Upload>
            </FormControl>
            <FormControl>
              <FormLabel>Shop Banner (Ratio 4:1) (2000px * 500 ) </FormLabel>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUpload}
                onPreview={handlePreview}
                onRemove={handleRemove}
                beforeUpload={() => false} // Prevent auto upload
              >
                {fileList.length >= 1 ? null : (
                  <Box>
                    <PlusOutlined style={{ fontSize: "24px" }} />
                    <Box mt={2} fontSize="14px">Upload</Box>
                  </Box>
                )}
              </Upload>
            </FormControl>

             <FormControl>
                <FormLabel>Document Type</FormLabel>    
                <Select>
                    <option>Sales Licence</option>
                    <option>CIB</option>
                    <option>GST Registration</option>
                    <option>Pan Card</option>
                    <option>MSME</option>
                    <option>G-2</option>
                    <option>FCO</option>
                    <option>Adhar Card</option>
                    <option>Manufacturing Licence</option>
                    <option>FSSAI Licence</option>
                    <option>Udyog Aadhar</option>
                    <option>Shop Registration</option>
                    <option>Driving Licence</option>
                    <option>Incorporation Certificate</option>
                </Select>
            </FormControl>   

            <FormControl>
              <FormLabel>Seller Document (500 x 500 px)</FormLabel>
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
                    <Box mt={2} fontSize="14px">Upload</Box>
                  </Box>
                )}
              </Upload>
            </FormControl>
                


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

export default AddNewSeller;
