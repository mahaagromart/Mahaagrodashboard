import React, { useState, useEffect } from "react";
import Barcode from "react-barcode";
import { Box, FormControl, FormLabel, SimpleGrid } from "@chakra-ui/react";
import { Button, Input } from "antd";
import Swal from "sweetalert2";
import CardBox from "../../../Component/Charts/CardBox";
import { useNavigate, useLocation } from "react-router-dom";

const GenerateBarCode = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  // Get data passed from the previous component
  const { productSku, productPrice } = location.state || {}; 

  const [productNumber, setProductNumber] = useState(productSku || "");
  const [numberOfBarcodes, setNumberOfBarcodes] = useState(3);
  const [generatedBarcodes, setGeneratedBarcodes] = useState([]);

  // Handle missing productSku or productPrice by navigating back to /ProductList
  useEffect(() => {
    if (!productSku || !productPrice) {
      Swal.fire({
        icon: "error",
        title: "Missing Product Information",
        text: "Product number and price are required.",
      });
      navigate("/ProductList"); // Redirect to ProductList if missing data
    }
    handleGenerateBarCode();
  }, [productSku, productPrice, navigate]);

  const handleGenerateBarCode = () => {
    if (!productNumber) {
      Swal.fire({
        icon: "warning",
        title: "Oops Missing Product Number",
        text: "Product number must be valid to generate barcodes.",
      });
      navigate("/ProductList"); // Redirect if product number is missing
      return; // Stop further execution
    }

    const barcodes = Array.from({ length: numberOfBarcodes }, () => productNumber);
    setGeneratedBarcodes(barcodes);
  };



  // const handlePrint = () => {
  //   const printContents = document.getElementById("barcode-print-section").innerHTML;
  //   const originalContents = document.body.innerHTML;

  //   document.body.innerHTML = printContents;
  //   window.print();
  //   document.body.innerHTML = originalContents;
  // };
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const printContents = document.getElementById("barcode-print-section").innerHTML;
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Barcodes</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; }
            .barcode-container { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  return (
    <>
      <Box marginTop="1%">
        <Box mb={6} textAlign="center">
          <h2
            className="content-title"
            style={{ fontWeight: "600", fontSize: "20px", color: "#4A5568" }}
          >
            Generate Bar Code
          </h2>
        </Box>

        <Box>
          <CardBox>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={3} p={4}>
              <FormControl>
                <FormLabel>Enter the Product Number</FormLabel>
                <Input
                  type="text"
                  value={productNumber}
                  onChange={(e) => setProductNumber(e.target.value)}
                  placeholder="Product Number"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Enter the Number of Barcodes</FormLabel>
                <Input
                  type="number"
                  min={1}
                  value={numberOfBarcodes}
                  onChange={(e) => setNumberOfBarcodes(Number(e.target.value))}
                />
              </FormControl>

              <Box display="flex" alignItems="center" gap={3}>
                <Button type="primary" onClick={handleGenerateBarCode}>
                  Generate Bar Code
                </Button>
               
                <Button type="default" onClick={handlePrint}>
                  Print Barcodes
                </Button>
              </Box>
            </SimpleGrid>
          </CardBox>
        </Box>

        <Box mt={6} id="barcode-print-section">
          <CardBox>
            {generatedBarcodes.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} p={4} justifyContent="center" alignItems="center">
                {generatedBarcodes.map((barcode, index) => (
                  <Box key={index} display="flex" alignItems="center" justifyContent="center" flexDirection="column" border="1px solid #E2E8F0" p={2} borderRadius="sm">
                    <p>M.A.I.D.C</p>
                    <p>{productPrice}₹</p>
                    <Barcode value={barcode.toString()} height={50} width={2} />
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <p style={{ textAlign: "center", color: "#718096", fontSize: "16px" }}>
                No barcodes generated yet. Enter details and click "Generate Bar Code".
              </p>
            )}
          </CardBox>
        </Box>
      </Box>
    </>
  );
};

export default GenerateBarCode;
