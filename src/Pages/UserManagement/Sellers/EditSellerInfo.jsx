import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, SimpleGrid, FormControl, FormLabel, Input, Button, Select, Image } from "@chakra-ui/react";
import CardBox from "../../../Component/Charts/CardBox";
import qrCode from "../../../assets/qrcode.png"; // Ensure correct path

const packageOptions = {
  GoldPackage: { label: "Gold Package", price: 3000 },
  CommercialVendors: { label: "Commercial Vendors", price: 1000 },
  Concessional: { label: "Concessional Registration", price: 500 },
  Free: { label: "Free Registration", price: 0 },
};

const sellerTypeOptions = {
  GoldPackage: [
    "Business",
    "Mil",
    "Fertilizers",
    "Pesticides",
    "FP0/FPC",
    "SHG",
    "Mahila Bachat Gat",
    "Khadi Udyog",
    "Blind Organisation",
    "Handicap Organization",
    "Prison Organization",
    "NGO",
    "Distressed Farmers",
    "Government Organization",
  ],
  CommercialVendors: ["Business", "Mil", "Fertilizers", "Pesticides"],
  Concessional: ["FP0/FPC", "SHG", "Mahila Bachat Gat", "Khadi Udyog"],
  Free: [
    "Blind Organisation",
    "Handicap Organization",
    "Prison Organization",
    "NGO",
    "Distressed Farmers",
    "Government Organization",
  ],
};

// Helper function to normalize package names
const normalizePackageName = (packageName) => {
  const normalized = packageName.trim().toLowerCase().replace(/ /g, '');
  if (normalized.includes('gold')) return 'GoldPackage';
  if (normalized.includes('commercial')) return 'CommercialVendors';
  if (normalized.includes('concessional')) return 'Concessional';
  if (normalized.includes('free')) return 'Free';
  return '';
};

// Helper function to find the exact seller type match
const findSellerType = (sellerType, selectedPackage) => {
  const normalized = sellerType.trim().toLowerCase();
  return sellerTypeOptions[selectedPackage]?.find(type =>
    type.toLowerCase().includes(normalized)
  ) || '';
};

const EditSellerInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { SellerType, SellerPackage, Address } = location.state || {};

  const normalizedPackage = normalizePackageName(SellerPackage);

  const [selectedPackage, setSelectedPackage] = useState(normalizedPackage || "");
  const [sellerType, setSellerType] = useState(findSellerType(SellerType, normalizedPackage) || "");
  const [selectedPrice, setSelectedPrice] = useState(packageOptions[normalizedPackage]?.price || 0);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    console.log("Location State:", location.state); // Debugging line
    if (!SellerPackage || !SellerType || !Address) {
      navigate("/");
    } else {
      const normalizedPackage = normalizePackageName(SellerPackage);
      setSelectedPackage(normalizedPackage);
      setSellerType(findSellerType(SellerType, normalizedPackage));
      setSelectedPrice(packageOptions[normalizedPackage]?.price || 0);
    }
  }, [SellerPackage, SellerType, Address, navigate]);

  const handlePackageChange = (event) => {
    const newPackage = event.target.value;
    setSelectedPackage(newPackage);
    setSelectedPrice(packageOptions[newPackage]?.price || 0);
    setSellerType(""); // Reset seller type when package changes
  };

  const handleUpdate = () => {
    const updatedData = {
      selectedPackage,
      sellerType,
      Address,
      transactionId: selectedPrice > 0 ? transactionId : null,
    };

    console.log("Updated Data:", updatedData);
    alert("Seller information updated successfully!");
  };

  return (
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
              Update Seller Information
            </span>
          </div>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} p={5}>
          {/* Seller Package Selection */}
          <FormControl>
            <FormLabel>Seller Package</FormLabel>
            <Select value={selectedPackage} onChange={handlePackageChange}>
              {Object.keys(packageOptions).map((pkg) => (
                <option key={pkg} value={pkg}>
                  {packageOptions[pkg].label}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Seller Type Selection */}
          <FormControl>
            <FormLabel>Seller Type</FormLabel>
            <Select value={sellerType} onChange={(e) => setSellerType(e.target.value)}>
              {sellerTypeOptions[selectedPackage]?.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Address Input */}
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input type="text" value={Address} readOnly focusBorderColor="blue.500" size="md" />
          </FormControl>

          {/* Payment Section (Shown Only for Paid Packages) */}
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

        {/* Update Button */}
        <Box textAlign="center" mt={4} padding="1%">
          <Button colorScheme="green" onClick={handleUpdate}>
            Update Seller Info
          </Button>
        </Box>
      </CardBox>
    </Box>
  );
};

export default EditSellerInfo;
